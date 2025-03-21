import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Link, Typography, Box, Container, Paper, Alert } from '@mui/material';
import { supabase } from '../helper/supabaseClient';

export default function SignUp() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Email validation regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      // Client-side validation
      if (!username.trim() || username.length < 3) {
        throw new Error('Username must be at least 3 characters long');
      }
      if (!/^[a-zA-Z0-9_]+$/.test(username)) {
        throw new Error('Username can only contain letters, numbers, and underscores');
      }
      if (!emailRegex.test(email)) {
        throw new Error('Please enter a valid email address');
      }
      if (password.length < 8) {
        throw new Error('Password must be at least 8 characters long');
      }
      if (password !== confirmPassword) {
        throw new Error('Passwords do not match');
      }

      // Sign up with Supabase
      const { data, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            username,
          },
        },
      });

      if (signUpError) {
        if (signUpError.message.includes('already registered')) {
          throw new Error('This email is already registered. Please sign in or use a different email.');
        }
        throw signUpError;
      }

      // Check if email confirmation is required
      if (data?.user) {
        if (!data.user.confirmed_at && data.user.email_confirmed_at == null) {
          // Email confirmation is required, so we cannot sign in yet
          setSuccess('Registration successful! Please check your email to confirm your account before signing in.');
          setTimeout(() => {
            navigate('/login', {
              state: { message: 'Please confirm your email to sign in.' },
            });
          }, 3000);
        } else {
          // No email confirmation required, sign in the user to set the session
          const { error: signInError } = await supabase.auth.signInWithPassword({
            email,
            password,
          });

          if (signInError) {
            throw new Error('Failed to sign in after registration. Please sign in manually.');
          }

          // Create profile in profiles table
          const { error: profileError } = await supabase
            .from('profiles')
            .insert([
              {
                id: data.user.id,
                username,
                email,
                created_at: new Date().toISOString(),
              },
            ]);

          if (profileError) {
            if (profileError.message.includes('row-level security')) {
              throw new Error('Failed to create profile due to permission issues. Please contact support.');
            }
            if (profileError.message.includes('schema cache')) {
              throw new Error('Profile creation failed due to a schema issue. Please ensure the profiles table is correctly set up.');
            }
            throw profileError;
          }

          setSuccess('Registration successful! Redirecting to login...');
          setTimeout(() => {
            navigate('/login', {
              state: { message: 'Registration successful! Please sign in.' },
            });
          }, 2000);
        }
      } else {
        throw new Error('User creation failed. Please try again.');
      }
    } catch (err) {
      setError(err.message || 'Failed to sign up. Check your internet connection or use a VPN if on school Wi-Fi.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'white' }}>
      <Container maxWidth="sm">
        <Paper elevation={3} sx={{ p: 4, backdropFilter: 'blur(10px)', borderRadius: 2, backgroundColor: 'rgba(0, 0, 0, 0.1)' }}>
          <Typography variant="h4" align="center" gutterBottom>Sign Up</Typography>
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
              label="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              error={username.length > 0 && (!/^[a-zA-Z0-9_]+$/.test(username) || username.length < 3)}
              helperText={
                username.length > 0 && !/^[a-zA-Z0-9_]+$/.test(username)
                  ? 'Username can only contain letters, numbers, and underscores'
                  : username.length > 0 && username.length < 3
                  ? 'Username must be at least 3 characters long'
                  : ''
              }
            />
            <TextField
              fullWidth
              margin="normal"
              type="email"
              label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              error={email.length > 0 && !emailRegex.test(email)}
              helperText={email.length > 0 && !emailRegex.test(email) ? 'Please enter a valid email address' : ''}
            />
            <TextField
              fullWidth
              margin="normal"
              type="password"
              label="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              error={password.length > 0 && password.length < 8}
              helperText={password.length > 0 && password.length < 8 ? 'Password must be at least 8 characters' : ''}
            />
            <Typography variant="caption" color="textSecondary">
              Password must contain at least 8 characters.
            </Typography>
            <TextField
              fullWidth
              margin="normal"
              type="password"
              label="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              error={confirmPassword.length > 0 && password !== confirmPassword}
              helperText={confirmPassword.length > 0 && password !== confirmPassword ? 'Passwords do not match' : ''}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              disabled={loading || !!success}
              sx={{ mt: 3 }}
            >
              {loading ? 'Creating Account...' : 'Sign Up'}
            </Button>
            <Box sx={{ mt: 2, textAlign: 'center' }}>
              <Link href="/login" variant="body2" sx={{ color: 'black' }}>
                Already have an account? Sign In
              </Link>
            </Box>
          </form>
        </Paper>
      </Container>
    </Box>
  );
}