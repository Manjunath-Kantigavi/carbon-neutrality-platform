import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import miningOperationRoutes from "./routes/miningOperationRoutes.js";
import carbonSinkRoutes from "./routes/carbonSinkRoutes.js";
import visualizeRoutes from "./routes/visualizeRoutes.js";
import suggestionRoutes from "./routes/suggestionRoutes.js";
import emissionRoutes from "./routes/emissionRoutes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// DB connect
connectDB();

// routes
app.use("/api/auth", authRoutes);
//mining operation routes
app.use("/api/operations", miningOperationRoutes);
//carbon sink routes
app.use("/api/sinks", carbonSinkRoutes);
//emission routes
app.use("/api/emissions", emissionRoutes);
//visualization routes
app.use("/api/visualize", visualizeRoutes);
//suggestion routes
app.use("/api/suggestions", suggestionRoutes);
// simple health route
app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

export default app;
