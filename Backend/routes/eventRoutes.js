import express from "express";
import { createEvent, getEvents, getEventById, updateEvent, deleteEvent, getEventStats } from "../controllers/eventController.js";
import protect from "../middleware/authMiddleware.js";
import { authorize } from "../middleware/rbac.js";
import { upload } from "../config/cloudinary.js";

const router = express.Router();

router.post("/", protect, authorize("admin"), upload.array("eventImage", 10), createEvent); // Admin specific route, max 10 images
router.get("/", getEvents); // Get all events
router.get("/stats", protect, authorize("admin"), getEventStats); // Get event stats

router.get("/:id", protect, getEventById); // Get one
router.put("/:id", protect, authorize("admin"), upload.array("eventImage", 10), updateEvent); // Admin specific route, max 10 images
router.delete("/:id", protect, authorize("admin"), deleteEvent); // Admin specific route

export default router;