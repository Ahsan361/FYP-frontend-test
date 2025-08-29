import express from "express";
import { createRecord, getAllRecords, getRecordById, updateRecord, deleteRecord } from "../controllers/blockchainController.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, createRecord);         // Create record
router.get("/", getAllRecords);                 // Get all records
router.get("/:id", getRecordById);              // Get one
router.put("/:id", protect, updateRecord);      // Update
router.delete("/:id", protect, deleteRecord);   // Delete

export default router;
