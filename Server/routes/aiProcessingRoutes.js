import express from "express";
import { createProcessing, getAllProcessing, getProcessingById, updateProcessing, deleteProcessing } from "../controllers/aiProcessingController.js";
import { authorize } from "../middleware/rbac.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

// Everything under /api/ai-processing is admin-only:
router.use(protect, authorize("admin"));

router.post("/", createProcessing);
router.get("/", getAllProcessing);
router.get("/:id", getProcessingById);
router.put("/:id", updateProcessing);
router.delete("/:id", deleteProcessing);

export default router;
