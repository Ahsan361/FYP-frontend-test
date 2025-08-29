import Exhibition from "../models/Exhibition.js";

// Create exhibition
export const createExhibition = async (req, res) => {
  try {
    const exhibition = await Exhibition.create({ ...req.body, curator_id: req.user._id });
    res.status(201).json(exhibition);
  } catch (error) {
    res.status(500).json({ message: "Error creating exhibition", error: error.message });
  }
};

// Get all exhibitions
export const getExhibitions = async (req, res) => {
  try {
    const exhibitions = await Exhibition.find().populate("curator_id", "username email");
    res.json(exhibitions);
  } catch (error) {
    res.status(500).json({ message: "Error fetching exhibitions" });
  }
};

// Get single exhibition
export const getExhibitionById = async (req, res) => {
  try {
    const exhibition = await Exhibition.findById(req.params.id).populate("curator_id", "username email");
    if (!exhibition) return res.status(404).json({ message: "Exhibition not found" });
    res.json(exhibition);
  } catch (error) {
    res.status(500).json({ message: "Error fetching exhibition" });
  }
};

// Update exhibition
export const updateExhibition = async (req, res) => {
  try {
    const exhibition = await Exhibition.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!exhibition) return res.status(404).json({ message: "Exhibition not found" });
    res.json(exhibition);
  } catch (error) {
    res.status(500).json({ message: "Error updating exhibition" });
  }
};

// Delete exhibition
export const deleteExhibition = async (req, res) => {
  try {
    const exhibition = await Exhibition.findByIdAndDelete(req.params.id);
    if (!exhibition) return res.status(404).json({ message: "Exhibition not found" });
    res.json({ message: "Exhibition deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting exhibition" });
  }
};
