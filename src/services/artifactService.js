// src/services/artifactService.js
import axios from "axios";

const API_URL = "http://localhost:5000/api/artifacts"; // adjust if different

// Get all artifacts
export const getArtifacts = async (token) => {
  const res = await axios.get(API_URL, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};


// Create new artifact
export const createArtifact = async (artifactData, token) => {
  const res = await axios.post(API_URL, artifactData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

// Edit artifact (NEW)
export const editArtifact = async (id, artifactData, token) => {
  const res = await axios.put(`${API_URL}/${id}`, artifactData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

// Delete artifact
export const deleteArtifact = async (id, token) => {
  const res = await axios.delete(`${API_URL}/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

//get artifacts stats
export const getArtifactStats = async (token) => {
  const res = await axios.get(`${API_URL}/stats`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data; // { total, published, drafts, underReview }
};
