import Artifact from "../models/Artifact.js";
import { uploadToCloudinary, deleteFromCloudinary } from "../config/cloudinary.js";

// Create new artifact
export const createArtifact = async (req, res) => {
  try {
    let artifactData = { 
      ...req.body, 
      contributor_id: req.user._id 
    };

    if (req.file) {
      const uploadResult = await uploadToCloudinary(req.file.buffer, "miraas/artifacts");
      artifactData.artifactImage = {
        url: uploadResult.secure_url,
        publicId: uploadResult.public_id,
      };
    }

    const artifact = await Artifact.create(artifactData);

    res.status(201).json({
      success: true,
      message: "Artifact created successfully",
      data: artifact
    });
  } catch (error) {
    console.log("❌ Error in createArtifact:", error);
    res.status(500).json({ 
      success: false,
      message: "Error creating artifact", 
      error: error.message 
    });
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
    let artifact = await Artifact.findById(req.params.id);
    if (!artifact) return res.status(404).json({ message: "Artifact not found" });

    // Prepare update data dynamically
    const updateData = { ...req.body };

    // Handle image update
    if (req.file) {
      if (artifact.artifactImage?.publicId) {
        await deleteFromCloudinary(artifact.artifactImage.publicId);
      }
      const uploadResult = await uploadToCloudinary(req.file.buffer, "miraas/artifacts");
      updateData.artifactImage = {
        url: uploadResult.secure_url,
        publicId: uploadResult.public_id,
      };
    }

    // Update artifact in one go
    artifact = await Artifact.findByIdAndUpdate(req.params.id, updateData, { new: true });

    res.json({
      success: true,
      message: "Artifact updated successfully",
      data: artifact,
    });
  } catch (error) {
    console.log("❌ Error in updateArtifact:", error);
    res.status(500).json({ message: "Error updating artifact" });
  }
};


// Delete artifact
export const deleteArtifact = async (req, res) => {
  try {
    const artifact = await Artifact.findByIdAndDelete(req.params.id);
    if (!artifact) return res.status(404).json({ message: "Artifact not found" });
    
    //delete related image from cloud too
    if (artifact.artifactImage?.publicId) {
      await deleteFromCloudinary(artifact.artifactImage.publicId);
    }

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