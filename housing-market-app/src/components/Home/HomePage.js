import React from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

// Import the hero image
import backgroundImage from '../../assets/background.png';

function HomePage() {
  const navigate = useNavigate();
  document.body.style.backgroundColor = "darkgrey";
  // Function to handle navigation when the button is clicked
  const handleGetStartedClick = () => {
    navigate('/predict');
  };

  return (
    <Box
      sx={{
        position: 'relative',
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        alignItems: 'center',
        padding: '0',
        gap: '20px',
        overflow: 'hidden',
        width: '100%',
        borderRadius: '50px',
      }}
    >
      {/* Title Section */}
      <Box
  sx={{
    position: 'absolute',
    top: { xs: '100px', md: '155px' },
    left: { xs: '100px', md: '460px' },
    zIndex: 3,
    transform: 'translateY(-100%)',
    backgroundColor: '#808080',
    padding: '20px', // Add some padding to the box
    width: '450px', // Set a specific width if necessary
    overflow: 'hidden', // Prevent overflow
    borderRadius: '50px',
    border: '2px solid #333',
  }}
>
  <Typography
    variant="h2"
    sx={{
      fontFamily: '"Roboto Condensed", sans-serif', 
      fontWeight: 330,
      fontSize: { xs: '2rem', md: '4rem' }, // Responsive font size
      color: 'black',
      marginRight: '0px', // Remove margin if it causes overflow
      lineHeight: '1.2', // Adjust line height for better text fit
    }}
  >
    Housing For All 
  </Typography>
</Box>

      {/* Content Wrapper to shift down */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          alignItems: 'stretch',
          width: '100%',
          gap: '50px',
          paddingTop: '180px',
        }}
      >
        {/* Grey Background Box */}
        <Box
          sx={{
            backgroundColor: '',
            borderRadius: '0 25px 25px 0',
            width: { xs: '100%', md: '33%' },
            display: 'flex',
            flexDirection: 'column',
            padding: '20px 0',
            paddingTop: '50px',
            boxSizing: 'border-box',
            overflow: 'hidden',
            position: 'relative',
          }}
        >
          {/* Inside Grey Box: "HOME FOR YOU" Heading */}

          {/* Green Box inside the Grey Box */}
          <Box
            sx={{
              backgroundColor: '#964B00',
              color: 'black',
              borderRadius: '0 330px 25px 0',
              width: '100%',
              flexGrow: 1,
              boxSizing: 'border-box',
              padding: '0 60px 25px 0px',
              marginTop: '10px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              zIndex: 2,
              paddingLeft: '20px',
              transform: 'translateY(20px)',
            }}
          >
            <Typography
              variant="body1"
              sx={{
                marginTop: '100px',
                marginLeft: '45px',
                marginRight: '20px',
                mb: -4,
                fontWeight: 'normal',
                fontFamily: '"Roboto Condensed", sans-serif',
                textAlign: 'left',
                fontSize: '1.35rem',
                fontStyle: 'italic',
              }}
            >
              
Get ahead in Melbourne's housing market with insights tailored just for you. Our platform leverages machine learning to provide personalized price forecasts for residential area's, helping you buy, sell, or invest with greater clarity and confidence.
            </Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={handleGetStartedClick}
              sx={{
                marginTop: '70px',
                marginLeft: '45px',
                backgroundColor: 'white',
                color: 'black',
                fontFamily: '"Roboto Condensed", sans-serif',
                fontSize: '1.2rem',
                fontWeight: 'bold',
                borderRadius: '30px',
                alignSelf: 'left',
                width: '200px'
              }}
              endIcon={<span>&rarr;</span>}
            >
              Get Started
            </Button>
          </Box>
        </Box>

        {/* Image Section */}
        <Box
          sx={{
            flex: 1,
            display: 'flex',
            justifyContent: 'right',
            alignItems: 'center',
            zIndex: 3,
          }}
        >
          <Box
            component="img"
            src={backgroundImage}
            alt="img"
            sx={{
              width: { xs: '80%', md: '100%' },
              height: 'auto',
              maxHeight: '580px', 
              objectFit: 'cover',
              borderRadius: '25px 0 0 25px',
            }}
          />
        </Box>
      </Box>      
    </Box>
  );
}

export default HomePage;