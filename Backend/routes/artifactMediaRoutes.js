import express from "express";
import { createMedia, getMediaByArtifact, getMediaById, updateMedia, deleteMedia } from "../controllers/artifactMediaController.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, createMedia);                       // Create new media
router.get("/artifact/:artifactId", getMediaByArtifact);      // Get all media for an artifact
router.get("/:id", getMediaById);                             // Get single media
router.put("/:id", protect, updateMedia);                     // Update media
router.delete("/:id", protect, deleteMedia);                  // Delete media

export default router;
