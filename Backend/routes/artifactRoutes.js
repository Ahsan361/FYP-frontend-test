import express from "express";
import { createArtifact, getArtifacts, getArtifactById, updateArtifact, deleteArtifact, getArtifactStats  } from "../controllers/artifactController.js";
import protect from "../middleware/authMiddleware.js";
import { authorize } from "../middleware/rbac.js";

const router = express.Router();
router.get("/", protect, getArtifacts);             //user specific routes
router.post("/", protect, authorize("admin"), createArtifact);     //admin specific route
router.get("/stats", protect, authorize("admin"), getArtifactStats); //admin specific route
router.put("/:id", protect, authorize("admin"), updateArtifact);    //admin specific route
router.delete("/:id", protect, authorize("admin"), deleteArtifact); //admin specific route
router.get("/:id",protect, getArtifactById);            // //user specific routes

export default router;
