import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Box, TextField, Button, Typography, Grid, Paper } from '@mui/material';
import * as d3 from 'd3';
import axios from 'axios';
import cleanedData from './cleaned_real_estate_data.csv';

function Predict() {
    const [formData, setFormData] = useState({
        location: '',
        size: '',
        total_sqft: '',
        bathrooms: '',
    });
    const [predictions, setPredictions] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [csvData, setCsvData] = useState([]);
    const [chartData, setChartData] = useState([]);
    const [predictionData, setPredictionData] = useState(null);

    const validAreas = useMemo(() => [
        'Electronic City',
        'Whitefield',
        'Indira Nagar',
        'Koramangala',
        'BTM Layout',
        'Jayanagar',
        'Malleshwaram',
        'Brigade Road',
    ], []);

    const drawD3Chart = useCallback((dataToUse) => {
        d3.select("#d3-bar-chart").selectAll("*").remove();

        const margin = { top: 20, right: 30, bottom: 40, left: 40 },
              width = 800 - margin.left - margin.right,
              height = 500 - margin.top - margin.bottom;

        const svg = d3.select("#d3-bar-chart")
            .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", `translate(${margin.left}, ${margin.top})`);

        // Tooltip for hover
        const tooltip = d3.select("#d3-bar-chart")
            .append("div")
            .attr("class", "tooltip")
            .style("opacity", 0)
            .style("position", "absolute")
            .style("background-color", "lightgrey")
            .style("padding", "5px")
            .style("border-radius", "5px");

        const x = d3.scaleBand()
            .domain(dataToUse.map(d => d.area))
            .range([0, width])
            .padding(0.1);

        const y = d3.scaleLinear()
            .domain([0, d3.max(dataToUse, d => d.price)])
            .nice()
            .range([height, 0]);

        // Draw bars with transitions
        svg.selectAll(".bar")
            .data(dataToUse)
            .enter()
            .append("rect")
            .attr("class", "bar")
            .attr("x", d => x(d.area))
            .attr("width", x.bandwidth())
            .attr("y", height) // Start bars at the bottom
            .attr("height", 0) // Start bars with height 0
            .attr("fill", d => d.color)
            .on("mouseover", function (event, d) {
                tooltip.transition().duration(200).style("opacity", .9);
                tooltip.html(`
                    ${d.area}: $${d.price.toFixed(2)}<br>
                    Size: ${d.bhk} BHK, Total sqft: ${d.sqft}, Bathrooms: ${d.bathrooms}
                `)
                .style("left", (event.pageX + 5) + "px")
                .style("top", (event.pageY - 28) + "px");
            })
            .on("mouseout", function () {
                tooltip.transition().duration(500).style("opacity", 0);
            })
            .transition() // Add transition for height animation
            .duration(1000)
            .attr("y", d => y(d.price))
            .attr("height", d => height - y(d.price));

        // Remove x-axis labels
        svg.append("g")
            .attr("transform", `translate(0, ${height})`)
            .call(d3.axisBottom(x).tickFormat(() => "")); // Hide tick labels

        svg.append("g")
            .call(d3.axisLeft(y));
    }, []);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handlePredict = async () => {
        setLoading(true);
        setError(null);

        try {
            const response = await axios.post('http://localhost:8000/predict', {
                location: formData.location,
                size: parseFloat(formData.size),
                total_sqft: parseFloat(formData.total_sqft),
                bathrooms: parseInt(formData.bathrooms, 10),
            });

            setPredictions(response.data.prediction);

            const newPrediction = {
                area: 'Predicted Price',
                price: response.data.prediction,
                color: '#FF5733',
                sqft: formData.total_sqft,
                bhk: formData.size,
                bathrooms: formData.bathrooms
            };

            setPredictionData(newPrediction);

        } catch (err) {
            setError(err.response ? err.response.data.detail : err.message);
        } finally {
            setLoading(false);
        }
    };

    const isFormComplete = formData.location && formData.size && formData.total_sqft && formData.bathrooms;

    const handleSort = (order) => {
        const combinedData = predictionData ? [...chartData, predictionData] : chartData;
        const sorted = [...combinedData].sort((a, b) => {
            return order === 'asc' ? a.price - b.price : b.price - a.price;
        });
        drawD3Chart(sorted);
    };

    useEffect(() => {
        d3.csv(cleanedData).then(data => {
            // Prepare initial chart data
            const initialChartData = validAreas.map(area => {
                const entry = data.find(item => item.location === area);
                return {
                    area: area,
                    price: entry ? parseFloat(entry.price) : 0,
                    color: '#3b82f6',
                    sqft: entry ? entry.total_sqft : "",
                    bhk: entry ? entry.bhk : "",
                    bathrooms: entry ? entry.bathrooms : ""
                };
            });
            setCsvData(data);
            setChartData(initialChartData);
            drawD3Chart(initialChartData);
        });
    }, [validAreas, drawD3Chart]);

    useEffect(() => {
        if (predictions !== null) {
            const combinedData = predictionData ? [...chartData, predictionData] : chartData;
            drawD3Chart(combinedData);
        }
    }, [predictions, chartData, predictionData, drawD3Chart]);

    return (
        <Box sx={{ padding: '50px', maxWidth: '1500px', margin: '0 auto', marginTop: '40px' }}>
            <Typography variant="h4" gutterBottom align="center">
                Predict With Us
            </Typography>

            <Grid container spacing={6} justifyContent="center" alignItems="flex-start">
                <Grid item xs={12} md={5}>
                    <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                        <TextField
                            select
                            label="Location"
                            name="location"
                            value={formData.location}
                            onChange={handleChange}
                            required    
                            SelectProps={{
                                native: true,
                            }}
                        >
                            <option value=""></option>
                            {validAreas.map((area, index) => (
                                <option key={index} value={area}>{area}</option>
                            ))}
                        </TextField>

                        <TextField label="Bedroom-Hall-Kitchen (BHK)"
                            name="size"
                            value={formData.size}
                            onChange={handleChange}
                            type="number"
                            required
                        />

                        <TextField label="Total Square Feet"
                            name="total_sqft"
                            value={formData.total_sqft}
                            onChange={handleChange}
                            type="number"
                            required
                        />

                        <TextField label="Bathrooms"
                            name="bathrooms"
                            value={formData.bathrooms}
                            onChange={handleChange}
                            type="number"
                            required
                        />

                        <Button
                            variant="contained"
                            onClick={handlePredict}
                            disabled={!isFormComplete || loading}
                        >
                            {loading ? 'Loading...' : 'Get Predictions'}
                        </Button>
                        {error && <Typography color="error">{error}</Typography>}
                    </Box>
                </Grid>

                {predictions && (
                    <Grid item xs={12} md={5}>
                        <Paper elevation={3} sx={{ padding: '20px', textAlign: 'center' }}>
                            <Typography variant="h6">
                                Predicted Price: ${predictions.toFixed(2)}0 Indian Rupees/INR
                            </Typography>
                        </Paper>
                    </Grid>
                )}
            </Grid>

            {csvData.length > 0 && (
                <Box sx={{ marginTop: '50px', textAlign: 'center' }}>
                    <Typography variant="h6">
                        Prediction Visualization
                    </Typography>
                    <div id="d3-bar-chart" style={{ height: '500px' }} />
                    <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, marginTop: '20px' }}>
                        <Button variant="outlined" onClick={() => handleSort('asc')}>
                            Sort Ascending
                        </Button>
                        <Button variant="outlined" onClick={() => handleSort('desc')}>
                            Sort Descending
                        </Button>
                    </Box>
                </Box>
            )}
        </Box>
    );
}

export default Predict;
