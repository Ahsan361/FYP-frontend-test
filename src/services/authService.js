import axios from "axios";

const AUTH_API_URL = `${import.meta.env.VITE_API_BASE_URL}/auth`;

// Register a new user
export const registerUser = async (userData) => {
  const res = await axios.post(`${AUTH_API_URL}/register`, userData);
  return res.data;
};

// Login a user
export const loginUser = async (credentials) => {
  const res = await axios.post(`${AUTH_API_URL}/login`, credentials);
  return res.data;
};

// Verify email with OTP
export const verifyEmail = async (verificationData) => {
  const res = await axios.post(`${AUTH_API_URL}/verify-email`, verificationData);
  return res.data;
};

// Resend OTP
export const resendOTP = async (userId) => {
  const res = await axios.post(`${AUTH_API_URL}/resend-otp`, { userId });
  return res.data;
};

// Reset Password
export const resetPassword = async (email, currentPassword, newPassword, confirmPassword) => {
  const res = await axios.post(`${AUTH_API_URL}/reset-password`, {
    email,
    currentPassword,
    newPassword,
    confirmPassword,
  });
  return res.data;
};

