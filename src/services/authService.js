import axios from "axios";

const AUTH_API_URL = `${import.meta.env.VITE_API_BASE_URL}/auth`;

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
