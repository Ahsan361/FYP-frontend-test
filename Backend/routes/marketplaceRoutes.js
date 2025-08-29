import express from "express";
import { createListing, getAllListings, getListingById, updateListing, deleteListing } from "../controllers/marketplaceController.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, createListing);         // Create listing
router.get("/", getAllListings);                  // Get all
router.get("/:id", getListingById);               // Get one
router.put("/:id", protect, updateListing);       // Update
router.delete("/:id", protect, deleteListing);    // Delete

export default router;
