import express from "express";
import protect from "../middleware/authMiddleware.js";
import { authorize } from "../middleware/rbac.js";

import { registerForEvent, getRegistrationsForEvent, getMyRegistrations, cancelRegistration,
         getEventRegistrationStats, getAllRegistrations, confirmRegistration, processPayment, 
         deleteRegistration, updateRegistration
} from "../controllers/eventRegistrationController.js";


const router = express.Router();
//user routes
router.post("/", protect, registerForEvent);                        // not user specific
router.get("/", protect, authorize("admin"), getAllRegistrations);     // admin specific route
router.get("/event/:eventId", getRegistrationsForEvent);            //not user specific
router.get("/me", protect, getMyRegistrations);                     // user route
router.delete("/:id", protect, deleteRegistration);             // not user specific
router.get("/stats", protect, authorize("admin"), getEventRegistrationStats); //admin specific route
router.put("/confirm/:id", protect, authorize("admin"), confirmRegistration); //admin specific route
router.put("/process-payment/:id", protect, authorize("admin"), processPayment); //admin specific route
router.put("/cancel/:id", protect, cancelRegistration);             // not user specific route
router.put("/:id", protect, authorize("admin"), updateRegistration); //admin specific route
export default router;
