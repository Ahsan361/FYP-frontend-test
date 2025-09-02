import express from "express";
import { placeBid, getBidsForListing, getBidById, deleteBid, getAllBids } from "../controllers/auctionBidController.js";
import protect from "../middleware/authMiddleware.js";
import { authorize } from "../middleware/rbac.js";

const router = express.Router();

router.post("/", protect, authorize("admin"), placeBid);                     // Place a bid
router.get("/all", protect, authorize("admin"), getAllBids)                 // get all bids
router.get("/listing/:listingId", protect, authorize("admin"), getBidsForListing);    // Get all bids for listing
router.get("/:id", protect, authorize("admin"), getBidById);                          // Get one bid
router.delete("/:id", protect, authorize("admin"), deleteBid);               // Delete bid

export default router;
