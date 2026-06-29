import React from 'react';
import SelectGroup from './SelectGroup';

const TransportationData = ({ transportationData, setTransportationData }) => {
  const update = (field, value) => setTransportationData({ ...transportationData, [field]: value });

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
      <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">Transportation Data</h3>

      <div className="mb-4">
        <label className="block text-gray-700 dark:text-gray-300 mb-2">Amount of Coal Transported (tons)</label>
        <input
          type="number"
          className="w-full p-2 border border-gray-300 rounded bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-1 focus:ring-[#FFA500] focus:border-[#FFA500] hover:border-[#FFA500]"
          value={transportationData.transportedVolumeTons}
          onChange={(e) => update('transportedVolumeTons', e.target.value)}
          placeholder="Enter amount of coal transported"
        />
      </div>

      <SelectGroup
        label="Mode of Transport"
        options={['Haul Trucks', 'Conveyor Systems', 'Mine Cars', 'Shuttle Cars', 'Rail Transport']}
        value={transportationData.transportMode}
        onChange={(val) => update('transportMode', val)}
      />

      <SelectGroup
        label="Transport Fuel Type"
        options={['Diesel', 'Electric', 'Hybrid']}
        value={transportationData.fuelType}
        onChange={(val) => update('fuelType', val)}
      />

      <div className="mb-4">
        <label className="block text-gray-700 dark:text-gray-300 mb-2">Distance Covered per Trip (meters)</label>
        <input
          type="number"
          className="w-full p-2 border border-gray-300 rounded bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-1 focus:ring-[#FFA500] focus:border-[#FFA500] hover:border-[#FFA500]"
          value={transportationData.distancePerTripMeters}
          onChange={(e) => update('distancePerTripMeters', e.target.value)}
          placeholder="Enter distance per trip"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 dark:text-gray-300 mb-2">Vehicle/System Capacity (tons)</label>
        <input
          type="number"
          className="w-full p-2 border border-gray-300 rounded bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-1 focus:ring-[#FFA500] focus:border-[#FFA500] hover:border-[#FFA500]"
          value={transportationData.loadCapacityTons}
          onChange={(e) => update('loadCapacityTons', e.target.value)}
          placeholder="Enter transport capacity"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 dark:text-gray-300 mb-2">Number of Trips per Day</label>
        <input
          type="number"
          className="w-full p-2 border border-gray-300 rounded bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-1 focus:ring-[#FFA500] focus:border-[#FFA500] hover:border-[#FFA500]"
          value={transportationData.tripsPerDay}
          onChange={(e) => update('tripsPerDay', e.target.value)}
          placeholder="Enter number of trips per day"
        />
      </div>
    </div>
  );
};

export default TransportationData;