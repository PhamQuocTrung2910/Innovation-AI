import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

// Importing the original logo
import logoinv from '../assets/Logo.png';

function Footer() {
  document.body.style.backgroundColor = "darkgrey";
  return (
    <Box
  sx={{
    backgroundColor: '#808080', 
    color: 'black',
    padding: '20px 60px 30px 60px',  // Adjusted padding for symmetry
    display: 'flex',
    justifyContent: 'space-between', // Logo on left, info on right
    alignItems: 'center',            // Center aligns items vertically

  }}
>
  {/* Logo Section */}
  <Box sx={{ display: 'flex', alignItems: 'center' }}>
    <img
      src={logoinv}
      alt="logo"
      style={{
        width: '150px',
        height: '150px',
      }}
    />
  </Box>

  {/* Information Section */}
  <Box sx={{ textAlign: 'left', flex: 1, ml: 8 }}>
    <Typography variant="subtitle1" sx={{ fontWeight: 'bold', fontSize: '1.2rem', mb: 1 }}>
      Information
    </Typography>
    <Typography variant="body2" sx={{ fontSize: '1.1rem' }}>
      COS30049: Computing Technology Innovation Project
    </Typography>
    <Typography variant="body2" sx={{ fontSize: '1.1rem' }}>
      Project: Housing Market
    </Typography>
    <Typography variant="body2" sx={{ fontSize: '1.1rem' }}>
      Swinburne University of Technology, Hawthorn Campus
    </Typography>
  </Box>
</Box>
  );
}

export default Footer;