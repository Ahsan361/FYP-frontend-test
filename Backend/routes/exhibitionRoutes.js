import express from "express";
import { createExhibition, getExhibitions, getExhibitionById, updateExhibition, deleteExhibition, getExhibitionStats } from "../controllers/exhibitionController.js";
import protect from "../middleware/authMiddleware.js";
import { authorize } from "../middleware/rbac.js";

const router = express.Router();
//user routes
router.get("/", getExhibitions);                  //user specific route
router.post("/", protect, authorize("admin"), createExhibition);          //admin specific route
router.get("/stats", protect, authorize("admin"), getExhibitionStats)      //admin specific routes

//admin only routes
router.get("/:id", protect, getExhibitionById);    //user specific route
router.put("/:id",  protect, authorize("admin"), updateExhibition);       //admin specific route
router.delete("/:id",  protect, authorize("admin"), protect, deleteExhibition);    //admin specific route

export default router;
