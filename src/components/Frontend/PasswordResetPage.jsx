import React, { useState, useEffect } from 'react';
import { 
  Alert,
  Box,
  Button,
  Container,
  FormControl,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  Paper,
  Typography,
  CircularProgress
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useSearchParams, useNavigate } from 'react-router-dom';

export default function ResetPassword() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get('token');

  const [formData, setFormData] = useState({
    newPassword: '',
    confirmPassword: '',
    showPassword: false,
    error: '',
    loading: false
  });

  useEffect(() => {
    if (!token) {
      navigate('/forgot-password');
    }
    // Verify token validity with backend
  }, [token, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormData(prev => ({ ...prev, loading: true, error: '' }));

    try {
      if (formData.newPassword !== formData.confirmPassword) {
        throw new Error('Passwords do not match');
      }

      if (formData.newPassword.length < 8) {
        throw new Error('Password must be at least 8 characters');
      }

      // API call to reset password would go here
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      navigate('/login', { 
        state: { message: 'Password successfully reset. Please login with your new password.' }
      });
    } catch (err) {
      setFormData(prev => ({
        ...prev,
        error: err.message || 'Password reset failed'
      }));
    } finally {
      setFormData(prev => ({ ...prev, loading: false }));
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', background: 'linear-gradient(135deg, #2F4F7F 0%, #1A1D23 100%)' }}>
      <Container maxWidth="sm">
        <Paper elevation={3} sx={{ p: 4, backgroundColor: 'rgba(255, 255, 255, 0.1)' }}>
          <Typography variant="h4" sx={{ color: 'white', mb: 3, textAlign: 'center' }}>
            Set New Password
          </Typography>

          {formData.error && (
            <Alert severity="error" sx={{ mb: 2 }}>{formData.error}</Alert>
          )}

          <Box component="form" onSubmit={handleSubmit}>
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel sx={{ color: 'white' }}>New Password</InputLabel>
              <Input
                type={formData.showPassword ? 'text' : 'password'}
                required
                value={formData.newPassword}
                onChange={(e) => setFormData(prev => ({ ...prev, newPassword: e.target.value }))}
                sx={{ color: 'white' }}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setFormData(prev => ({ ...prev, showPassword: !prev.showPassword }))}
                      sx={{ color: 'white' }}
                    >
                      {formData.showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>

            <FormControl fullWidth sx={{ mb: 3 }}>
              <InputLabel sx={{ color: 'white' }}>Confirm Password</InputLabel>
              <Input
                type={formData.showPassword ? 'text' : 'password'}
                required
                value={formData.confirmPassword}
                onChange={(e) => setFormData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                sx={{ color: 'white' }}
              />
            </FormControl>

            <Button
              fullWidth
              type="submit"
              variant="contained"
              disabled={formData.loading}
              sx={{ mb: 2, height: 48 }}
            >
              {formData.loading ? <CircularProgress size={24} /> : 'Reset Password'}
            </Button>

            <Button
              fullWidth
              href="/login"
              sx={{ color: 'white' }}
            >
              Back to Login
            </Button>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}