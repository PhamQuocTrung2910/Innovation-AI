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
      text: `The dataset supporting this project highlights key factors shaping Melbourne's residential property market. It includes data on rooms, property type, sale price, distance from the CBD, and amenities like bathrooms and car spaces. Regional indicators, such as "Schooling Facilities," reveal the influence of nearby schools on housing demand. Curated from reliable sources, this dataset enables our model to analyze complex relationships, delivering accurate property price predictions tailored to Melbourne’s unique market dynamics.`,
      icon: <SchoolIcon sx={{ fontSize: 100, color: '#2F4F4F', marginTop: '1px', marginBottom: '5px' }} />,
    },
    {
      title: 'Model Selection',
      text: `Our model selection process captures Melbourne's housing complexities by employing Gradient Boosting, Random Forest, and Polynomial Regression. Each model was chosen for its strength in handling nonlinear interactions, with Gradient Boosting and Random Forest adept at adapting to market fluctuations, and Polynomial Regression refining key feature relationships. Together, they enable our model to deliver precise, reliable predictions tailored specifically to Melbourne's unique housing dynamics.`,
      icon: <BarChartIcon sx={{ fontSize: 100, color: '#2F4F4F', marginTop: '1px', marginBottom: '5px' }} />,
    },
    {
      title: 'Model Explanation',
      text: `Our model leverages advanced machine learning techniques to forecast housing prices by analyzing critical property factors that influence value. Each algorithm decodes interactions—such as proximity to schools and room configurations—to reflect authentic market trends. Gradient Boosting, in particular, excels at identifying subtle patterns within data, enhancing predictive accuracy. This tailored approach ensures robust, insightful predictions aligned with Melbourne’s unique housing landscape.`,
      icon: <InsightsIcon sx={{ fontSize: 100, color: '#2F4F4F', marginTop: '1px', marginBottom: '5px' }} />,
    },
  ];

  return (
    <Box sx={{ padding: '40px 30px', backgroundColor: '#ffffff' }}>
      
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
          color: 'black' 
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
                color: '#2F4F4F',
              }} />
            )}
          </React.Fragment>
        ))}
      </Box>
    </Box>
  );
}

export default About;