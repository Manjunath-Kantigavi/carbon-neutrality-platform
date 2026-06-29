import mongoose from "mongoose";

const emissionRecordSchema = new mongoose.Schema(
  {
    operationId: { type: mongoose.Schema.Types.ObjectId, ref: "MiningOperation", required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },

    // Daily emissions (kg CO2e/day)
    excavationDailyKg: { type: Number, default: 0 },
    transportDailyKg: { type: Number, default: 0 },
    equipmentDailyKg: { type: Number, default: 0 },

    // Monthly emissions (kg CO2e/month)
    excavationMonthlyKg: { type: Number, default: 0 },
    transportMonthlyKg: { type: Number, default: 0 },
    equipmentMonthlyKg: { type: Number, default: 0 },

    // Totals
    totalDailyKg: { type: Number, default: 0 },
    totalMonthlyKg: { type: Number, default: 0 },

    contribution: {
      excavationPercent: { type: Number, default: 0 },
      transportPercent: { type: Number, default: 0 },
      equipmentPercent: { type: Number, default: 0 }
    }
  },
  { timestamps: true }
);

export default mongoose.model("EmissionRecord", emissionRecordSchema);
