import express from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { getLatestEmission } from "../controllers/emissionController.js";
import { getEmissionByOperation } from "../controllers/emissionController.js";

const router = express.Router();

router.get("/latest", authMiddleware, getLatestEmission);
router.get("/by-operation/:operationId", authMiddleware, getEmissionByOperation);

export default router;