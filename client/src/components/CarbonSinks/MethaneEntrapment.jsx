import React from 'react';

const MethaneEntrapment = ({ methaneCapture, setMethaneCapture }) => {
  const update = (field, value) => setMethaneCapture({ ...methaneCapture, [field]: value });

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md w-full overflow-hidden">
      <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Methane Capture Data</h3>

      <div className="mb-4">
        <label className="block text-gray-700 dark:text-gray-300 mb-2" htmlFor="methaneCapture">
          Methane Capture Rate (m³)
        </label>
        <input
          type="number"
          id="methaneCapture"
          className="w-full p-2 border border-gray-300 rounded bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-1 focus:ring-[#FFA500] focus:border-[#FFA500] hover:border-[#FFA500]"
          value={methaneCapture.captureRateM3 || ''}
          onChange={(e) => update('captureRateM3', e.target.value === '' ? 0 : parseFloat(e.target.value))}
          placeholder="Enter methane capture rate"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 dark:text-gray-300 mb-2">Capture Method</label>
        <select
          className="w-full p-2 border border-gray-300 rounded bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-1 focus:ring-[#FFA500] focus:border-[#FFA500] hover:border-[#FFA500]"
          value={methaneCapture.captureMethod || ''}
          onChange={(e) => update('captureMethod', e.target.value)}
        >
          <option value="">Select capture method</option>
          <option value="pre-mining">Pre-mining Drainage</option>
          <option value="post-mining">Post-mining Drainage</option>
          <option value="vam">Ventilation Air Methane (VAM)</option>
          <option value="gob">Gob Vent Boreholes</option>
          <option value="surface">Surface to In-Seam</option>
        </select>
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 dark:text-gray-300 mb-2" htmlFor="purity">
          Methane Purity (%)
        </label>
        <input
          type="number"
          id="purity"
          className="w-full p-2 border border-gray-300 rounded bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-1 focus:ring-[#FFA500] focus:border-[#FFA500] hover:border-[#FFA500]"
          value={methaneCapture.purityPercent || ''}
          onChange={(e) => update('purityPercent', e.target.value === '' ? 0 : parseFloat(e.target.value))}
          placeholder="Enter methane purity percentage"
          min="0"
          max="100"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 dark:text-gray-300 mb-2" htmlFor="pressure">
          System Pressure (kPa)
        </label>
        <input
          type="number"
          id="pressure"
          className="w-full p-2 border border-gray-300 rounded bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-1 focus:ring-[#FFA500] focus:border-[#FFA500] hover:border-[#FFA500]"
          value={methaneCapture.pressureKPa || ''}
          onChange={(e) => update('pressureKPa', e.target.value === '' ? 0 : parseFloat(e.target.value))}
          placeholder="Enter system pressure"
        />
      </div>

      <div className="mt-6">
        <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Carbon Credit Potential</h4>
        <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Estimated credits based on current capture rate:
            <span className="font-semibold ml-1">
              {Math.round((methaneCapture.captureRateM3 || 0) * 0.8)} credits/month
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default MethaneEntrapment;