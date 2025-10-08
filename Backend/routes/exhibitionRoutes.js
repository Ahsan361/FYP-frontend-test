import express from "express";
import { createExhibition, getExhibitions, getExhibitionById, updateExhibition, deleteExhibition, getExhibitionStats } from "../controllers/exhibitionController.js";
import protect from "../middleware/authMiddleware.js";
import { authorize } from "../middleware/rbac.js";
import { upload } from "../config/cloudinary.js";

const router = express.Router();
// User routes
router.get("/", getExhibitions); // User specific route
router.post("/", protect, authorize("admin"), upload.array("exhibitionImage", 10), createExhibition); // Admin specific route, max 10 images
router.get("/stats", protect, authorize("admin"), getExhibitionStats); // Admin specific routes

// Admin only routes
router.get("/:id", protect, getExhibitionById); // User specific route
router.put("/:id", protect, authorize("admin"), upload.array("exhibitionImage", 10), updateExhibition); // Admin specific route, max 10 images
router.delete("/:id", protect, authorize("admin"), deleteExhibition); // Admin specific route

export default router;