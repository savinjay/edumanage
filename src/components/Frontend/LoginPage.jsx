// import React from 'react';
// import { FormControl, InputAdornment, InputLabel, FilledInput, IconButton, Button, Typography, Container, Box, Link } from '@mui/material';
// import Visibility from '@mui/icons-material/Visibility';
// import VisibilityOff from '@mui/icons-material/VisibilityOff';
// import { useNavigate } from 'react-router-dom';
// export default function LoginPage() {
//   const [username, setUsername] = React.useState('');
//   const [password, setPassword] = React.useState('');
//   const [showPassword, setShowPassword] = React.useState(false);
//   const navigate = useNavigate();

//   const handleClickShowPassword = () => setShowPassword((show) => !show);

//   const handleMouseDownPassword = (event) => {
//     event.preventDefault();
//   };

//   const handleMouseUpPassword = (event) => {
//     event.preventDefault();
//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     // Add your login logic here
//     // if (username === 'correctUsername' && password === 'correctPassword') {
//       navigate('/profile');
//     // } else {
//     //   // Handle incorrect login
//     //   console.log('Incorrect username or password');
//     // }
//   };

//   return (
//     <Box
//       sx={{
//         minHeight: '100vh',
//         width: '100vw',
//         display: 'flex',
//         alignItems: 'center',
//         justifyContent: 'center',
//         background: 'linear-gradient(135deg, #2F4F7F 0%, #1A1D23 100%)',
//         overflow: 'hidden',
//       }}
//     >
//       <Container maxWidth="sm">
//         <Box
//           sx={{
//             display: 'flex',
//             flexDirection: 'column',
//             alignItems: 'center',
//             padding: 4,
//             borderRadius: 4,
//             backdropFilter: 'blur(10px)',
//             backgroundColor: 'rgba(255, 255, 255, 0.1)',
//             boxShadow: '0 10px 25px rgba(0, 0, 0, 0.2)',
//           }}
//         >
//           <Typography component="h1" variant="h3" sx={{ color: '#ffffff', marginBottom: 4, fontWeight: 'bold' }}>
//             Welcome Back
//           </Typography>
//           <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1, width: '100%' }}>

//             <FormControl fullWidth sx={{ mt: 2 }} variant="outlined">
//               <InputLabel htmlFor="filled-adornment-password" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>Username *</InputLabel>
//               <FilledInput
//                 id="filled-adornment-usename"
//                 label="Username"
//                 value={username}
//                 onChange={(e) => setUsername(e.target.value)}
//                 sx={{
//                   backgroundColor: 'rgba(255, 255, 255, 0.1)',
//                   borderRadius: 2,
//                   '& .MuiOutlinedInput-notchedOutline': {
//                     borderColor: 'rgba(255, 255, 255, 0.3)',
//                   },
//                   '&:hover .MuiOutlinedInput-notchedOutline': {
//                     borderColor: 'rgba(255, 255, 255, 0.5)',
//                   },
//                   '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
//                     borderColor: 'rgba(255, 255, 255, 0.7)',
//                   },
//                   '& .MuiInputBase-input': {
//                     color: '#ffffff',
//                   },
//                 }}
//               />
//             </FormControl>

//             <FormControl fullWidth sx={{ mt: 2 }} variant="outlined">
//               <InputLabel htmlFor="filled-adornment-password" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>Password *</InputLabel>
//               <FilledInput
//                 id="filled-adornment-password"
//                 type={showPassword ? 'text' : 'password'}
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 endAdornment={
//                   <InputAdornment position="end">
//                     <IconButton
//                       aria-label={
//                         showPassword ? 'hide the password' : 'display the password'
//                       }
//                       onClick={handleClickShowPassword}
//                       onMouseDown={handleMouseDownPassword}
//                       onMouseUp={handleMouseUpPassword}
//                       edge="end"
//                       sx={{ color: 'rgba(255, 255, 255, 0.7)' }}
//                     >
//                       {showPassword ? <VisibilityOff /> : <Visibility />}
//                     </IconButton>
//                   </InputAdornment>
//                 }
//                 label="Password"
//                 sx={{
//                   backgroundColor: 'rgba(255, 255, 255, 0.1)',
//                   borderRadius: 2,
//                   '& .MuiOutlinedInput-notchedOutline': {
//                     borderColor: 'rgba(255, 255, 255, 0.3)',
//                   },
//                   '&:hover .MuiOutlinedInput-notchedOutline': {
//                     borderColor: 'rgba(255, 255, 255, 0.5)',
//                   },
//                   '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
//                     borderColor: 'rgba(255, 255, 255, 0.7)',
//                   },
//                   '& .MuiInputBase-input': {
//                     color: '#ffffff',
//                   },
//                 }}
//               />
//             </FormControl>
//             <Button
//               type="submit"
//               fullWidth
//               variant="contained"
//               sx={{
//                 mt: 4,
//                 mb: 3,
//                 py: 1.5,
//                 backgroundColor: 'rgba(255, 255, 255, 0.2)',
//                 color: '#ffffff',
//                 fontWeight: 'bold',
//                 fontSize: '1.1rem',
//                 transition: 'all 0.3s ease-in-out',
//                 '&:hover': {
//                   backgroundColor: 'rgba(255, 255, 255, 0.3)',
//                   transform: 'translateY(-2px)',
//                   boxShadow: '0 5px 15px rgba(0, 0, 0, 0.2)',
//                 },
//               }}
//             >
//               Sign In
//             </Button>
//             <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
//               <Link href="/dashboard" variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)', textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>
//                 Forgot password?
//               </Link>
//               <Link href="#" variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)', textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>
//                 {"Don't have an account? Sign Up"}
//               </Link>
//             </Box>
//           </Box>
//         </Box>
//       </Container>
//     </Box>
//   );
// }


// import React from 'react';
// import { useState } from 'react';
// import { Alert, AlertTitle } from '@/components/mui/alert';
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/mui/card';
// import { Button } from '@/components/mui/button';
// import { Input } from '@/components/mui/input';
// import { Eye, EyeOff } from 'lucide-react';

// export default function LoginPage() {
//   const [formData, setFormData] = useState({
//     username: '',
//     password: '',
//     showPassword: false,
//     isResetting: false,
//     resetEmail: '',
//     error: '',
//     loading: false
//   });

//   // Rate limiting
//   const [attempts, setAttempts] = useState(0);
//   const [lastAttempt, setLastAttempt] = useState(0);

//   const validatePassword = (password) => {
//     const minLength = 8;
//     const hasUpperCase = /[A-Z]/.test(password);
//     const hasLowerCase = /[a-z]/.test(password);
//     const hasNumbers = /\d/.test(password);
//     const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    
//     return password.length >= minLength && hasUpperCase && 
//            hasLowerCase && hasNumbers && hasSpecialChar;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     // Rate limiting check
//     const now = Date.now();
//     if (attempts >= 5 && now - lastAttempt < 300000) {
//       setFormData(prev => ({
//         ...prev,
//         error: 'Too many attempts. Please try again in 5 minutes.'
//       }));
//       return;
//     }

//     setFormData(prev => ({ ...prev, loading: true, error: '' }));

//     try {
//       setAttempts(prev => prev + 1);
//       setLastAttempt(now);

//       // Sanitize inputs
//       const sanitizedUsername = formData.username.trim();
//       if (!sanitizedUsername || !formData.password) {
//         throw new Error('All fields are required');
//       }

//       // Password validation
//       if (!validatePassword(formData.password)) {
//         throw new Error('Invalid password format');
//       }

//       // Here you would typically make an API call with HTTPS
//       // const response = await fetch('/api/login', {
//       //   method: 'POST',
//       //   headers: {
//       //     'Content-Type': 'application/json',
//       //     // CSRF token would be included here
//       //   },
//       //   credentials: 'include',
//       //   body: JSON.stringify({
//       //     username: sanitizedUsername,
//       //     password: formData.password
//       //   })
//       // });

//       // Simulate API call for demo
//       await new Promise(resolve => setTimeout(resolve, 1000));
      
//       // Reset attempts on successful login
//       setAttempts(0);
//       // Navigate to dashboard
//       window.location.href = '/dashboard';

//     } catch (err) {
//       setFormData(prev => ({
//         ...prev,
//         error: err.message || 'Login failed. Please try again.'
//       }));
//     } finally {
//       setFormData(prev => ({ ...prev, loading: false }));
//     }
//   };

//   const handlePasswordReset = async (e) => {
//     e.preventDefault();
    
//     setFormData(prev => ({ ...prev, loading: true, error: '' }));

//     try {
//       if (!formData.resetEmail) {
//         throw new Error('Email is required');
//       }

//       // Here you would make an API call to trigger password reset
//       await new Promise(resolve => setTimeout(resolve, 1000));

//       setFormData(prev => ({
//         ...prev,
//         isResetting: false,
//         error: '',
//         success: 'Password reset link sent to your email'
//       }));
//     } catch (err) {
//       setFormData(prev => ({
//         ...prev,
//         error: err.message || 'Password reset failed'
//       }));
//     } finally {
//       setFormData(prev => ({ ...prev, loading: false }));
//     }
//   };

//   return (
//     <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-blue-900 to-gray-900">
//       <Card className="w-full max-w-md mx-4 backdrop-blur-lg bg-opacity-10 bg-white">
//         <CardHeader>
//           <CardTitle className="text-3xl font-bold text-white text-center">
//             {formData.isResetting ? 'Reset Password' : 'Welcome Back'}
//           </CardTitle>
//         </CardHeader>
//         <CardContent>
//           {formData.error && (
//             <Alert variant="destructive" className="mb-4">
//               <AlertTitle>{formData.error}</AlertTitle>
//             </Alert>
//           )}
          
//           {formData.success && (
//             <Alert className="mb-4">
//               <AlertTitle>{formData.success}</AlertTitle>
//             </Alert>
//           )}

//           {formData.isResetting ? (
//             <form onSubmit={handlePasswordReset} className="space-y-4">
//               <div>
//                 <Input
//                   type="email"
//                   placeholder="Email Address"
//                   value={formData.resetEmail}
//                   onChange={(e) => setFormData(prev => ({
//                     ...prev,
//                     resetEmail: e.target.value
//                   }))}
//                   className="bg-white bg-opacity-10 text-white"
//                   required
//                 />
//               </div>
//               <Button 
//                 type="submit"
//                 className="w-full bg-white bg-opacity-20 hover:bg-opacity-30 text-white"
//                 disabled={formData.loading}
//               >
//                 {formData.loading ? 'Sending...' : 'Send Reset Link'}
//               </Button>
//               <Button
//                 type="button"
//                 variant="link"
//                 className="text-white opacity-70 hover:opacity-100"
//                 onClick={() => setFormData(prev => ({
//                   ...prev,
//                   isResetting: false
//                 }))}
//               >
//                 Back to Login
//               </Button>
//             </form>
//           ) : (
//             <form onSubmit={handleSubmit} className="space-y-4">
//               <div>
//                 <Input
//                   type="text"
//                   placeholder="Username"
//                   value={formData.username}
//                   onChange={(e) => setFormData(prev => ({
//                     ...prev,
//                     username: e.target.value
//                   }))}
//                   className="bg-white bg-opacity-10 text-white"
//                   required
//                 />
//               </div>
//               <div className="relative">
//                 <Input
//                   type={formData.showPassword ? 'text' : 'password'}
//                   placeholder="Password"
//                   value={formData.password}
//                   onChange={(e) => setFormData(prev => ({
//                     ...prev,
//                     password: e.target.value
//                   }))}
//                   className="bg-white bg-opacity-10 text-white"
//                   required
//                 />
//                 <Button
//                   type="button"
//                   variant="ghost"
//                   className="absolute right-2 top-1/2 -translate-y-1/2 text-white opacity-70 hover:opacity-100"
//                   onClick={() => setFormData(prev => ({
//                     ...prev,
//                     showPassword: !prev.showPassword
//                   }))}
//                 >
//                   {formData.showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
//                 </Button>
//               </div>
//               <Button 
//                 type="submit"
//                 className="w-full bg-white bg-opacity-20 hover:bg-opacity-30 text-white"
//                 disabled={formData.loading}
//               >
//                 {formData.loading ? 'Signing in...' : 'Sign In'}
//               </Button>
//               <div className="flex justify-between">
//                 <Button
//                   type="button"
//                   variant="link"
//                   className="text-white opacity-70 hover:opacity-100"
//                   onClick={() => setFormData(prev => ({
//                     ...prev,
//                     isResetting: true
//                   }))}
//                 >
//                   Forgot password?
//                 </Button>
//                 <Button
//                   type="button"
//                   variant="link"
//                   className="text-white opacity-70 hover:opacity-100"
//                   onClick={() => window.location.href = '/signup'}
//                 >
//                   Create account
//                 </Button>
//               </div>
//             </form>
//           )}
//         </CardContent>
//       </Card>
//     </div>
//   );
// }

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
      window.location.href = '/dashboard';

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













