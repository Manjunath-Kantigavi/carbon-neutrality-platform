import mongoose from "mongoose";
import EmissionRecord from "../models/EmissionRecord.js";
import CarbonSinkRecord from "../models/CarbonSinkRecord.js";
import MiningOperation from "../models/MiningOperation.js";

export const getVisualizationData = async (req, res) => {
    try {
        const userId = req.userId;

        // 1️⃣ Fetch mining operations (for coal production & fuel)
        const operations = await MiningOperation.find({ userId });

        // 2️⃣ Fetch emission records
        const emissions = await EmissionRecord.find({ userId });

        // 3️⃣ Fetch sink records
        const sinks = await CarbonSinkRecord.find({ userId });

        // ---------------------------
        // KPI 1: Coal Production (tons/day)
        // ---------------------------
        let coalProductionTonsDay = 0;
        if (operations.length > 0) {
            const lastOp = operations[operations.length - 1];
            coalProductionTonsDay =
                lastOp.transportationData?.transportedVolumeTons || 0;
        }

        // ---------------------------
        // KPI 2: Fuel Consumption (rate × hours)
        // ---------------------------
        let fuelUsagePerDay = 0;
        if (operations.length > 0) {
            const lastOp = operations[operations.length - 1];
            const eq = lastOp.equipmentData;
            fuelUsagePerDay =
                (eq?.fuelConsumptionRate || 0) * (eq?.operatingHoursPerDay || 0);
        }

        // ---------------------------
        // KPI 3: Emission Level (tons/day)
        // ---------------------------
        let totalDailyEmissionKg = emissions.reduce(
            (sum, e) => sum + (e.totalDailyKg || 0),
            0
        );
        const emissionLevelTonsDay = totalDailyEmissionKg / 1000;

        // ---------------------------
        // Pollutants Breakdown (CO₂, SO₂, PM)
        // ---------------------------
        const pollutants = {
            co2: Number((totalDailyEmissionKg * 0.8).toFixed(2)),   // 80%
            so2: Number((totalDailyEmissionKg * 0.15).toFixed(2)),  // 15%
            pm: Number((totalDailyEmissionKg * 0.05).toFixed(2))    // 5%
        };

        // ---------------------------
        // KPI 4: Carbon Offset (tons/day)
        // ---------------------------
        const totalSinkYearlyTons = sinks.reduce(
            (sum, s) => sum + (s.totalSequestrationTons || 0),
            0
        );

        const carbonOffsetPerDay = totalSinkYearlyTons / 365;

        // 🔹 FINAL KPI OBJECT
        const kpi = {
            coalProduction: Number(coalProductionTonsDay.toFixed(2)),
            fuelConsumption: Number(fuelUsagePerDay.toFixed(2)),
            carbonOffset: Number(carbonOffsetPerDay.toFixed(2)),
            emissionLevel: Number(emissionLevelTonsDay.toFixed(2)),
        };

        // ---------------------------
        // Monthly Emissions Aggregation (Jan–Dec)
        // ---------------------------
        const emissionAgg = await EmissionRecord.aggregate([
            { $match: { userId: new mongoose.Types.ObjectId(userId) } },
            {
                $group: {
                    _id: { month: { $month: "$createdAt" } },
                    totalMonthlyKg: { $sum: "$totalMonthlyKg" }
                }
            }
        ]);


        // ---------------------------
        // Monthly Sink Aggregation (Jan–Dec)
        // ---------------------------
        const sinkAgg = await CarbonSinkRecord.aggregate([
            { $match: { userId: new mongoose.Types.ObjectId(userId) } },
            {
                $group: {
                    _id: { month: { $month: "$createdAt" } },
                    totalYearlyTons: { $sum: "$totalSequestrationTons" }
                }
            }
        ]);


        // ---------------------------
        // Prepare 12-month arrays (always full)
        // ---------------------------
        const months = [
            "Jan", "Feb", "Mar", "Apr", "May", "Jun",
            "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
        ];

        let emissionsArr = Array(12).fill(0);
        let sinksArr = Array(12).fill(0);

        // Fill emissions dynamic
        emissionAgg.forEach((e) => {
            const monthIndex = e._id.month - 1;
            emissionsArr[monthIndex] = Number((e.totalMonthlyKg / 1000).toFixed(2)); // to tons
        });

        // Fill sinks dynamic
        sinkAgg.forEach((s) => {
            const monthIndex = s._id.month - 1;
            sinksArr[monthIndex] = Number((s.totalYearlyTons / 12).toFixed(2)); // tons/month
        });

        const monthlyEmissionSinkTrend = {
            months,
            emissions: emissionsArr,
            sinks: sinksArr
        };
        // ---------------------------
        // Coal Production & Fuel Consumption (Jan–Dec Trend)
        // ---------------------------

        // Aggregate mining operations monthly
        const opsAgg = await MiningOperation.aggregate([
            { $match: { userId: new mongoose.Types.ObjectId(userId) } },
            {
                $group: {
                    _id: { month: { $month: "$createdAt" } },
                    totalCoal: { $sum: "$transportationData.transportedVolumeTons" },
                    lastFuelRate: { $last: "$equipmentData.fuelConsumptionRate" },
                    lastHours: { $last: "$equipmentData.operatingHoursPerDay" }
                }
            }
        ]);

        // Prepare 12-month arrays
        let coalArr = Array(12).fill(0);
        let fuelArr = Array(12).fill(0);

        opsAgg.forEach(op => {
            const monthIndex = op._id.month - 1;

            coalArr[monthIndex] = Number((op.totalCoal || 0).toFixed(2));

            const rate = op.lastFuelRate || 0;
            const hours = op.lastHours || 0;
            fuelArr[monthIndex] = Number((rate * hours).toFixed(2));
        });

        const productionFuelTrend = {
            months,
            coalProduction: coalArr,
            fuelConsumption: fuelArr
        };

        // ---------------------------
        // FINAL RESPONSE
        // ---------------------------
        return res.json({
            kpi,
            pollutants,
            monthlyEmissionSinkTrend,
            productionFuelTrend
        });

    } catch (err) {
        console.log("Visualization error:", err);
        return res.status(500).json({ message: "Server error" });
    }
};
