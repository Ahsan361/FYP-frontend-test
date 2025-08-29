import express from "express";
import { addArtifactToExhibition, getArtifactsForExhibition, getExhibitionsForArtifact, removeArtifactFromExhibition } from "../controllers/exhibitionArtifactController.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, addArtifactToExhibition);                  // Link artifact to exhibition
router.get("/exhibition/:exhibitionId", getArtifactsForExhibition); // Get artifacts in exhibition
router.get("/artifact/:artifactId", getExhibitionsForArtifact);     // Get exhibitions of an artifact
router.delete("/:id", protect, removeArtifactFromExhibition);       // Remove artifact from exhibition

export default router;
