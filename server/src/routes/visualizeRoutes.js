import express from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { getVisualizationData } from "../controllers/visualizeController.js";

const router = express.Router();

router.get("/summary", authMiddleware, getVisualizationData);

export default router;
