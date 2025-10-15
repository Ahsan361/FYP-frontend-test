import axios from "axios";

const API_URL = "http://localhost:5000/api/events"; // Adjust if different
const REGISTRATION_API_URL = "http://localhost:5000/api/event-registrations"; // Adjust if different

// Get all events
export const getEvents = async () => {
  const res = await axios.get(API_URL);
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
  try {
    const formData = new FormData();

    // Append all text fields except images
    Object.keys(eventData).forEach(key => {
      if (key !== 'eventImage') {
        formData.append(key, eventData[key]);
      }
    });

    // Append multiple images if they exist
    if (eventData.eventImage) {
      if (Array.isArray(eventData.eventImage)) {
        eventData.eventImage.forEach(file => formData.append('eventImage', file));
      } else {
        formData.append('eventImage', eventData.eventImage);
      }
    }

    const response = await axios.post(`${API_URL}`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error creating event:', error);
    throw error;
  }
};


// Update event
export const updateEvent = async (id, eventData, token) => {
  try {
    const formData = new FormData();
    const excludeFields = ['eventImage', '_id', 'createdAt', 'updatedAt', '__v'];

    Object.keys(eventData).forEach(key => {
      if (!excludeFields.includes(key)) {
        const value = eventData[key];
        if (typeof value !== 'object' || value instanceof Date) {
          formData.append(key, value);
        }
      }
    });

    // Handle image uploads
    if (eventData.eventImage) {
      const isNewUpload = eventData.eventImage[0] instanceof File;

      if (isNewUpload) {
        if (Array.isArray(eventData.eventImage)) {
          eventData.eventImage.forEach(file => formData.append('eventImage', file));
        } else if (eventData.eventImage instanceof File) {
          formData.append('eventImage', eventData.eventImage);
        }
      }
    }

    const response = await axios.put(`${API_URL}/${id}`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error updating event:', error);
    throw error;
  }
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