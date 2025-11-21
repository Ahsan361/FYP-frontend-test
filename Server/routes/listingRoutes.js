// routes/listingRoutes.js
import express from "express";
import { 
  createListing, 
  getListings, 
  getListingById,
  updateListing,
  deleteListing,
  getListingStats
} from "../controllers/listingController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import { authorize } from "../middleware/rbac.js";

const router = express.Router();

// Public routes
router.get("/", getListings);                        // Anyone can view listings
router.get("/:id", getListingById);                  // Anyone can view single listing

// Admin routes
router.post("/", authMiddleware, authorize("admin"), createListing);           // Admin creates listing
router.put("/:id", authMiddleware, authorize("admin"), updateListing);         // Admin updates listing
router.delete("/:id", authMiddleware, authorize("admin"), deleteListing);      // Admin deletes listing
router.get("/stats/all", authMiddleware, authorize("admin"), getListingStats); // Admin gets stats

export default router;