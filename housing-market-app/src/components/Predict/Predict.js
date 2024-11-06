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

    // Memoizing validAreas to prevent it from being recreated on every render
    const validAreas = useMemo(() => [
        'Electronic City',
        'Whitefield',
        'Indira Nagar',
        'Koramangala',
    ], []);

    // Memoize drawD3Chart with useCallback
    const drawD3Chart = useCallback(() => {
        // Clear the existing chart
        d3.select("#d3-bar-chart").selectAll("*").remove();

        // Set dimensions and margins for the graph
        const margin = { top: 20, right: 30, bottom: 40, left: 40 },
              width = 460 - margin.left - margin.right,
              height = 400 - margin.top - margin.bottom;

        const svg = d3.select("#d3-bar-chart")
            .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", `translate(${margin.left}, ${margin.top})`);

        const data = [
            { area: 'Current Prediction', price: predictions },
            ...validAreas.map(area => {
                const entry = csvData.find(item => item.location === area);
                return { area: area, price: entry ? parseFloat(entry.price) : 0 };
            })
        ];

        const x = d3.scaleBand()
            .domain(data.map(d => d.area))
            .range([0, width])
            .padding(0.1);

        const y = d3.scaleLinear()
            .domain([0, d3.max(data, d => d.price)])
            .nice()
            .range([height, 0]);

        svg.append("g")
            .selectAll(".bar")
            .data(data)
            .enter()
            .append("rect")
            .attr("class", "bar")
            .attr("x", d => x(d.area))
            .attr("width", x.bandwidth())
            .attr("y", d => y(d.price))
            .attr("height", d => height - y(d.price))
            .attr("fill", "#3b82f6");

        svg.append("g")
            .attr("transform", `translate(0, ${height})`)
            .call(d3.axisBottom(x));

        svg.append("g")
            .call(d3.axisLeft(y));
    }, [predictions, csvData, validAreas]);

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
                size: parseFloat(formData.size),          // Convert to float
                total_sqft: parseFloat(formData.total_sqft), // Convert to float
                bathrooms: parseInt(formData.bathrooms, 10), // Convert to integer
            });
    
            setPredictions(response.data.prediction);
        } catch (err) {
            setError(err.response ? err.response.data.detail : err.message);
        } finally {
            setLoading(false);
        }
    };

    // Check if all form fields are filled
    const isFormComplete = formData.location && formData.size && formData.total_sqft && formData.bathrooms;

    useEffect(() => {
        d3.csv(cleanedData).then(data => {
            setCsvData(data);
        });
    }, []);

    useEffect(() => {
        if (predictions && csvData.length > 0) {
            drawD3Chart();
        }
    }, [predictions, csvData, drawD3Chart]);

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
                            disabled={!isFormComplete || loading}  // Disabled if form is incomplete or loading
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
                                Predicted Price: ${predictions.toFixed(2)}
                            </Typography>
                        </Paper>
                    </Grid>
                )}
            </Grid>

            {predictions && (
                <Box sx={{ marginTop: '50px', textAlign: 'center' }}>
                    <Typography variant="h6">
                        Prediction Visualization
                    </Typography>
                    <div id="d3-bar-chart" style={{ height: '400px' }} />
                </Box>
            )}
        </Box>
    );
}

export default Predict;