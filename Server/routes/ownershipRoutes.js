import express from "express";
import { createOwnership, getAllOwnerships, getOwnershipById, updateOwnership, deleteOwnership } from "../controllers/ownershipController.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, createOwnership);         // Create ownership record
router.get("/", getAllOwnerships);                  // Get all ownerships
router.get("/:id", getOwnershipById);               // Get one ownership record
router.put("/:id", protect, updateOwnership);       // Update record
router.delete("/:id", protect, deleteOwnership);    // Delete record

export default router;
