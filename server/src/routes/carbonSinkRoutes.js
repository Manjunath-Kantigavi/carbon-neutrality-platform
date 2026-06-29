import express from "express";
import { submitCarbonSinks , getLatestCarbonSink } from "../controllers/carbonSinkController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/submit", authMiddleware, submitCarbonSinks);
router.get("/latest", authMiddleware, getLatestCarbonSink);

export default router;
