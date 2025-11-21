import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api"; 

// Get all exhibitions
export const getExhibitions = async (token) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/exhibitions`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching exhibitions:', error);
    throw error;
  }
};

// Get single exhibition
export const getExhibitionById = async (id, token) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/exhibitions/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching exhibition:', error);
    throw error;
  }
};

// Create exhibition with multiple images
export const createExhibition = async (exhibitionData, token) => {
  try {
    const formData = new FormData();
    
    // Append all text fields
    Object.keys(exhibitionData).forEach(key => {
      if (key !== 'exhibitionImage') {
        formData.append(key, exhibitionData[key]);
      }
    });
    
    // Append multiple images if they exist
    if (exhibitionData.exhibitionImage) {
      if (Array.isArray(exhibitionData.exhibitionImage)) {
        // Multiple files
        exhibitionData.exhibitionImage.forEach((file) => {
          formData.append('exhibitionImage', file);
        });
      } else {
        // Single file
        formData.append('exhibitionImage', exhibitionData.exhibitionImage);
      }
    }

    const response = await axios.post(`${API_BASE_URL}/exhibitions`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data'
      }
    });
    
    return response.data;
  } catch (error) {
    console.error('Error creating exhibition:', error);
    throw error;
  }
};

// Update exhibition with multiple images
export const updateExhibition = async (id, exhibitionData, token) => {
  try {
    const formData = new FormData();
    
    // Fields to exclude from update (read-only or auto-managed)
    const excludeFields = ['exhibitionImage', 'curator_id', '_id', 'createdAt', 'updatedAt', '__v', 'current_bookings'];
    
    // Append all text fields except excluded ones
    Object.keys(exhibitionData).forEach(key => {
      if (!excludeFields.includes(key)) {
        // Handle nested objects (like curator_id which might be populated)
        const value = exhibitionData[key];
        
        // Skip if value is an object (except for special cases)
        if (typeof value === 'object' && value !== null && !(value instanceof Date)) {
          return;
        }
        
        formData.append(key, value);
      }
    });
    
    // Handle exhibition images
    if (exhibitionData.exhibitionImage) {
      // Check if the first item is a File object (new upload) or an object with url (existing)
      const isNewUpload = exhibitionData.exhibitionImage[0] instanceof File;
      
      if (isNewUpload) {
        // New images are being uploaded
        if (Array.isArray(exhibitionData.exhibitionImage)) {
          // Multiple files
          exhibitionData.exhibitionImage.forEach((file) => {
            formData.append('exhibitionImage', file);
          });
        } else if (exhibitionData.exhibitionImage instanceof File) {
          // Single file
          formData.append('exhibitionImage', exhibitionData.exhibitionImage);
        }
      }
      // If not new upload (existing images), don't append anything
      // The backend will keep the existing images
    }

    const response = await axios.put(`${API_BASE_URL}/exhibitions/${id}`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data'
      }
    });
    
    return response.data;
  } catch (error) {
    console.error('Error updating exhibition:', error);
    throw error;
  }
};

// Delete exhibition
export const deleteExhibition = async (id, token) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/exhibitions/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error deleting exhibition:', error);
    throw error;
  }
};

// Get exhibition stats
export const getExhibitionStats = async (token) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/exhibitions/stats`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching exhibition stats:', error);
    throw error;
  }
};