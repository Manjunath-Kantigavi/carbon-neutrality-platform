// Constants for carbon credit calculation
const MAX_CREDIT = 1000;
const MIN_CREDIT = 0;
const BASELINE_CREDIT = 500;

// Emission factors (CO2e - Carbon dioxide equivalent)
const EMISSION_FACTORS = {
  excavation: 0.5,    // CO2e per ton of material
  transport: 2.0,     // CO2e per km
  equipment: 2.5      // CO2e per hour of operation
};

// Carbon sink factors (CO2e absorption rates)
const SINK_FACTORS = {
  tree: 0.025,        // CO2e absorbed per tree per year
  vegetation: 4.0,    // CO2e absorbed per hectare per year
  soil: 1.5,         // CO2e absorbed per hectare per year
  methane: 25        // Global warming potential of methane (now as a positive factor)
};

/**
 * Calculate total emissions from mining operations
 */
const calculateEmissions = (data) => {
  const {
    excavationAmount = 0,
    transportAmount = 0,
    operatingHours = 0,
    fuelConsumption = 0
  } = data;

  const excavationEmissions = excavationAmount * EMISSION_FACTORS.excavation;
  const transportEmissions = transportAmount * EMISSION_FACTORS.transport;
  const equipmentEmissions = operatingHours * EMISSION_FACTORS.equipment * (fuelConsumption / 100);

  return excavationEmissions + transportEmissions + equipmentEmissions;
};

/**
 * Calculate total carbon sequestration from sinks
 */
const calculateSequestration = (sinkData) => {
  const {
    area = 0,
    plantingRate = 0,
    vegetationArea = 0,
    soilArea = 0,
    methaneCapture = 0  // Added methane capture as a carbon sink
  } = sinkData;

  const treeSequestration = area * plantingRate * SINK_FACTORS.tree;
  const vegetationSequestration = vegetationArea * SINK_FACTORS.vegetation;
  const soilSequestration = soilArea * SINK_FACTORS.soil;
  const methaneSequestration = methaneCapture * SINK_FACTORS.methane; // Methane capture now contributes positively

  return treeSequestration + vegetationSequestration + soilSequestration + methaneSequestration;
};

/**
 * Calculate final carbon credit score based on the gap between emissions and sequestration
 */
const calculateCarbonCredit = (emissionsData, sinkData) => {
  const totalEmissions = calculateEmissions(emissionsData);
  const totalSequestration = calculateSequestration(sinkData);
  
  // Calculate the offset ratio (how much of emissions are offset by sinks)
  const offsetRatio = totalSequestration / totalEmissions;
  
  let creditScore;
  
  if (offsetRatio >= 1) {
    // If sequestration equals or exceeds emissions, score is above baseline
    const excessOffset = offsetRatio - 1; // How much extra sequestration we have
    const maxExcessForBonus = 0.5; // Maximum 50% extra sequestration for bonus
    const bonusPoints = (MAX_CREDIT - BASELINE_CREDIT) * Math.min(excessOffset / maxExcessForBonus, 1);
    creditScore = BASELINE_CREDIT + bonusPoints;
  } else {
    // If emissions exceed sequestration, score is below baseline
    creditScore = BASELINE_CREDIT * offsetRatio;
  }

  // Calculate percentage difference for trend
  const percentageDiff = ((totalSequestration - totalEmissions) / totalEmissions) * 100;
  
  return {
    score: Math.round(Math.max(MIN_CREDIT, Math.min(MAX_CREDIT, creditScore))),
    trend: percentageDiff >= 0 ? 'up' : 'down',
    percentageChange: percentageDiff.toFixed(1),
    emissions: Math.round(totalEmissions),
    sequestration: Math.round(totalSequestration),
    offsetRatio: (offsetRatio * 100).toFixed(1)
  };
};

export { calculateCarbonCredit, calculateEmissions, calculateSequestration };
