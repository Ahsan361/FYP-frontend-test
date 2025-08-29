import express from "express";
import { registerForEvent, getRegistrationsForEvent, getMyRegistrations, cancelRegistration } from "../controllers/eventRegistrationController.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, registerForEvent);                        // Register for an event
router.get("/event/:eventId", getRegistrationsForEvent);            // Get all registrations for an event
router.get("/me", protect, getMyRegistrations);                     // Get logged-in user's registrations
router.put("/cancel/:id", protect, cancelRegistration);             // Cancel registration

export default router;
