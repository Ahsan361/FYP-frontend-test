import express from "express";
import { createExhibition, getExhibitions, getExhibitionById, updateExhibition, deleteExhibition, getExhibitionStats } from "../controllers/exhibitionController.js";
import protect from "../middleware/authMiddleware.js";
import { authorize } from "../middleware/rbac.js";

const router = express.Router();
//user routes
router.get("/", getExhibitions);                      // Get all exhibitions
router.get("/stats", getExhibitionStats)            
router.get("/:id", getExhibitionById);    // Get one


//admin only routes
router.post("/", protect, authorize("admin"), createExhibition);          // Create exhibition
router.put("/:id",  protect, authorize("admin"), updateExhibition);        // Update
router.delete("/:id",  protect, authorize("admin"), protect, deleteExhibition);     // Delete

export default router;
