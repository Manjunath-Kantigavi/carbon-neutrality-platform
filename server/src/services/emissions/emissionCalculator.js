import factors from "../../config/emissionFactors.js";

export function calculateEmissions(operation) {
  const excavation = operation.excavationData || {};
  const transport = operation.transportationData || {};
  const equipment = operation.equipmentData || {};

  // 1️⃣ Excavation emissions
  const excavationDailyKg =
    (excavation.materialVolumeTons || 0) * factors.excavationKgCO2PerTon;

  const excavationMonthlyKg = excavationDailyKg * factors.daysInMonth;

  // 2️⃣ Transportation emissions
  const transportedTons = transport.transportedVolumeTons || 0;
  const trips = transport.tripsPerDay || 0;
  const distanceKm = (transport.distancePerTripMeters || 0) / 1000;

  const tonKm = transportedTons * distanceKm * trips;

  const transportDailyKg = tonKm * factors.transportKgCO2PerTonKm;
  const transportMonthlyKg = transportDailyKg * factors.daysInMonth;

  // 3️⃣ Equipment emissions
  const hours = equipment.operatingHoursPerDay || 0;
  const rate = equipment.fuelConsumptionRate || 0;
  const type = (equipment.fuelType || "").toLowerCase();

  let equipmentDailyKg = 0;

  if (type === "diesel") {
    equipmentDailyKg = hours * rate * factors.dieselKgCO2PerL;
  } else if (type === "electric") {
    equipmentDailyKg = hours * rate * factors.electricityKgCO2PerKWh;
  } else if (type === "hybrid") {
    const dieselPart = 0.7 * hours * rate * factors.dieselKgCO2PerL;
    const electricPart = 0.3 * hours * rate * factors.electricityKgCO2PerKWh;
    equipmentDailyKg = dieselPart + electricPart;
  }

  const equipmentMonthlyKg = equipmentDailyKg * factors.daysInMonth;

  // 4️⃣ Totals
  const totalDailyKg =
    excavationDailyKg + transportDailyKg + equipmentDailyKg;

  const totalMonthlyKg = totalDailyKg * factors.daysInMonth;

  // 5️⃣ Contribution %
  const excavationPercent =
    totalDailyKg ? (excavationDailyKg / totalDailyKg) * 100 : 0;

  const transportPercent =
    totalDailyKg ? (transportDailyKg / totalDailyKg) * 100 : 0;

  const equipmentPercent =
    totalDailyKg ? (equipmentDailyKg / totalDailyKg) * 100 : 0;

  return {
    excavationDailyKg,
    transportDailyKg,
    equipmentDailyKg,
    excavationMonthlyKg,
    transportMonthlyKg,
    equipmentMonthlyKg,
    totalDailyKg,
    totalMonthlyKg,
    contribution: {
      excavationPercent: Number(excavationPercent.toFixed(2)),
      transportPercent: Number(transportPercent.toFixed(2)),
      equipmentPercent: Number(equipmentPercent.toFixed(2))
    }
  };
}
