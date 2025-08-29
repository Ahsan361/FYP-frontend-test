import express from "express";
import { createProcessing, getAllProcessing, getProcessingById, updateProcessing, deleteProcessing } from "../controllers/aiProcessingController.js";
import { protect, authorize } from "../middleware/rbac.js";

const router = express.Router();

// Everything under /api/ai-processing is admin-only:
router.use(protect, authorize("admin"));

router.post("/", createProcessing);
router.get("/", getAllProcessing);
router.get("/:id", getProcessingById);
router.put("/:id", updateProcessing);
router.delete("/:id", deleteProcessing);

export default router;
