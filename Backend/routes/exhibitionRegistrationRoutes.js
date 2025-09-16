import express from "express";
import protect from "../middleware/authMiddleware.js";
import { authorize } from "../middleware/rbac.js";

import { 
  registerForExhibition,
  getRegistrationsForExhibition,
  getMyExhibitionRegistrations,
  cancelExhibitionRegistration,
  getExhibitionRegistrationStats,
  getAllExhibitionRegistrations,
  confirmExhibitionRegistration,
  processExhibitionPayment,
  deleteExhibitionRegistration,
  updateExhibitionRegistration
} from "../controllers/exhibitionRegistrationController.js";

const router = express.Router();

// user routes
router.post("/", protect, registerForExhibition); // not user specific
router.get("/", protect, authorize("admin"), getAllExhibitionRegistrations); // admin specific route
router.get("/exhibition/:exhibitionId", getRegistrationsForExhibition); // not user specific
router.get("/me", protect, getMyExhibitionRegistrations); // user route
router.delete("/:id", protect, deleteExhibitionRegistration); // not user specific
router.get("/stats", protect, authorize("admin"), getExhibitionRegistrationStats); // admin specific route
router.put("/confirm/:id", protect, authorize("admin"), confirmExhibitionRegistration); // admin specific route
router.put("/process-payment/:id", protect, authorize("admin"), processExhibitionPayment); // admin specific route
router.put("/cancel/:id", protect, cancelExhibitionRegistration); // not user specific route
router.put("/:id", protect, authorize("admin"), updateExhibitionRegistration); // admin specific route

export default router;
