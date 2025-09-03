import axios from "axios";

const API_URL = "http://localhost:5000/api/exhibitions"; // Adjust if different

// Get all exhibitions
export const getExhibitions = async (token) => {
  const res = await axios.get(API_URL, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

// Get single exhibition by ID
export const getExhibitionById = async (id, token) => {
  const res = await axios.get(`${API_URL}/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

// Create new exhibition
export const createExhibition = async (exhibitionData, token) => {
  const res = await axios.post(API_URL, exhibitionData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

// Update exhibition
export const updateExhibition = async (id, exhibitionData, token) => {
  const res = await axios.put(`${API_URL}/${id}`, exhibitionData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

// Delete exhibition
export const deleteExhibition = async (id, token) => {
  const res = await axios.delete(`${API_URL}/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

// Get exhibition stats (to be paired with future backend route)
export const getExhibitionStats = async (token) => {
  const res = await axios.get(`${API_URL}/stats`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};