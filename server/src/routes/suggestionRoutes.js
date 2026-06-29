import express from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { generateSuggestions } from "../controllers/suggestionController.js";

const router = express.Router();

router.get("/generate", authMiddleware, generateSuggestions);

export default router;
