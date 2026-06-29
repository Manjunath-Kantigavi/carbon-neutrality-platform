import express from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { createOperation , getLatestOperation } from "../controllers/miningOperationController.js";

const router = express.Router();

router.post("/create", authMiddleware, createOperation);
router.get("/latest", authMiddleware, getLatestOperation);

export default router;
