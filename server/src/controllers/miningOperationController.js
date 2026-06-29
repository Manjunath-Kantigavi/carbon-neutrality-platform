import MiningOperation from "../models/MiningOperation.js";
import EmissionRecord from "../models/EmissionRecord.js";
import { calculateEmissions } from "../services/emissions/emissionCalculator.js";

export const createOperation = async (req, res) => {
  try {
    const userId = req.userId;

    const {
      excavationData,
      transportationData,
      equipmentData
    } = req.body;

    //1. Save the mining operation
    const operation = await MiningOperation.create({
      userId,
      excavationData,
      transportationData,
      equipmentData
    });

    // 2. Calculate emissions from the operation data
    const emissionResults = calculateEmissions(operation);


    // 3. Save the emission record , linked to this operation
    await EmissionRecord.create({
      operationId: operation._id,
      userId,
      excavationDailyKg: emissionResults.excavationDailyKg,
      transportDailyKg: emissionResults.transportDailyKg,
      equipmentDailyKg: emissionResults.equipmentDailyKg,
      excavationMonthlyKg: emissionResults.excavationMonthlyKg,
      transportMonthlyKg: emissionResults.transportMonthlyKg,
      equipmentMonthlyKg: emissionResults.equipmentMonthlyKg,
      totalDailyKg: emissionResults.totalDailyKg,
      totalMonthlyKg: emissionResults.totalMonthlyKg,
      contribution: emissionResults.contribution
    });


    res.status(201).json({
      message: "Mining operation submitted and emissions calculated",
      operation,
      emissions: emissionResults
    });

  } catch (err) {
    console.log("Create operation error:", err);
    res.status(500).json({ message: "Server error" });
  }
};


export const getLatestOperation = async (req, res) => {
  try {
    const userId = req.userId;
    const latestOp = await MiningOperation.findOne({ userId }).sort({ createdAt: -1 });

    if (!latestOp) {
      return res.status(404).json({ message: "No mining operation found. Please submit one first." });
    }

    res.json({ operation: latestOp });
  } catch (err) {
    console.error("Get latest operation error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

