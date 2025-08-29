import express from "express";
import { createBooking, getBookingsForExhibition, getMyBookings, cancelBooking } from "../controllers/visitBookingController.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, createBooking);                           // Create booking
router.get("/exhibition/:exhibitionId", getBookingsForExhibition);  // Get bookings for exhibition
router.get("/me", protect, getMyBookings);                          // Get logged-in user's bookings
router.put("/cancel/:id", protect, cancelBooking);                  // Cancel booking

export default router;
