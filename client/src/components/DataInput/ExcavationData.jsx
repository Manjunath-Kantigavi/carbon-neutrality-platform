import React from 'react';
import SelectGroup from './SelectGroup';

const ExcavationData = ({ excavationData, setExcavationData }) => {
  const update = (field, value) => setExcavationData({ ...excavationData, [field]: value });

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
      <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">Excavation Data</h3>

      <SelectGroup
        label="Type of Excavation Method"
        options={['Surface Mining', 'Underground Mining', 'Longwall Mining', 'Room and Pillar Mining']}
        value={excavationData.excavationMethod}
        onChange={(val) => update('excavationMethod', val)}
      />

      <div className="mb-4">
        <label className="block text-gray-700 dark:text-gray-300 mb-2">Amount of Coal Excavated (tons)</label>
        <input
          type="number"
          className="w-full p-2 border border-gray-300 rounded bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-1 focus:ring-[#FFA500] focus:border-[#FFA500] hover:border-[#FFA500]"
          value={excavationData.materialVolumeTons}
          onChange={(e) => update('materialVolumeTons', e.target.value)}
          placeholder="Enter amount of coal excavated"
        />
      </div>

      <SelectGroup
        label="Excavation Equipment Used"
        options={['Continuous Miners', 'Draglines', 'Power Shovels', 'Hydraulic Excavators', 'Longwall Shearers']}
        value={excavationData.equipmentType}
        onChange={(val) => update('equipmentType', val)}
      />

      <SelectGroup
        label="Excavation Fuel Type"
        options={['Diesel', 'Electric', 'Hybrid']}
        value={excavationData.fuelType}
        onChange={(val) => update('fuelType', val)}
      />
    </div>
  );
};

export default ExcavationData;