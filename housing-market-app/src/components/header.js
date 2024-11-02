import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import logo from '../assets/Logo.png';

function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  document.body.style.backgroundColor = "darkgrey";
  return (
    <AppBar position="static" color="grey" elevation={0} sx={{ padding: '8px 24px', height: '100px' }}>
      <Toolbar
        sx={{
          backgroundColor: '#FFFFFF',
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          justifyContent: 'center',
          alignItems: 'center',
          gap: 2,
          backgroundColor: 'darkgrey',
        }}
      >
        {/* Logo and Title */}
        <Box sx={{ display: 'flex', alignItems: 'center', mr: 'auto', borderRadius: '8px', padding: '10px' }}>
          <IconButton edge="start" color="inherit" aria-label="logo" sx={{ p: 0, '&:hover': { backgroundColor: 'transparent' } }}
            onClick={() => navigate('/')}
            disableRipple
          >
            <img src={logo} alt="logo" style={{ 
              width: '90px', 
              height: '90px',
              marginLeft: '20px',
              marginTop: '5px',
              borderRadius: '50px',
              backgroundColor: '#808080',
            }} />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ fontWeight: 'bold', ml: 1 }}></Typography>
        </Box>

        {/* Navigation Links */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'right',
            backgroundColor: '#808080',
            ml: 10,
            borderRadius: '50px',
            border: '2px solid #333', // Add border to the navigation box
            padding: '10px', // Optional padding for better spacing
          }}
        >
          <Button
            component={Link}
            to="/"
            sx={{
              fontFamily: '"Roboto Condensed", sans-serif',
              fontWeight: 'bold',
              fontSize: '1.25rem',
              borderRadius: '50px',
              backgroundColor: location.pathname === '/' ? '#000000' : 'transparent',
              color: location.pathname === '/' ? 'white' : '#333',
              textTransform: 'none',
              '&:hover': {
                backgroundColor: location.pathname === '/' ? '#A9A9A9' : 'transparent',
              },
              minWidth: '150px',
            }}
          >
            Home
          </Button>
          <Button
            component={Link}
            to="/about"
            sx={{
              fontFamily: '"Roboto Condensed", sans-serif',
              fontWeight: 'bold',
              fontSize: '1.25rem',
              borderRadius: '50px',
              backgroundColor: location.pathname === '/about' ? '#000000' : 'transparent',
              color: location.pathname === '/about' ? 'white' : '#333',
              textTransform: 'none',
              '&:hover': {
                backgroundColor: location.pathname === '/about' ? '#A9A9A9' : 'transparent',
              },
              minWidth: '150px',
            }}
          >
            About
          </Button>
          <Button
            component={Link}
            to="/predict"
            sx={{
              fontFamily: '"Roboto Condensed", sans-serif',
              fontWeight: 'bold',
              fontSize: '1.25rem',
              borderRadius: '50px',
              backgroundColor: location.pathname === '/predict' ? '#000000' : 'transparent',
              color: location.pathname === '/predict' ? 'white' : '#333',
              textTransform: 'none',
              '&:hover': {
                backgroundColor: location.pathname === '/predict' ? '#A9A9A9' : 'transparent',
              },
              minWidth: '150px',
            }}
          >
            Predict
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Header;