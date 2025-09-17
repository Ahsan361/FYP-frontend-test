import express from "express";
import { addUser, getUserProfile, getAllUsers, getUserById, updateUser, deleteUser, getUserStats } from "../controllers/userController.js";
import protect from "../middleware/authMiddleware.js";
import { authorize } from "../middleware/rbac.js";
const router = express.Router();

//normal user routes
router.get("/profile", protect, getUserProfile);
router.put("/:id", protect, updateUser); //update user

// ✅ Admin routes (restricted)
router.get("/", protect, authorize("admin"), getAllUsers);         // Get all users   
router.post("/", protect, authorize("admin"), addUser)      // add user
router.get("/stats", protect, authorize("admin"), getUserStats); // User statistics (example: active count etc.)
router.get("/:id", protect, authorize("admin"), getUserById);         // Get single user by ID
router.delete("/:id", protect, authorize("admin"), deleteUser);       // Delete a user


export default router;