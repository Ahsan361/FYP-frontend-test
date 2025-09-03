import express from "express";
import { createListing, getAllListings, getListingById, updateListing, deleteListing, getMarketplaceStats } from "../controllers/marketplaceController.js";
import protect from "../middleware/authMiddleware.js";
import { authorize } from "../middleware/rbac.js";

const router = express.Router();

router.post("/", protect, authorize("admin"), createListing);         // admin specific route
router.get("/", getAllListings);                  // user specific route
router.get("/stats", protect, authorize("admin"), getMarketplaceStats);       // admin specific route

router.get("/:id", protect, authorize("admin"), getListingById);               // admin specific route
router.put("/:id", protect, authorize("admin"),updateListing);      // admin specific route
router.delete("/:id", protect, authorize("admin"), deleteListing);    // admin specific route

export default router;
