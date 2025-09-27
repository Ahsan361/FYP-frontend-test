import express from "express";
import { registerUser, loginUser, resetPassword, verifyEmail, resendOTP } from "../controllers/authController.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/reset-password", resetPassword);
router.post("/verify-email", verifyEmail);
router.post("/resend-otp", resendOTP);

export default router;


