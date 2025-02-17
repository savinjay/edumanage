import React, { useState } from 'react';
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
  Link,
  Paper,
  Typography
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

export default function LoginPage() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    showPassword: false,
    isResetting: false,
    resetEmail: '',
    error: '',
    loading: false
  });

  const [attempts, setAttempts] = useState(0);
  const [lastAttempt, setLastAttempt] = useState(0);

  const validatePassword = (password) => {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    return password.length >= minLength && hasUpperCase && 
           hasLowerCase && hasNumbers && hasSpecialChar;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const now = Date.now();
    if (attempts >= 5 && now - lastAttempt < 300000) {
      setFormData(prev => ({
        ...prev,
        error: 'Too many attempts. Please try again in 5 minutes.'
      }));
      return;
    }

    setFormData(prev => ({ ...prev, loading: true, error: '' }));

    try {
      setAttempts(prev => prev + 1);
      setLastAttempt(now);

      const sanitizedUsername = formData.username.trim();
      if (!sanitizedUsername || !formData.password) {
        throw new Error('All fields are required');
      }

      if (!validatePassword(formData.password)) {
        throw new Error('Invalid password format');
      }

      await new Promise(resolve => setTimeout(resolve, 1000));
      setAttempts(0);
      window.location.href = '/Profile';

    } catch (err) {
      setFormData(prev => ({
        ...prev,
        error: err.message || 'Login failed. Please try again.'
      }));
    } finally {
      setFormData(prev => ({ ...prev, loading: false }));
    }
  };

  const handlePasswordReset = async (e) => {
    e.preventDefault();
    setFormData(prev => ({ ...prev, loading: true, error: '' }));

    try {
      if (!formData.resetEmail) {
        throw new Error('Email is required');
      }

      await new Promise(resolve => setTimeout(resolve, 1000));

      setFormData(prev => ({
        ...prev,
        isResetting: false,
        error: '',
        success: 'Password reset link sent to your email'
      }));
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
        <Paper
          elevation={3}
          sx={{
            p: 4,
            backdropFilter: 'blur(10px)',
            borderRadius: 2,
            backgroundColor: 'rgba(0, 0, 0, 0.1)',
          }}
        >
          <Typography variant="h4" component="h1" align="center" sx={{ color: 'black', mb: 3 }}>
            {formData.isResetting ? 'Reset Password' : 'Welcome Back'}
          </Typography>

          {formData.error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {formData.error}
            </Alert>
          )}

          {formData.success && (
            <Alert severity="success" sx={{ mb: 2 }}>
              {formData.success}
            </Alert>
          )}

          {formData.isResetting ? (
            <Box component="form" onSubmit={handlePasswordReset} sx={{ mt: 1 }}>
              <FormControl fullWidth variant="outlined" sx={{ mb: 2 }}>
                <InputLabel sx={{ color: 'black' }}>Email Address</InputLabel>
                <Input
                  type="email"
                  value={formData.resetEmail}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    resetEmail: e.target.value
                  }))}
                  sx={{ color: 'black' }}
                  required
                />
              </FormControl>

              <Button
                fullWidth
                type="submit"
                variant="contained"
                disabled={formData.loading}
                sx={{ mb: 2 }}
              >
                {formData.loading ? 'Sending...' : 'Send Reset Link'}
              </Button>

              <Button
                fullWidth
                onClick={() => setFormData(prev => ({
                  ...prev,
                  isResetting: false
                }))}
              >
                Back to Login
              </Button>
            </Box>
          ) : (
            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <FormControl fullWidth variant="outlined" sx={{mb: 5}}>
                <InputLabel sx={{ color: 'black' }}>Username</InputLabel>
                <Input
                  value={formData.username}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    username: e.target.value
                  }))}
                  sx={{ color: 'black' }}
                  required
                />
              </FormControl>

              <FormControl fullWidth variant="outlined"  sx={{mb: 5}}>
                <InputLabel sx={{ color: 'black' }}>Password</InputLabel>
                <Input
                  type={formData.showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    password: e.target.value
                  }))}
                  sx={{ color: 'black' }}
                  required
                  endAdornment={
                    <InputAdornment >
                      <IconButton
                        onClick={() => setFormData(prev => ({
                          ...prev,
                          showPassword: !prev.showPassword
                        }))}
                        sx={{ color: 'black' }}
                      >
                        {formData.showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </FormControl>

              <Button
                fullWidth
                type="submit"
                variant="contained"
                disabled={formData.loading}
                sx={{ mb: 2, mt: 5,
                  borderRadius: 2,
                 }}
              >
                {formData.loading ? 'Signing in...' : 'Sign In'}
              </Button>

              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Link
                  component="button"
                  variant="body2"
                  onClick={() => setFormData(prev => ({
                    ...prev,
                    isResetting: true
                  }))}
                  sx={{ color: 'black' }}
                >
                  Forgot password?
                </Link>
                <Link
                  href="/signup"
                  variant="body2"
                  sx={{ color: 'black' }}
                >
                  Create account
                </Link>
              </Box>
            </Box>
          )}
        </Paper>
      </Container>
    </Box>
  );
}













