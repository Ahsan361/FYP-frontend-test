import ArtifactMedia from "../models/ArtifactMedia.js";

// Create media for an artifact
export const createMedia = async (req, res) => {
  try {
    const media = await ArtifactMedia.create({ ...req.body, uploaded_by: req.user._id });
    res.status(201).json(media);
  } catch (error) {
    res.status(500).json({ message: "Error creating media", error: error.message });
  }
};

// Get all media for an artifact
export const getMediaByArtifact = async (req, res) => {
  try {
    const media = await ArtifactMedia.find({ artifact_id: req.params.artifactId });
    res.json(media);
  } catch (error) {
    res.status(500).json({ message: "Error fetching media" });
  }
};

// Get single media by id
export const getMediaById = async (req, res) => {
  try {
    const media = await ArtifactMedia.findById(req.params.id);
    if (!media) return res.status(404).json({ message: "Media not found" });
    res.json(media);
  } catch (error) {
    res.status(500).json({ message: "Error fetching media" });
  }
};

// Update media
export const updateMedia = async (req, res) => {
  try {
    const media = await ArtifactMedia.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!media) return res.status(404).json({ message: "Media not found" });
    res.json(media);
  } catch (error) {
    res.status(500).json({ message: "Error updating media" });
  }
};

// Delete media
export const deleteMedia = async (req, res) => {
  try {
    const media = await ArtifactMedia.findByIdAndDelete(req.params.id);
    if (!media) return res.status(404).json({ message: "Media not found" });
    res.json({ message: "Media deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting media" });
  }
};
