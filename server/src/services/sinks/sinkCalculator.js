export function calculateCarbonSinks(data) {
  const methane = data.methaneCapture || {};
  const aff = data.afforestation || {};
  const soil = data.soilCarbon || {};
  const grass = data.grassland || {};

  // 1️⃣ Methane Capture → Carbon credit formula
  // 1 m³ methane = 0.67 kg CO₂e avoided
  const methaneCO2e =
    (methane.captureRateM3 || 0) * 0.67 * ((methane.purityPercent || 0) / 100);

  const methaneCreditsMonthly = methaneCO2e / 1000; // kg → tons

  // 2️⃣ Afforestation — tCO2/ha/year by tree type (no plantingRate multiplier)
  const affSeqRate =
    aff.treeType === "broadleaf" ? 8 :
    aff.treeType === "evergreen" ? 6 : 7; // mixed
  const afforestationTonsPerYear = (aff.areaHectares || 0) * affSeqRate;

  // 3️⃣ Soil carbon sequestration — tCO2/ha/year by practice
  const soilSeqRate = soil.practice === "organic" ? 2.5 : 1.5; // conservation
  const soilTonsPerYear = (soil.areaHectares || 0) * soilSeqRate;

  // 4️⃣ Grassland sequestration — tCO2/ha/year by grass type
  const grassSeqRate =
    grass.grassType === "native" ? 2.5 :
    grass.grassType === "perennial" ? 2.0 : 1.5; // mixed
  const grassTonsPerYear = (grass.areaHectares || 0) * grassSeqRate;

  const total =
    methaneCreditsMonthly +
    afforestationTonsPerYear +
    soilTonsPerYear +
    grassTonsPerYear;

  return {
    methaneCreditsMonthly: Number(methaneCreditsMonthly.toFixed(2)),
    afforestationTonsPerYear: Number(afforestationTonsPerYear.toFixed(2)),
    soilTonsPerYear: Number(soilTonsPerYear.toFixed(2)),
    grassTonsPerYear: Number(grassTonsPerYear.toFixed(2)),
    total: Number(total.toFixed(2))
  };
}