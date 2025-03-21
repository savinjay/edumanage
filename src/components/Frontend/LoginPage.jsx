

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Alert, Box, Button, Container, FormControl, IconButton, Input, InputAdornment, InputLabel, Link, Paper, Typography } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { supabase } from '../../helper/supabaseClient.js';


export default function LoginPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    showPassword: false,
    isResetting: false,
    resetEmail: '',
    error: '',
    loading: false,
    success: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormData(prev => ({ ...prev, loading: true, error: '' }));

    try {
      if (!formData.email || !formData.password) {
        throw new Error('All fields are required');
      }

      const { data, error } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      });

      if (error) throw error;

      // Store user session
      if (data?.user) {
        navigate('/profile');
      }
    } catch (err) {
      setFormData(prev => ({ ...prev, error: err.message || 'Login failed. Please try again.' }));
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

      const { error } = await supabase.auth.resetPasswordForEmail(formData.resetEmail);

      if (error) throw error;

      setFormData(prev => ({
        ...prev,
        isResetting: false,
        error: '',
        success: 'Password reset link sent to your email',
      }));
    } catch (err) {
      setFormData(prev => ({ ...prev, error: err.message || 'Password reset failed' }));
    } finally {
      setFormData(prev => ({ ...prev, loading: false }));
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'white' }}>
      <Container maxWidth="sm">
        <Paper elevation={3} sx={{ p: 4, backdropFilter: 'blur(10px)', borderRadius: 2, backgroundColor: 'rgba(0, 0, 0, 0.1)' }}>
          <Typography variant="h4" component="h1" align="center" sx={{ color: 'black', mb: 3 }}>
            {formData.isResetting ? 'Reset Password' : 'Welcome Back'}
          </Typography>
          {formData.error && <Alert severity="error" sx={{ mb: 2 }}>{formData.error}</Alert>}
          {formData.success && <Alert severity="success" sx={{ mb: 2 }}>{formData.success}</Alert>}
          {formData.isResetting ? (
            <Box component="form" onSubmit={handlePasswordReset} sx={{ mt: 1 }}>
              <FormControl fullWidth variant="outlined" sx={{ mb: 2 }}>
                <InputLabel sx={{ color: 'black' }}>Email Address</InputLabel>
                <Input
                  type="email"
                  value={formData.resetEmail}
                  onChange={(e) => setFormData(prev => ({ ...prev, resetEmail: e.target.value }))}
                  sx={{ color: 'black' }}
                  required
                />
              </FormControl>
              <Button fullWidth type="submit" variant="contained" disabled={formData.loading} sx={{ mb: 2 }}>
                {formData.loading ? 'Sending...' : 'Send Reset Link'}
              </Button>
              <Button fullWidth onClick={() => setFormData(prev => ({ ...prev, isResetting: false }))}>Back to Login</Button>
            </Box>
          ) : (
            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <FormControl fullWidth variant="outlined" sx={{ mb: 5 }}>
                <InputLabel sx={{ color: 'black' }}>Email</InputLabel>
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  sx={{ color: 'black' }}
                  required
                />
              </FormControl>
              <FormControl fullWidth variant="outlined" sx={{ mb: 5 }}>
                <InputLabel sx={{ color: 'black' }}>Password</InputLabel>
                <Input
                  type={formData.showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                  sx={{ color: 'black' }}
                  required
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setFormData(prev => ({ ...prev, showPassword: !prev.showPassword }))}
                        sx={{ color: 'black' }}
                      >
                        {formData.showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </FormControl>
              <Button fullWidth type="submit" variant="contained" disabled={formData.loading} sx={{ mb: 2, mt: 5, borderRadius: 2 }}>
                {formData.loading ? 'Signing in...' : 'Sign In'}
              </Button>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Link component="button" variant="body2" onClick={() => setFormData(prev => ({ ...prev, isResetting: true }))} sx={{ color: 'black' }}>
                  Forgot password?
                </Link>
                <Link href="/signup" variant="body2" sx={{ color: 'black' }}>
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