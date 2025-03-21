import React from 'react';
import { Typography, Container, Box, Button } from '@mui/material';
// import { BrowserRouter, Route, Routes } from "react-router-dom";
// import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom"
export default function Dashboard() {
  const navigate = useNavigate();
  const handleSigninClick = (event) => {
    event.preventDefault();
    navigate('/SignUp');
  };
  const handleLoginClick = (event) => {
    event.preventDefault();
    navigate('/login');
  };
  const handleContactClick = (event) => {
    event.preventDefault();
    navigate('/ContactUs');
  };
  return (
    <div style={{ background: 'white', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Container maxWidth="lg" style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        <Typography variant="h2" style={{ color: '#2F4F7F', marginBottom: '20px' }}>
          EduVault
        </Typography>
        <Box sx={{ backgroundColor: '#f0f0f0', padding: '20px', borderRadius: '10px', textAlign: 'center', color: '#333', maxWidth: '600px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
          <Typography variant="h5">Welcome to EduVault</Typography>
          <Typography variant="body1" style={{ marginTop: '10px' }}>
            A Student Data Management Portal that empowers educational institutions, administrators, and teachers with a robust toolset to streamline student data management.
          </Typography>
        </Box>
        <Box sx={{ marginTop: '30px', display: 'flex', gap: '20px' }}>
        <Button
            variant="contained"
            color="primary"
            onClick={handleSigninClick}
          >
            Sign Up
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={handleLoginClick}
          >
            Log In
          </Button>
          <Button
            variant="contained"
            color="info"
            onClick={handleContactClick}
          >
            Contact Us
          </Button>
        </Box>
      </Container>
      <Box component="footer" sx={{ py: 3, px: 2, backgroundColor: '#f0f0f0', color: '#333', textAlign: 'center' }}>
        <Container maxWidth="sm">
          <Typography variant="body1">© 2024 EduVault. All rights reserved.</Typography>
          <Button href="/privacy" color="inherit" style={{ margin: '0 10px' }}>Privacy Policy</Button>
          <Button href="/terms" color="inherit" style={{ margin: '0 10px' }}>Terms of Service</Button>
        </Container>
      </Box>
    </div>
  );
}



