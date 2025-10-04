// src/services/artifactService.js
import axios from "axios";

const API_URL = "http://localhost:5000/api/artifacts"; 

// Get all artifacts
export const getArtifacts = async (token) => {
  const res = await axios.get(API_URL, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};


// Create new artifact
export const createArtifact = async (artifactData, token) => {
  const formData = new FormData();

  Object.keys(artifactData).forEach((key) => {
    if (key !== "artifactImage") {
      formData.append(key, artifactData[key]);
    }
  });

  if (artifactData.artifactImage instanceof File) {
    formData.append("artifactImage", artifactData.artifactImage);
  }

  const res = await axios.post(API_URL, formData, {
    headers: { 
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
};

// Edit artifact (NEW)
export const editArtifact = async (id, artifactData, token) => {
  const formData = new FormData();

  Object.keys(artifactData).forEach((key) => {
    if (key === "contributor_id" && typeof artifactData[key] === "object") {
      formData.append("contributor_id", artifactData[key]._id);
    } else if (key !== "artifactImage") {
      formData.append(key, artifactData[key]);
    }
  });

  if (artifactData.artifactImage instanceof File) {
    formData.append("artifactImage", artifactData.artifactImage);
  }

  const res = await axios.put(`${API_URL}/${id}`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
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
  return res.data; 
};
