import React, { useState } from "react";
import { Box, Button, TextField, Typography, Paper, Fade } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Register({ onRegister }) {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/register`,
        {
          username,
          email,
          password_hash: password,
        }
      );

      setSuccess("✅ Registration successful! Redirecting...");
      onRegister?.(data);

      // redirect to login after short delay
      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        bgcolor: "background.default",
        p: 2,
      }}
    >
      <Fade in timeout={600}>
        <Paper
          elevation={3}
          sx={{
            p: { xs: 3, sm: 4 },
            maxWidth: 450,
            width: "100%",
            borderRadius: 3,
            bgcolor: "background.paper",
            transition: "transform 0.3s ease-in-out",
            "&:hover": {
              transform: "translateY(-4px)",
            },
          }}
        >
          <Box sx={{ textAlign: "center", mb: 3 }}>
            <Typography variant="h4" sx={{ fontWeight: 600 }}>
              Create Account
            </Typography>
            <Typography variant="body2" sx={{ mt: 1, color: "text.secondary" }}>
              Join our cultural heritage community
            </Typography>
          </Box>

          <form onSubmit={handleRegister}>
            <TextField
              label="Username"
              fullWidth
              margin="normal"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <TextField
              label="Email"
              type="email"
              fullWidth
              margin="normal"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <TextField
              label="Password"
              type="password"
              fullWidth
              margin="normal"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            {error && (
              <Typography color="error" sx={{ mt: 2, textAlign: "center" }}>
                {error}
              </Typography>
            )}
            {success && (
              <Typography color="primary" sx={{ mt: 2, textAlign: "center" }}>
                {success}
              </Typography>
            )}

            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3 }}>
              Register
            </Button>
          </form>
        </Paper>
      </Fade>
    </Box>
  );
}

export default Register;
