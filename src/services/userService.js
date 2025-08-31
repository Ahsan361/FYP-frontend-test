import axios from "axios";

const API_URL = "http://localhost:5000/api/users"; // adjust if different

// Get all users (Admin only)
export const getAllUsers = async (token) => {
  const res = await axios.get(API_URL, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

// Get single user by ID (Admin only)
export const getUserById = async (id, token) => {
  const res = await axios.get(`${API_URL}/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

// Add new user (Admin only)
export const addUser = async (userData, token) => {
  const res = await axios.post(API_URL, userData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

// Update user (Admin only)
export const updateUser = async (id, userData, token) => {
  const res = await axios.put(`${API_URL}/${id}`, userData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

// Delete user (Admin only)
export const deleteUser = async (id, token) => {
  const res = await axios.delete(`${API_URL}/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

//get user stats
export const getUserStats = async (token) => {
  const res = await axios.get(`${API_URL}/stats`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};