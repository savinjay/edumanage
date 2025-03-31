import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { TextField, Button, Typography, Box, Container, Paper, Alert } from "@mui/material";
import { supabase } from "../../helper/supabaseClient.js";

export default function ResetPassword() {
  const [email, setEmail] = useState(""); // Add email state
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [tokenValid, setTokenValid] = useState(false);
  const [verifyingToken, setVerifyingToken] = useState(false); // Only verify when the user submits the email
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Extract the access_token from the URL
    const params = new URLSearchParams(location.search);
    const accessToken = params.get("access_token");
    const type = params.get("type");

    console.log("Access Token:", accessToken);
    console.log("Type:", type);

    if (!accessToken || type !== "recovery") {
      setError("Invalid or missing reset token. Please request a new password reset link.");
      return;
    }
  }, [location]);

  const handleVerifyToken = async () => {
    setVerifyingToken(true);
    setError("");
    setSuccess("");

    const params = new URLSearchParams(location.search);
    const accessToken = params.get("access_token");

    try {
      if (!email) {
        throw new Error("Please enter your email address.");
      }

      const { data, error } = await supabase.auth.verifyOtp({
        token: accessToken,
        type: "recovery",
        email: email, // Pass the email
      });

      console.log("Verify OTP Response:", data, error);

      if (error) {
        if (error.message.includes("Invalid token") || error.message.includes("Token has expired")) {
          setError("The reset link has expired or is invalid. Please request a new password reset link.");
        } else {
          setError("Failed to validate reset token: " + error.message);
        }
        return;
      }

      setTokenValid(true);
    } catch (err) {
      setError(err.message || "An unexpected error occurred while validating the token.");
    } finally {
      setVerifyingToken(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      // Validate passwords
      if (newPassword.length < 8) {
        throw new Error("Password must be at least 8 characters long");
      }
      if (newPassword !== confirmPassword) {
        throw new Error("Passwords do not match");
      }

      // Update the user's password
      const { data, error } = await supabase.auth.updateUser({ password: newPassword });

      console.log("Password Update Response:", data, error);

      if (error) {
        throw error;
      }

      setSuccess("Password reset successful! Redirecting to login...");
      setTimeout(() => {
        navigate("/login", {
          state: { message: "Password reset successful! Please sign in with your new password." },
        });
      }, 2000);
    } catch (err) {
      if (err.message.includes("Invalid token")) {
        setError("The reset link has expired or is invalid. Please request a new password reset link.");
      } else {
        setError(err.message || "Failed to reset password. Try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "white" }}>
      <Container maxWidth="sm">
        <Paper elevation={3} sx={{ p: 4, backdropFilter: "blur(10px)", borderRadius: 2, backgroundColor: "rgba(0, 0, 0, 0.1)" }}>
          <Typography variant="h4" align="center" gutterBottom>
            Reset Password
          </Typography>
          {verifyingToken && (
            <Alert severity="info" sx={{ mb: 2 }}>
              Verifying reset token...
            </Alert>
          )}
          {error && (
            <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError("")}>
              {error}
            </Alert>
          )}
          {success && (
            <Alert severity="success" sx={{ mb: 2 }}>
              {success}
            </Alert>
          )}
          {!tokenValid ? (
            <>
              <TextField
                fullWidth
                margin="normal"
                type="email"
                label="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                helperText="Enter the email address you used to request the password reset."
              />
              <Button
                fullWidth
                variant="contained"
                color="primary"
                onClick={handleVerifyToken}
                disabled={verifyingToken}
                sx={{ mt: 3 }}
              >
                {verifyingToken ? "Verifying..." : "Verify Email"}
              </Button>
            </>
          ) : (
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
                helperText={newPassword.length > 0 && newPassword.length < 8 ? "Password must be at least 8 characters" : ""}
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
                helperText={confirmPassword.length > 0 && newPassword !== confirmPassword ? "Passwords do not match" : ""}
              />
              <Button type="submit" fullWidth variant="contained" color="primary" disabled={loading || !!success} sx={{ mt: 3 }}>
                {loading ? "Resetting Password..." : "Reset Password"}
              </Button>
              <Box sx={{ mt: 2, textAlign: "center" }}>
                <Typography variant="body2">
                  Remembered your password?{" "}
                  <a href="/login" style={{ color: "black" }}>
                    Sign In
                  </a>
                </Typography>
              </Box>
            </form>
          )}
        </Paper>
      </Container>
    </Box>
  );
}