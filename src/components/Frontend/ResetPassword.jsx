// ResetPassword.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { TextField, Button, Typography, Box, Container, Paper, Alert } from '@mui/material';
import { supabase } from '../../helper/supabaseClient.js';

export default function ResetPassword() {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Extract the access_token from the URL
    const params = new URLSearchParams(location.search);
    const accessToken = params.get('access_token');
    const type = params.get('type');

    if (!accessToken || type !== 'recovery') {
      setError('Invalid or missing reset token. Please request a new password reset link.');
      return;
    }

    // Set the session with the access token
    const setSession = async () => {
      const { error } = await supabase.auth.setSession({ access_token: accessToken });
      if (error) {
        setError('Failed to validate reset token. Please request a new password reset link.');
      }
    };

    setSession();
  }, [location]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      // Validate passwords
      if (newPassword.length < 8) {
        throw new Error('Password must be at least 8 characters long');
      }
      if (newPassword !== confirmPassword) {
        throw new Error('Passwords do not match');
      }

      // Update the user's password
      const { error } = await supabase.auth.updateUser({ password: newPassword });

      if (error) {
        throw error;
      }

      setSuccess('Password reset successful! Redirecting to login...');
      setTimeout(() => {
        navigate('/login', { state: { message: 'Password reset successful! Please sign in with your new password.' } });
      }, 2000);
    } catch (err) {
      setError(err.message || 'Failed to reset password. Check your internet connection or use a VPN if on school Wi-Fi.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'white' }}>
      <Container maxWidth="sm">
        <Paper elevation={3} sx={{ p: 4, backdropFilter: 'blur(10px)', borderRadius: 2, backgroundColor: 'rgba(0, 0, 0, 0.1)' }}>
          <Typography variant="h4" align="center" gutterBottom>Reset Password</Typography>
          {error && (
            <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError('')}>
              {error}
            </Alert>
          )}
          {success && (
            <Alert severity="success" sx={{ mb: 2 }}>
              {success}
            </Alert>
          )}
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              margin="normal"
              type="password"
              label="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              error={newPassword.length > 0 && newPassword.length < 8}
              helperText={newPassword.length > 0 && newPassword.length < 8 ? 'Password must be at least 8 characters' : ''}
            />
            <Typography variant="caption" color="textSecondary">
              Password must contain at least 8 characters.
            </Typography>
            <TextField
              fullWidth
              margin="normal"
              type="password"
              label="Confirm New Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              error={confirmPassword.length > 0 && newPassword !== confirmPassword}
              helperText={confirmPassword.length > 0 && newPassword !== confirmPassword ? 'Passwords do not match' : ''}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              disabled={loading || !!success}
              sx={{ mt: 3 }}
            >
              {loading ? 'Resetting Password...' : 'Reset Password'}
            </Button>
            <Box sx={{ mt: 2, textAlign: 'center' }}>
              <Typography variant="body2">
                Remembered your password?{' '}
                <a href="/login" style={{ color: 'black' }}>
                  Sign In
                </a>
              </Typography>
            </Box>
          </form>
        </Paper>
      </Container>
    </Box>
  );
}