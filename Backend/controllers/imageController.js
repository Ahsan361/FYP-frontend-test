// controllers/imageController.js
import { uploadToCloudinary, deleteFromCloudinary } from "../config/cloudinary.js";

// Upload new image
export const uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: "No image file provided" });
    }

    const uploadResult = await uploadToCloudinary(req.file.buffer);

    res.status(200).json({
      success: true,
      message: "Image uploaded successfully",
      data: {
        url: uploadResult.secure_url,
        publicId: uploadResult.public_id,
      },
    });
  } catch (error) {
    console.error("Upload image error:", error);
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};

// Update (replace) an image
export const updateImage = async (req, res) => {
  try {
    const { oldPublicId } = req.body; // pass old image publicId if exists

    if (!req.file) {
      return res.status(400).json({ success: false, message: "No image file provided" });
    }

    const uploadResult = await uploadToCloudinary(req.file.buffer);

    // Delete old image if provided
    if (oldPublicId) {
      try {
        await deleteFromCloudinary(oldPublicId);
      } catch (err) {
        console.error("Error deleting old image:", err);
      }
    }

    res.status(200).json({
      success: true,
      message: "Image updated successfully",
      data: {
        url: uploadResult.secure_url,
        publicId: uploadResult.public_id,
      },
    });
  } catch (error) {
    console.error("Update image error:", error);
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};

// Delete image
export const deleteImage = async (req, res) => {
  try {
    const { publicId } = req.body;
    if (!publicId) {
      return res.status(400).json({ success: false, message: "Public ID required" });
    }

    await deleteFromCloudinary(publicId);

    res.status(200).json({ success: true, message: "Image deleted successfully" });
  } catch (error) {
    console.error("Delete image error:", error);
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};

// Get image (public access)
export const getImage = async (req, res) => {
  try {
    const { url } = req.query;
    if (!url) {
      return res.status(400).json({ success: false, message: "Image URL required" });
    }

    // Simply return URL (cloudinary is already public)
    res.status(200).json({
      success: true,
      data: { url },
    });
  } catch (error) {
    console.error("Get image error:", error);
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};
