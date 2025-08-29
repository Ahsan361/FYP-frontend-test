import React, { useState, useContext } from "react";
import { Box, Button, TextField, Typography, Paper, Fade } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../components/contexts/UserContext";

function Login({ onLogin }) {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/auth/login`, {
        email,
        password_hash: password,
      });

      localStorage.setItem("token", data.token);
      setUser(data);
      setSuccess("Login successful! 🎉");

      onLogin?.(data);
      if (data.role === "admin") {
        navigate("/adminDashboard");
        } 
      else {
        navigate("/"); // normal user → landing page
        }
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
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
            <Typography
              variant="h4"
              sx={{ color: "text.primary", fontWeight: 600 }}
            >
              Welcome Back
            </Typography>
            <Typography
              variant="body2"
              sx={{ color: "text.secondary", mt: 1 }}
            >
              Sign in to access your account
            </Typography>
          </Box>
          <form onSubmit={handleLogin}>
            <TextField
              label="Email"
              type="email"
              fullWidth
              margin="normal"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              variant="outlined"
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: 2,
                  "&:hover fieldset": {
                    borderColor: "primary.light",
                  },
                },
              }}
            />
            <TextField
              label="Password"
              type="password"
              fullWidth
              margin="normal"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              variant="outlined"
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: 2,
                  "&:hover fieldset": {
                    borderColor: "primary.light",
                  },
                },
              }}
            />
            {error && (
              <Typography
                color="error"
                variant="body2"
                sx={{ mt: 2, textAlign: "center" }}
              >
                {error}
              </Typography>
            )}
            {success && (
              <Typography
                color="primary"
                variant="body2"
                sx={{ mt: 2, textAlign: "center" }}
              >
                {success}
              </Typography>
            )}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 3,
                py: 1.5,
                bgcolor: "primary.main",
                "&:hover": {
                  bgcolor: "primary.dark",
                  transform: "scale(1.02)",
                  transition: "all 0.2s ease-in-out",
                },
              }}
            >
              Sign In
            </Button>
          </form>

          {/* Register link */}
          <Typography
            variant="body2"
            sx={{ mt: 3, textAlign: "center", color: "text.secondary" }}
          >
            Don’t have an account?{" "}
            <Button
              variant="text"
              onClick={() => navigate("/register")}
              sx={{ color: "primary.main", textTransform: "none" }}
            >
              Register
            </Button>
          </Typography>
        </Paper>
      </Fade>
    </Box>
  );
}

export default Login;
