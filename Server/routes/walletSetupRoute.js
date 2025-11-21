// routes/walletSetupRoute.js
import express from "express";
import { updateWalletAddress } from "../controllers/walletSetupController.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

// Update wallet address - requires authentication
router.put("/wallet", protect, updateWalletAddress);

export default router;