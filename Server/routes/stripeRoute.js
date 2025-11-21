import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import { createConnectAccount, createCheckoutSession } from "../controllers/stripeController.js";

const router=express.Router();

router.post("/create-account", authMiddleware, createConnectAccount);
router.post("/create-checkout-session", authMiddleware, createCheckoutSession);


export default router;