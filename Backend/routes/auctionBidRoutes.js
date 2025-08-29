import express from "express";
import { placeBid, getBidsForListing, getBidById, deleteBid } from "../controllers/auctionBidController.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, placeBid);                     // Place a bid
router.get("/listing/:listingId", getBidsForListing);    // Get all bids for listing
router.get("/:id", getBidById);                          // Get one bid
router.delete("/:id", protect, deleteBid);               // Delete bid

export default router;
