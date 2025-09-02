import Artifact from "../models/Artifact.js";

// Create new artifact
export const createArtifact = async (req, res) => {
  try {
    const artifact = await Artifact.create({ ...req.body, contributor_id: req.user._id });
    res.status(201).json(artifact);
  } catch (error) {
    console.log("❌ Error in createArtifact:", error);
    res.status(500).json({ message: "Error creating artifact", error: error.message });
  }
};

// Get all artifacts
export const getArtifacts = async (req, res) => {
  try {
    const artifacts = await Artifact.find().populate("contributor_id", "username email");
    res.json(artifacts);
  } catch (error) {
    console.log("❌ Error in getArtifacts:", error); 
    res.status(500).json({ message: "Error fetching artifacts" });
  }
};

// Get single artifact
export const getArtifactById = async (req, res) => {
  try {
    const artifact = await Artifact.findById(req.params.id).populate("contributor_id", "username email");
    if (!artifact) return res.status(404).json({ message: "Artifact not found" });
    res.json(artifact);
  } catch (error) {
    console.log("❌ Error in getSingleArtifacts:", error); 
    res.status(500).json({ message: "Error fetching artifact" });
  }
};

// Update artifact
export const updateArtifact = async (req, res) => {
  try {
    const artifact = await Artifact.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!artifact) return res.status(404).json({ message: "Artifact not found" });
    res.json(artifact);
  } catch (error) {
    console.log("❌ Error in UpdateArtifacts:", error); 
    res.status(500).json({ message: "Error updating artifact" });
  }
};

// Delete artifact
export const deleteArtifact = async (req, res) => {
  try {
    const artifact = await Artifact.findByIdAndDelete(req.params.id);
    if (!artifact) return res.status(404).json({ message: "Artifact not found" });
    res.json({ message: "Artifact deleted successfully" });
  } catch (error) {
    console.log("❌ Error in DeleteArtifacts:", error); 
    res.status(500).json({ message: "Error deleting artifact" });
  }
};

//get artifacts stats
export const getArtifactStats = async (req, res) => {
  try {
    const total = await Artifact.countDocuments();
    const published = await Artifact.countDocuments({ status: "published" });
    const drafts = await Artifact.countDocuments({ status: "draft" });
    const underReview = total - (published + drafts);

    res.json({ total, published, drafts, underReview });
  } catch (err) {
    console.log("❌ Error in getArtifactStats:", err);
    res.status(500).json({ message: "Server error" });
  }
};