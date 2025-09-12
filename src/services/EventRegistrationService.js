// src/services/eventRegistrationService.js
import axios from "axios";

const API_URL = "http://localhost:5000/api/event-registrations"; 

// Get all event registrations (admin only)
export const getEventRegistrations = async (token) => {
  const res = await axios.get(API_URL, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

// Create new event registration 
export const createEventRegistration = async (registrationData, token) => {
  const res = await axios.post(API_URL, registrationData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

// Edit event registration
export const editEventRegistration = async (id, registrationData, token) => {
  const res = await axios.put(`${API_URL}/${id}`, registrationData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

// Delete event registration
export const deleteEventRegistration = async (id, token) => {
  const res = await axios.delete(`${API_URL}/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

// Cancel registration
export const cancelEventRegistration = async (id, token) => {
  const res = await axios.put(`${API_URL}/cancel/${id}`, {}, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

// Confirm registration (admin only)
export const confirmEventRegistration = async (id, token) => {
  const res = await axios.put(`${API_URL}/confirm/${id}`, {}, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

// Process payment (admin only)
export const processPayment = async (id, token) => {
  const res = await axios.put(`${API_URL}/process-payment/${id}`, {}, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

// Get event registration statistics (admin only)
export const getEventRegistrationStats = async (token) => {
  const res = await axios.get(`${API_URL}/stats`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};