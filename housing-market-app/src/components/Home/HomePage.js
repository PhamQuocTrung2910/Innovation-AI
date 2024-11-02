import React from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

// Import the hero image
import backgroundImage from '../../assets/background.png';

function HomePage() {
  const navigate = useNavigate();

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
      }}
    >
      {/* Title Section */}
      <Box
        sx={{
          position: 'absolute',
          top: { xs: '100px', md: '135px' },
          left: { xs: '20px', md: '60px' },
          zIndex: 3,
          transform: 'translateY(-100%)',
        }}
      >
        <Typography
          variant="h2"
          sx={{
            fontFamily: '"Roboto Condensed", sans-serif', 
            fontWeight: 430,
            fontSize: '4 rem',
            color: 'black',
            marginRight: '100px',
          }}
        >
          Housing For All Those In Need
        </Typography>
      </Box>

      {/* Content Wrapper to shift down */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          alignItems: 'stretch',
          width: '100%',
          gap: '20px',
          paddingTop: '130px',
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
            alt="Binary"
            sx={{
              width: { xs: '80%', md: '100%' },
              height: 'auto',
              maxHeight: '680px', 
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