import express from "express";
import { createEvent, getEvents, getEventById, updateEvent, deleteEvent, getEventStats } from "../controllers/eventController.js";
import protect from "../middleware/authMiddleware.js";
import { authorize } from "../middleware/rbac.js";

const router = express.Router();

router.post("/", protect, authorize("admin"), createEvent);          // admin specific route
router.get("/", getEvents);                      // Get all events
router.get("/stats", protect, authorize("admin"), getEventStats);             // Get event stats

router.get("/:id", protect, getEventById);                // Get one
router.put("/:id", protect, authorize("admin"), protect, updateEvent);        // admin specific route
router.delete("/:id", protect, authorize("admin"), protect, deleteEvent);      // admin specific route

export default router;
