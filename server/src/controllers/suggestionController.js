import Groq from "groq-sdk";
import MiningOperation from "../models/MiningOperation.js";
import EmissionRecord from "../models/EmissionRecord.js";
import CarbonSinkRecord from "../models/CarbonSinkRecord.js";

let client;

function getGroqClient() {
    if (!client) {
        if(!process.env.GROQ_API_KEY) {
            throw new Error("GROQ_API_KEY not set in environment variables");
        }
        client =  new Groq({ apiKey : process.env.GROQ_API_KEY });
    }
    return client;
}

export const generateSuggestions = async (req, res) => {
    try {
        const client = getGroqClient();
        const userId = req.userId;

        // 1. Get latest mining operation
        const latestOp = await MiningOperation.findOne({ userId }).sort({ createdAt: -1 });

        if (!latestOp) {
            return res.status(400).json({
                message: "No mining operation found. Please submit one first."
            });
        }

        //  Fetch emission & sink scoped to THIS operation specifically
        const emission = await EmissionRecord.findOne({ userId, operationId: latestOp._id });
        const sink = await CarbonSinkRecord.findOne({ userId, operationId: latestOp._id });

        if (!emission) {
            return res.status(400).json({
                message: "No emission data found for this operation."
            });
        }

        if (!sink) {
            return res.status(400).json({
                message: "No carbon sink data found. Please submit carbon sinks first."
            });
        }

        // Prepare input for AI
        const totalEmissionsTonsPerYear = ((emission.totalDailyKg || 0) / 1000) * 365;
        const totalOffsetTonsPerYear = sink.totalSequestrationTons || 0;
        const netEmissions = totalEmissionsTonsPerYear - totalOffsetTonsPerYear;

        const inputData = {
            coalProduction: latestOp.transportationData?.transportedVolumeTons || 0,
            transportCapacity: (latestOp.transportationData?.loadCapacityTons || 0) *
                (latestOp.transportationData?.tripsPerDay || 0),
            efficiency: latestOp.equipmentData?.efficiencyPercentage || 0,
            methaneRate: sink?.methaneCapture?.captureRateM3 || 0,
            emissionsTonsPerYear: Number(totalEmissionsTonsPerYear.toFixed(2)),
            carbonOffsetTonsPerYear: Number(totalOffsetTonsPerYear.toFixed(2)),
            netEmissionsTonsPerYear: Number(netEmissions.toFixed(2)),
            excavationContribution: emission.contribution?.excavationPercent || 0,
            transportContribution: emission.contribution?.transportPercent || 0,
            equipmentContribution: emission.contribution?.equipmentPercent || 0
        };

        const prompt = `
You are an expert mining sustainability and carbon reduction specialist AI.
Your goal is to help an underground coal mine REDUCE CARBON EMISSIONS, not increase coal production.
Analyze the mining operation details below and generate 4 actionable recommendations focused ONLY on:
- emission reduction
- methane capture improvement
- fuel optimization
- renewable energy integration
- transport efficiency to cut emissions
- carbon sinks expansion
- energy efficiency improvements

DO NOT suggest increasing coal production or increasing throughput capacity.

Mining Data:
- Coal Production: ${inputData.coalProduction} tons/day
- Transport Capacity: ${inputData.transportCapacity} tons/day
- Equipment Efficiency: ${inputData.efficiency}%
- Methane Capture Rate: ${inputData.methaneRate} m3/day
- Total Emissions: ${inputData.emissionsTonsPerYear} tCO2/year
- Carbon Offset: ${inputData.carbonOffsetTonsPerYear} tCO2/year
- Net Emissions (after offset): ${inputData.netEmissionsTonsPerYear} tCO2/year
- Emission Breakdown: Excavation ${inputData.excavationContribution}%, Transport ${inputData.transportContribution}%, Equipment ${inputData.equipmentContribution}%

Focus your recommendations on the highest-contributing emission sources first.

Return ONLY VALID JSON in the following format:

[
  {
    "title": "",
    "category": "",
    "priority": "",
    "timeframe": "",
    "explanation": "",
    "emissionReductionPotential": "",
    "actionSteps": []
  }
]

Rules:
- No markdown
- No backticks
- No comments
- No extra text outside JSON
- Only sustainability & emission-reduction recommendations
- No suggestions about increasing coal production or economic throughput
- actionSteps must be an array of strings
- Ensure JSON is valid and complete
`;

        const response = await client.chat.completions.create({
            model: "llama-3.1-8b-instant",
            messages: [{ role: "user", content: prompt }],
            temperature: 0.4
        });

        const rawOutput = response.choices[0].message.content;

        // Strip markdown fences if model ignores instructions
        const cleaned = rawOutput.replace(/```json|```/g, "").trim();

        let suggestions = [];
        try {
            suggestions = JSON.parse(cleaned);
        } catch (e) {
            console.error("JSON parse error:", e, "Raw output:", rawOutput);
            return res.status(500).json({ message: "AI returned malformed response. Please retry." });
        }

        return res.json({
            message: "AI recommendations generated successfully",
            suggestions,
            summary: inputData //  also return the numbers
        });

    } catch (err) {
        console.error("AI Suggestion Error:", err);
        return res.status(500).json({ message: "Failed to generate suggestions" });
    }
};