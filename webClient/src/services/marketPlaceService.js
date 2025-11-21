// services/marketplaceService.js
import axios from "axios";

const API_URL = "http://localhost:5000/api/marketplace"; 
const STATS_API_URL = `${API_URL}/stats`; 

// Get all listings
export const getAllListings = async (token) => {
  const res = await axios.get(API_URL, {
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });
  return res.data;
};

// Get single listing by ID
export const getListingById = async (id, token) => {
  const res = await axios.get(`${API_URL}/${id}`, {
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });
  return res.data;
};

// Create listing
export const createListing = async (listingData, token) => {
  const res = await axios.post(API_URL, listingData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

// Update listing
export const updateListing = async (id, listingData, token) => {
  const res = await axios.put(`${API_URL}/${id}`, listingData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

// Delete listing
export const deleteListing = async (id, token) => {
  const res = await axios.delete(`${API_URL}/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

//  Get marketplace stats
export const getMarketplaceStats = async (token) => {
  const res = await axios.get(STATS_API_URL, {
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });
  return res.data;
};
