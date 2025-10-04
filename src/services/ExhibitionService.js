import axios from "axios";

const API_URL = "http://localhost:5000/api/exhibitions"; // Adjust if different

// Get all exhibitions
export const getExhibitions = async () => {
  const res = await axios.get(API_URL);
  return res.data;
};


// Get single exhibition by ID
export const getExhibitionById = async (id, token) => {
  const res = await axios.get(`${API_URL}/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

// Create new exhibition
export const createExhibition = async (exhibitionData, token) => {
  const formData =  new FormData();

  Object.keys(exhibitionData).forEach((key) => {
    if( key !== "exhibitionImage"){
      formData.append(key, exhibitionData[key]);
    }
  });
  if(exhibitionData.exhibitionImage instanceof File){
    formData.append("exhibitionImage", exhibitionData.exhibitionImage);
  }

  const res = await axios.post(API_URL, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
};

// Update exhibition
export const updateExhibition = async (id, exhibitionData, token) => {
  const formData =  new FormData();

  Object.keys(exhibitionData).forEach((key) => {
    if(key === "curator_id" && typeof exhibitionData[key] === "object"){
      formData.append("curator_id", exhibitionData[key]._id);
    } else if( key !== "exhibitionImage"){
      formData.append(key, exhibitionData[key]);
    }
  });
  if(exhibitionData.exhibitionImage instanceof File){
    formData.append("exhibitionImage", exhibitionData.exhibitionImage);
  }

  const res = await axios.put(`${API_URL}/${id}`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type":"multipart/form-data",
  },
  });
  return res.data;
};

// Delete exhibition
export const deleteExhibition = async (id, token) => {
  const res = await axios.delete(`${API_URL}/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

// Get exhibition stats (to be paired with future backend route)
export const getExhibitionStats = async (token) => {
  const res = await axios.get(`${API_URL}/stats`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};