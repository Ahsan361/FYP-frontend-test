// routes/userRoutes.js
import express from "express";
import { 
  addUser, 
  getUserProfile, 
  getAllUsers, 
  getUserById, 
  updateUser, 
  deleteUser, 
  getUserStats,
  checkStripeStatus  // ← NEW: Marketplace addition
} from "../controllers/userController.js";
import protect from "../middleware/authMiddleware.js";
import { authorize } from "../middleware/rbac.js";
import { upload } from "../config/cloudinary.js";

const router = express.Router();

// ============ NORMAL USER ROUTES ============
router.get("/profile", protect, getUserProfile);
router.put("/:id", upload.single("profileImage"), updateUser);

// ============ MARKETPLACE ADDITIONS ============
router.get("/stripe-status", protect, checkStripeStatus);  // ← NEW

// ============ ADMIN ROUTES ============
router.get("/", protect, authorize("admin"), getAllUsers);
router.post("/", protect, authorize("admin"), upload.single("profileImage"), addUser);
router.get("/stats", protect, authorize("admin"), getUserStats);
router.get("/:id", protect, authorize("admin"), getUserById);
router.delete("/:id", protect, authorize("admin"), deleteUser);

export default router;