import React from 'react';
import SelectGroup from './SelectGroup';

const EquipmentData = ({ equipmentData, setEquipmentData }) => {
  const update = (field, value) => setEquipmentData({ ...equipmentData, [field]: value });

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
      <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">Equipment Data</h3>

      <SelectGroup
        label="Equipment Type Used"
        options={['Continuous Mining Machines', 'Roof Bolters', 'Shuttle Cars', 'Longwall Systems', 'Ventilation Systems', 'Water Pumps', 'Conveyor Systems']}
        value={equipmentData.equipmentCategory}
        onChange={(val) => update('equipmentCategory', val)}
      />

      <SelectGroup
        label="Equipment Fuel Type"
        options={['Diesel', 'Electric', 'Hybrid', 'Pneumatic']}
        value={equipmentData.fuelType}
        onChange={(val) => update('fuelType', val)}
      />

      <div className="mb-4">
        <label className="block text-gray-700 dark:text-gray-300 mb-2">Operating Hours per Day</label>
        <input
          type="number"
          className="w-full p-2 border border-gray-300 rounded bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-1 focus:ring-[#FFA500] focus:border-[#FFA500] hover:border-[#FFA500]"
          value={equipmentData.operatingHoursPerDay}
          onChange={(e) => update('operatingHoursPerDay', e.target.value)}
          placeholder="Enter operating hours"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 dark:text-gray-300 mb-2">Average Fuel Consumption per Hour (liters/kWh)</label>
        <input
          type="number"
          className="w-full p-2 border border-gray-300 rounded bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-1 focus:ring-[#FFA500] focus:border-[#FFA500] hover:border-[#FFA500]"
          value={equipmentData.fuelConsumptionRate}
          onChange={(e) => update('fuelConsumptionRate', e.target.value)}
          placeholder="Enter fuel consumption rate"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 dark:text-gray-300 mb-2">Equipment Efficiency Rating (%)</label>
        <input
          type="number"
          className="w-full p-2 border border-gray-300 rounded bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-1 focus:ring-[#FFA500] focus:border-[#FFA500] hover:border-[#FFA500]"
          value={equipmentData.efficiencyPercentage}
          onChange={(e) => update('efficiencyPercentage', e.target.value)}
          placeholder="Enter equipment efficiency"
          min="0"
          max="100"
        />
      </div>
    </div>
  );
};

export default EquipmentData;