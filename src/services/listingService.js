// services/listingService.js
import axios from "axios";

const API_URL = `${import.meta.env.VITE_API_BASE_URL}/listings`;

// Get all listings (public)
export const getListings = async () => {
  const res = await axios.get(API_URL);
  return res.data;
};

// Get single listing (public)
export const getListingById = async (id) => {
  const res = await axios.get(`${API_URL}/${id}`);
  return res.data;
};

// Create listing (admin only - requires token)
export const createListing = async (listingData, token) => {
  const res = await axios.post(API_URL, listingData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

// Update listing (admin only)
export const updateListing = async (id, listingData, token) => {
  const res = await axios.put(`${API_URL}/${id}`, listingData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

// Delete listing (admin only)
export const deleteListing = async (id, token) => {
  const res = await axios.delete(`${API_URL}/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

// Get listing stats (admin only)
export const getListingStats = async (token) => {
  const res = await axios.get(`${API_URL}/stats/all`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};