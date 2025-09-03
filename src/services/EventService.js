import axios from "axios";

const API_URL = "http://localhost:5000/api/events"; // Adjust if different
const REGISTRATION_API_URL = "http://localhost:5000/api/event-registrations"; // Adjust if different

// Get all events
export const getEvents = async (token) => {
  const res = await axios.get(API_URL, {
      headers: { Authorization: `Bearer ${token}` },
    });
  return res.data;
};

// Get single event by ID
export const getEventById = async (id, token) => {
  const res = await axios.get(`${API_URL}/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  return res.data;
};

// Create new event
export const createEvent = async (eventData, token) => {
  const res = await axios.post(API_URL, eventData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

// Update event
export const updateEvent = async (id, eventData, token) => {
  const res = await axios.put(`${API_URL}/${id}`, eventData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

// Delete event
export const deleteEvent = async (id, token) => {
  const res = await axios.delete(`${API_URL}/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

// Register for an event
export const registerForEvent = async (eventId, token) => {
  const res = await axios.post(REGISTRATION_API_URL, { eventId }, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

// Get all registrations for an event
export const getRegistrationsForEvent = async (eventId, token) => {
  const res = await axios.get(`${REGISTRATION_API_URL}/event/${eventId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  return res.data;
};

// Get logged-in user's registrations
export const getMyRegistrations = async (token) => {
  const res = await axios.get(`${REGISTRATION_API_URL}/me`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

// Cancel registration
export const cancelRegistration = async (id, token) => {
  const res = await axios.put(`${REGISTRATION_API_URL}/cancel/${id}`, {}, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

// 📊 Get Event Stats
export const getEventStats = async (token) => {
  const res = await axios.get(`${API_URL}/stats`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};