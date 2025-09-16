// src/services/exhibitionRegistrationService.js
import axios from "axios";

const API_URL = "http://localhost:5000/api/exhibition-registrations";

// Create new exhibition registration
export const createExhibitionRegistration = async (registrationData, token) => {
  const res = await axios.post(API_URL, registrationData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

// Get my exhibition registrations
export const getMyExhibitionRegistrations = async (token) => {
  const res = await axios.get(`${API_URL}/me`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

// Cancel my exhibition registration
export const cancelExhibitionRegistration = async (id, token) => {
  const res = await axios.put(
    `${API_URL}/cancel/${id}`,
    {},
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return res.data;
};

// Delete exhibition registration (user can delete own, admin can delete any)
export const deleteExhibitionRegistration = async (id, token) => {
  const res = await axios.delete(`${API_URL}/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

// Update exhibition registration (admin only)
export const updateExhibitionRegistration = async (id, registrationData, token) => {
  const res = await axios.put(`${API_URL}/${id}`, registrationData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

// Get registrations for a specific exhibition (public route)
export const getRegistrationsByExhibition = async (exhibitionId) => {
  const res = await axios.get(`${API_URL}/exhibition/${exhibitionId}`);
  return res.data;
};


// Admin Functions

// Get all exhibition registrations (admin only)
export const getAllExhibitionRegistrations = async (token) => {
  const res = await axios.get(API_URL, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

// Confirm exhibition registration (admin only)
export const confirmExhibitionRegistration = async (id, token) => {
  const res = await axios.put(
    `${API_URL}/confirm/${id}`,
    {},
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return res.data;
};

// Process payment for exhibition registration (admin only)
export const processExhibitionPayment = async (id, token) => {
  const res = await axios.put(
    `${API_URL}/process-payment/${id}`,
    {},
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return res.data;
};

// Get exhibition registration statistics (admin only)
export const getExhibitionRegistrationStats = async (token) => {
  const res = await axios.get(`${API_URL}/stats`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};
