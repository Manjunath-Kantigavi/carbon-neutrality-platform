// 🚀 This is a standalone test file to test suggestion logic without API

// Mock mining operation data (same format from your DB)
const miningOp = {
  excavationData: {
    excavationMethod: "Surface Mining",
    materialVolumeTons: 500,
    equipmentType: "Draglines",
    fuelType: "Diesel",
  },
  transportationData: {
    transportedVolumeTons: 300,
    loadCapacityTons: 15,
    tripsPerDay: 20,
    transportMode: "Haul trucks",
    fuelType: "Diesel",
  },
  equipmentData: {
    equipmentCategory: "Ventilation Systems",
    fuelType: "Electric",
    operatingHoursPerDay: 12,
    fuelConsumptionRate: 30,
    efficiencyPercentage: 70,
  }
};

// Mock sink offsets
const sinks = {
  methaneCapture: {
    captureRateM3: 5000
  }
};

// Mock emission record
const emissions = {
  totalDailyKg: 26495.2
};


// ------------------------------------
// 🚀 RULE BASED ENGINE
// ------------------------------------

function generateSuggestions(miningOp, sinks, emissions) {
  const suggestions = [];

  // Rule 1: Transport capacity gap
  const coalProd = miningOp.transportationData.transportedVolumeTons;
  const transportCap = 
      miningOp.transportationData.loadCapacityTons *
      miningOp.transportationData.tripsPerDay;

  if (coalProd > transportCap) {
    suggestions.push({
      title: "Conveyor System Enhancement Required",
      priority: "High",
      category: "Carbon Emissions",
      details: "Coal production exceeds transport capacity",
      capacityGap: coalProd - transportCap,
      efficiencyGain: 36
    });
  }

  // Rule 2: Fuel efficiency
  const eq = miningOp.equipmentData;
  if (eq.efficiencyPercentage < 75) {
    suggestions.push({
      title: "Fuel Management System Optimization",
      priority: "Medium",
      category: "Energy Efficiency",
      potentialSavingsLiters: Math.round(eq.fuelConsumptionRate * (1 - eq.efficiencyPercentage / 100) * 30),
    });
  }

  // Rule 3: Methane capture improvement
  if (sinks.methaneCapture.captureRateM3 < 6000) {
    const additional = 6000 - sinks.methaneCapture.captureRateM3;
    suggestions.push({
      title: "Methane Capture Enhancement",
      priority: "Short-term",
      category: "Carbon Emissions",
      additionalCapture: additional,
      carbonCredits: Math.round(additional * 0.05)
    });
  }

  // Rule 4: Renewables integration
  if (eq.fuelType === "Diesel" || eq.operatingHoursPerDay > 8) {
    suggestions.push({
      title: "Renewable Energy Integration",
      priority: "Long-term",
      category: "Energy Efficiency",
      emissionReduction: Math.round(emissions.totalDailyKg * 0.10 / 1000) // 10% reduction
    });
  }

  return suggestions;
}


// ------------------------------------
// 🚀 RUN TEST
// ------------------------------------

console.log("\n=== AI SUGGESTIONS TEST OUTPUT ===\n");
console.log(generateSuggestions(miningOp, sinks, emissions));
console.log("\n===================================\n");
