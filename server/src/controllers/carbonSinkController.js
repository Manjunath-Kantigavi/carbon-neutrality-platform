import CarbonSinkRecord from "../models/CarbonSinkRecord.js";
import { calculateCarbonSinks } from "../services/sinks/sinkCalculator.js";

export const submitCarbonSinks = async (req, res) => {
  try {
    const userId = req.userId;
    const { operationId } = req.body;

    if (!operationId) {
      return res.status(400).json({ message: "operationId is required" });
    }

    const sinkData = {
      methaneCapture: req.body.methaneCapture || {},
      afforestation: req.body.afforestation || {},
      soilCarbon: req.body.soilCarbon || {},
      grassland: req.body.grassland || {}
    };

    // 1. Calculate sequestration
    const results = calculateCarbonSinks(sinkData);

    // 2. Save to DB
    const record = await CarbonSinkRecord.create({
      userId,
      operationId,
      ...sinkData,
      methaneCapture: {
        ...sinkData.methaneCapture,
        creditsPerMonth: results.methaneCreditsMonthly
      },
      afforestation: {
        ...sinkData.afforestation,
        sequestrationTonsPerYear: results.afforestationTonsPerYear
      },
      soilCarbon: {
        ...sinkData.soilCarbon,
        sequestrationTonsPerYear: results.soilTonsPerYear
      },
      grassland: {
        ...sinkData.grassland,
        sequestrationTonsPerYear: results.grassTonsPerYear
      },
      totalSequestrationTons: results.total
    });

    // 3. Return results to FE
    res.json({
      message: "Carbon sinks saved successfully",
      recordId: record._id,
      sinks: results
    });
  } catch (err) {
    console.log("Carbon sink error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

export const getLatestCarbonSink = async (req, res) => {
  try {
    const userId = req.userId;
    const latest = await CarbonSinkRecord.findOne({ userId }).sort({ createdAt: -1 });

    if (!latest) {
      return res.status(404).json({ message: "No carbon sink record found." });
    }

    res.json({ sink: latest });
  } catch (err) {
    console.error("Get latest carbon sink error:", err);
    res.status(500).json({ message: "Server error" });
  }
};
