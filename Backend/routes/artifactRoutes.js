import express from "express";
import { createArtifact, getArtifacts, getArtifactById, updateArtifact, deleteArtifact, getArtifactStats } from "../controllers/artifactController.js";
import protect from "../middleware/authMiddleware.js";
import { authorize } from "../middleware/rbac.js";
import { upload } from "../config/cloudinary.js";

const router = express.Router();
router.get("/", protect, getArtifacts);             // User specific routes
router.post("/", protect, authorize("admin"), upload.array("artifactImage", 10), createArtifact);     // Admin specific route, max 10 images
router.get("/stats", protect, authorize("admin"), getArtifactStats); // Admin specific route
router.put("/:id", protect, authorize("admin"), upload.array("artifactImage", 10), updateArtifact);    // Admin specific route, max 10 images
router.delete("/:id", protect, authorize("admin"), deleteArtifact); // Admin specific route
router.get("/:id", protect, getArtifactById);       // User specific routes

export default router;