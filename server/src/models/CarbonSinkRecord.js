import mongoose from "mongoose";

const carbonSinkSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    operationId: { type: mongoose.Schema.Types.ObjectId, ref: "MiningOperation", required: false },

    // Methane Capture
    methaneCapture: {
      captureRateM3: { type: Number, default: 0 },
      captureMethod: { type: String, default: "" },
      purityPercent: { type: Number, default: 0 },
      pressureKPa: { type: Number, default: 0 },
      creditsPerMonth: { type: Number, default: 0 }
    },

    // Afforestation
    afforestation: {
      areaHectares: { type: Number, default: 0 },
      plantingRate: { type: Number, default: 0 },
      treeType: { type: String, default: "" },
      sequestrationTonsPerYear: { type: Number, default: 0 }
    },

    // Soil Carbon
    soilCarbon: {
      areaHectares: { type: Number, default: 0 },
      practice: { type: String, default: "" },
      sequestrationTonsPerYear: { type: Number, default: 0 }
    },

    // Grassland
    grassland: {
      areaHectares: { type: Number, default: 0 },
      grassType: { type: String, default: "" },
      sequestrationTonsPerYear: { type: Number, default: 0 }
    },

    // Overall sequestration (tCO2/year)
    totalSequestrationTons: { type: Number, default: 0 }
  },
  { timestamps: true }
);

export default mongoose.model("CarbonSinkRecord", carbonSinkSchema);
