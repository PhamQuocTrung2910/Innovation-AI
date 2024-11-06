import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import SchoolIcon from '@mui/icons-material/School';
import BarChartIcon from '@mui/icons-material/BarChart';
import InsightsIcon from '@mui/icons-material/Insights';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

function About() {
  // Define unique content for each card with corresponding icons
  
  const cardContent = [
    {
      title: 'Dataset Explanation',
      text: `The dataset for this project focuses on key elements that shape the residential property market in Bengaluru, including housing location, property size, bedroom count, and bathroom count. Compiled from credible sources, it allows our model to examine intricate relationships within the data, producing accurate predictions for property prices specifically suited to Bengaluru's unique market conditions.`,
      icon: <SchoolIcon sx={{ fontSize: 100, color: '#000000', marginTop: '1px', marginBottom: '5px' }} />,
    },
    {
      title: 'Model Selection',
      text: `To address the complexities of Bengaluru’s housing market, our model selection process includes Linear Regression, Lasso Regression, and Decision Trees. Each was selected for its capability in managing nonlinear interactions: Linear and Lasso Regression excel at adapting to market fluctuations, while Decision Trees provide a nuanced understanding of key feature relationships. This combination enables our model to generate precise and dependable predictions tailored to Bengaluru’s unique housing dynamics.`,
      icon: <BarChartIcon sx={{ fontSize: 100, color: '#000000', marginTop: '1px', marginBottom: '5px' }} />,
    },
    {
      title: 'Model Explanation',
      text: `Our model utilizes sophisticated machine learning methods to predict housing prices by examining essential property factors that affect value. Each algorithm interprets interactions, like property characteristics and room layouts in relation to price to mirror actual market trends. Linear Regression, specifically, is adept at uncovering subtle data patterns, boosting the accuracy of predictions. This customized approach ensures reliable, meaningful forecasts that align with the distinct dynamics of Bengaluru’s housing market.`,
      icon: <InsightsIcon sx={{ fontSize: 100, color: '#000000', marginTop: '1px', marginBottom: '5px' }} />,
    },
  ];
  
  return (
    
    <Box sx={{ padding: '40px 30px', backgroundColor: 'darkgrey' }}>
      
      {/* Title Section */}
      <Typography
        variant="h4"
        align="center"
        sx={{ 
          fontWeight: 'regular', 
          fontFamily: '"Roboto Condensed", sans-serif',
          fontSize: '3.5rem',
          marginTop: '30px', 
          marginBottom: '70px', 
          color: 'black', 
        }}
      >
        About the Model
      </Typography>
      
      {/* Cards Section */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '20px',
          flexWrap: 'wrap',
          marginBottom: '100px',
        }}
      >
        {cardContent.map((card, index) => (
          <React.Fragment key={index}>
            <Paper
              elevation={3}
              sx={{
                padding: '10px',
                width: { xs: '100%', md: '25%' },
                height: { xs: 'auto', md: '500px' },
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#f3f3f5',
                borderRadius: '20px',
                textAlign: 'center',
                boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.1)',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                '&:hover': {
                  transform: 'scale(1.05)',
                  boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.2)',
                },
              }}
            >
              {card.icon}
              <Typography variant="h5" sx={{ 
                fontWeight: 'regular', 
                fontFamily: '"Roboto Condensed", sans-serif',
                fontSize: '2rem',
                marginBottom: '-10px', 
                color: 'black' 
                }}>
                {card.title}
              </Typography>

              <Typography variant="body2" color="textSecondary" sx={{ 
                padding: '40px',
                color: 'black',
                textAlign: 'justify', 
                fontWeight: 525 
                }}>
                {card.text}
              </Typography>
            </Paper>

            {/* Arrows between cards */}
            {index < cardContent.length - 1 && (
              <ArrowForwardIcon sx={{ 
                fontSize: 50,
                color: '#000000',
              }} />
            )}
          </React.Fragment>
        ))}
      </Box>
    </Box>
  );
}

export default About;