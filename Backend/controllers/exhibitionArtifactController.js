import ExhibitionArtifact from "../models/ExhibitionArtifact.js";

// Add artifact to exhibition
export const addArtifactToExhibition = async (req, res) => {
  try {
    const link = await ExhibitionArtifact.create(req.body);
    res.status(201).json(link);
  } catch (error) {
    res.status(500).json({ message: "Error linking artifact to exhibition", error: error.message });
  }
};

// Get all artifacts for an exhibition
export const getArtifactsForExhibition = async (req, res) => {
  try {
    const artifacts = await ExhibitionArtifact.find({ exhibition_id: req.params.exhibitionId })
      .populate("artifact_id", "title category status");
    res.json(artifacts);
  } catch (error) {
    res.status(500).json({ message: "Error fetching exhibition artifacts" });
  }
};

// Get all exhibitions an artifact belongs to
export const getExhibitionsForArtifact = async (req, res) => {
  try {
    const exhibitions = await ExhibitionArtifact.find({ artifact_id: req.params.artifactId })
      .populate("exhibition_id", "title start_date end_date location");
    res.json(exhibitions);
  } catch (error) {
    res.status(500).json({ message: "Error fetching artifact exhibitions" });
  }
};

// Remove artifact from exhibition
export const removeArtifactFromExhibition = async (req, res) => {
  try {
    const record = await ExhibitionArtifact.findByIdAndDelete(req.params.id);
    if (!record) return res.status(404).json({ message: "Link not found" });
    res.json({ message: "Artifact removed from exhibition" });
  } catch (error) {
    res.status(500).json({ message: "Error removing artifact from exhibition" });
  }
};
