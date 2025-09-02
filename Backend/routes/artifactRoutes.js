import express from "express";
import { createArtifact, getArtifacts, getArtifactById, updateArtifact, deleteArtifact, getArtifactStats  } from "../controllers/artifactController.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, createArtifact);       // Create artifact
router.get("/", getArtifacts);                  // Get all
router.get("/stats", getArtifactStats); //artifacts stats
router.get("/:id", getArtifactById);            // Get one
router.put("/:id", protect, updateArtifact);    // Update
router.delete("/:id", protect, deleteArtifact); // Delete


export default router;
