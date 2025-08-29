import express from "express";
import { createExhibition, getExhibitions, getExhibitionById, updateExhibition, deleteExhibition } from "../controllers/exhibitionController.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, createExhibition);          // Create exhibition
router.get("/", getExhibitions);                      // Get all exhibitions
router.get("/:id", getExhibitionById);                // Get one
router.put("/:id", protect, updateExhibition);        // Update
router.delete("/:id", protect, deleteExhibition);     // Delete

export default router;
