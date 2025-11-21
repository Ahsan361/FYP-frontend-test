// routes/imageRoutes.js
import express from "express";
import { upload } from "../config/cloudinary.js";
import { uploadImage, updateImage, deleteImage, getImage } from "../controllers/imageController.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

// Upload
router.post("/upload", protect, upload.single("profileImage"), uploadImage);

// Update
router.put("/update", protect, upload.single("profileImage"), updateImage);

// Delete
router.delete("/delete", protect, deleteImage);

// Get
router.get("/", getImage);

export default router;
