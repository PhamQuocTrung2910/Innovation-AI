import React, { useState } from 'react';
import { Box, TextField, Button, Typography, FormControl, InputLabel, Select, MenuItem, Paper, Grid } from '@mui/material';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';

function Predict() {
  const [formData, setFormData] = useState({
    location: '',
    size: '',
    total_sqft: '',
  });
  const [predictions, setPredictions] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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
      const response = await fetch('http://localhost:8000/predict', {  // Replace with your API URL
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          location: formData.location,
          size: parseFloat(formData.size),
          total_sqft: parseFloat(formData.total_sqft),
        })
      });

      if (!response.ok) {
        throw new Error('Failed to fetch predictions');
      }

      const data = await response.json();
      setPredictions(data.prediction); // Assuming 'prediction' is returned by the API
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Data for the bar chart if you need to visualize the predictions
  const barChartData = {
    labels: ['Prediction'], // Modify labels based on your prediction model
    datasets: [
      {
        label: 'Price Prediction',
        data: predictions ? [predictions] : [], // Update data format based on API response
        backgroundColor: ['#3b82f6']
      }
    ]
  };

  return (
    <Box sx={{ padding: '50px', maxWidth: '1500px', margin: '0 auto' }}>
      <Typography variant="h4" gutterBottom align="center" sx={{
        marginBottom: '50px',
        fontFamily: '"Roboto Condensed", sans-serif',
        fontSize: '2.5rem'
      }}>
        Predict With Us
      </Typography>

      <Grid container spacing={6} justifyContent="center" alignItems="flex-start">
        {/* Form Container */}
        <Grid item xs={12} md={5}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
            }}
          >
            <Box
              component="form"
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 3,
                backgroundColor: predictions ? '#F5F5F5' : 'transparent',
                padding: predictions ? '40px' : '0',
                borderRadius: '10px',
                width: '100%',
                maxWidth: '800px',
              }}
            >
              <TextField label="Location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                sx={{ backgroundColor: 'white' }}
                required
              />

              <TextField label="Size (e.g., 3 BHK)"
                name="size"
                value={formData.size}
                onChange={handleChange}
                sx={{ backgroundColor: 'white' }}
                required
              />

              <TextField label="Total Square Feet"
                name="total_sqft"
                value={formData.total_sqft}
                onChange={handleChange}
                sx={{ backgroundColor: 'white' }}
                type="number"
                required
              />

              <Button
                variant="contained"
                onClick={handlePredict}
                sx={{
                  backgroundColor: '#2F4F4F',
                  color: 'white',
                  fontWeight: 'bold',
                  padding: '12px 45px',
                  '&:hover': {
                    backgroundColor: '#2F4F4F',
                  },
                }}
                disabled={loading}
              >
                {loading ? 'Loading...' : 'Get Predictions'}
              </Button>
              {error && <Typography color="error">{error}</Typography>}
            </Box>
          </Box>
        </Grid>

        {/* Prediction Results */}
        {predictions && (
          <Grid item xs={12} md={5}>
            <Box>
              <Typography variant="h6" align="center" sx={{
                marginBottom: '20px',
                fontFamily: '"Roboto Condensed", sans-serif',
                fontSize: '1.5rem',
                color: '#2F4F4F'
              }}>
                Prediction Results
              </Typography>

              <Paper elevation={3} sx={{
                padding: '20px',
                textAlign: 'center',
                backgroundColor: '#2F4F4F'
              }}>
                <Typography variant="h6" sx={{
                  color: 'white',
                  fontFamily: '"Roboto Condensed", sans-serif',
                  fontSize: '1.5rem'
                }}>
                  Predicted Price
                </Typography>
                <Typography variant="h5" sx={{
                  color: 'white',
                  fontFamily: '"Roboto Condensed", sans-serif',
                  fontSize: '1.5rem'
                }}>
                  ${predictions.toFixed(2)}
                </Typography>
              </Paper>
            </Box>
          </Grid>
        )}
      </Grid>

      {/* Optional Bar Chart Visualization */}
      {predictions && (
        <Box sx={{ marginTop: '50px', textAlign: 'center' }}>
          <Typography variant="h6" sx={{
            marginBottom: '10px',
            fontFamily: '"Roboto Condensed", sans-serif',
            fontSize: '1.5rem'
          }}>
            Prediction Visualization
          </Typography>
          <Box sx={{ height: '400px' }}>
            <Bar data={barChartData} options={{ responsive: true, maintainAspectRatio: false }} />
          </Box>
        </Box>
      )}
    </Box>
  );
}

export default Predict;