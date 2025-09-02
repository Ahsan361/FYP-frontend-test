import express from "express";
import { createEvent, getEvents, getEventById, updateEvent, deleteEvent, getEventStats } from "../controllers/eventController.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, createEvent);          // Create event
router.get("/", getEvents);                      // Get all events
router.get("/stats", getEventStats);             // Get event stats
router.get("/:id", getEventById);                // Get one
router.put("/:id", protect, updateEvent);        // Update event
router.delete("/:id", protect, deleteEvent);     // Delete event

export default router;
