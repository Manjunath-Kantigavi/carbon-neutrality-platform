import mongoose from "mongoose";

const miningOperationSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },

    
    // Step 1 — Excavation
    excavationData: {
      excavationMethod: { type: String, required: true },   // Surface, Underground, etc
      materialVolumeTons: { type: Number, required: true },
      equipmentType: { type: String, required: true },
      fuelType: { type: String, required: true }
    },

    // Step 2 — Transportation
    transportationData: {
      transportedVolumeTons: { type: Number, required: true },
      transportMode: { type: String, required: true },
      fuelType: { type: String, required: true },
      distancePerTripMeters: { type: Number, required: true },
      loadCapacityTons: { type: Number, required: true },
      tripsPerDay: { type: Number, required: true }
    },

    // Step 3 — Equipment
    equipmentData: {
      equipmentCategory: { type: String, required: true },
      fuelType: { type: String, required: true },
      operatingHoursPerDay: { type: Number, required: true },
      fuelConsumptionRate: { type: Number, required: true },
      efficiencyPercentage: { type: Number, required: true }
    }
  },
  { timestamps: true }
);

export default mongoose.model("MiningOperation", miningOperationSchema);
