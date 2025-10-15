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

// --- MODIFIED: createArtifact to robustly handle multiple files ---
// Create new artifact
export const createArtifact = async (artifactData, token) => {
  const formData = new FormData();

  // Append all fields except for the images
  Object.keys(artifactData).forEach((key) => {
    if (key !== "artifactImage") {
      formData.append(key, artifactData[key]);
    }
  });
  
  // Append multiple image files if they exist
  if (artifactData.artifactImage && Array.isArray(artifactData.artifactImage)) {
    artifactData.artifactImage.forEach(file => {
      formData.append('artifactImage', file); // The key must match the backend ('artifactImage')
    });
  }

  const res = await axios.post(API_URL, formData, {
    headers: { 
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
};

// --- MODIFIED: Renamed to updateArtifact and completely refactored ---
// Update artifact
export const updateArtifact = async (id, artifactData, token) => {
  const formData = new FormData();
  
  // These fields should not be sent back to the backend during an update
  const excludeFields = [
    'artifactImage', 
    '_id', 
    'createdAt', 
    'updatedAt', 
    '__v',
    'contributor_id', // Exclude the populated object
    'curator_id'
  ];

  // Append simple key-value pairs
  Object.keys(artifactData).forEach((key) => {
    if (!excludeFields.includes(key)) {
      formData.append(key, artifactData[key]);
    }
  });

  // Handle new image uploads (which are 'File' objects)
  if (artifactData.artifactImage && Array.isArray(artifactData.artifactImage)) {
    const newFiles = artifactData.artifactImage.filter(
      (image) => image instanceof File
    );

    if (newFiles.length > 0) {
      newFiles.forEach(file => {
        formData.append('artifactImage', file);
      });
    }
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

// Get artifacts stats
export const getArtifactStats = async (token) => {
  const res = await axios.get(`${API_URL}/stats`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data; 
};