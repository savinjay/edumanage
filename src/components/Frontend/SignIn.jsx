import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Typography, Box, Container, Paper } from '@mui/material';
import axios from 'axios';

export default function SignIn() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:3000/eduvault', {username, email, password}).then(result=>console.log(result)).catch(err => console.log(err))
    console.log(username);
    console.log(email);
    console.log(password);
    // navigate('/login');
  };

  return (
    <Box 
    sx={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'white'
    }}
    >
      <Container maxWidth="sm">
        <Paper  elevation={3}
          sx={{
            p: 4,
            backdropFilter: 'blur(10px)',
            borderRadius: 2,
            backgroundColor: 'rgba(0, 0, 0, 0.1)',
          }}>
          <Typography variant="h4" align="center" gutterBottom>
            Sign Up
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              margin="normal"
              label="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <TextField
              fullWidth
              margin="normal"
              type="email"
              label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <TextField
              fullWidth
              margin="normal"
              label="OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
            />
            <TextField
              fullWidth
              margin="normal"
              type="password"
              label="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <Typography variant="caption" color="textSecondary">
              Password must contain at least 8 characters, including uppercase, lowercase, numbers, and special characters.
            </Typography>
            <TextField
              fullWidth
              margin="normal"
              type="password"
              label="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              sx={{ mt: 3 }}
            >
              Sign Up
            </Button>
          </form>
        </Paper>
      </Container>
    </Box>
  );
}

