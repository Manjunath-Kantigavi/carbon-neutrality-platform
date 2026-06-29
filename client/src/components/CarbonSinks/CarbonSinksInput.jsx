import React from 'react';
import { motion } from 'framer-motion';

const CarbonSinksInput = ({ type, data, onUpdate }) => {
  const handleInputChange = (field, value) => {
    onUpdate({ ...data, [field]: value });
  };

  const inputClasses = "w-full p-2 border border-gray-300 rounded bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent";
  const cardClasses = "bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg w-full overflow-hidden";

  const renderAfforestationInputs = () => (
    <div className={cardClasses}>
      <div className="space-y-6">
        <div>
          <label className="block text-gray-700 dark:text-gray-300 mb-2">Area (hectares)</label>
          <input
            type="number"
            min="0"
            step="any"
            value={data.areaHectares || ''}
            onChange={(e) => handleInputChange('areaHectares', e.target.value === '' ? 0 : parseFloat(e.target.value))}
            className={inputClasses}
            placeholder="Enter area in hectares"
          />
        </div>

        <div>
          <label className="block text-gray-700 dark:text-gray-300 mb-2">Planting Rate (trees/hectare)</label>
          <input
            type="number"
            min="0"
            step="any"
            value={data.plantingRate || ''}
            onChange={(e) => handleInputChange('plantingRate', e.target.value === '' ? 0 : parseFloat(e.target.value))}
            className={inputClasses}
            placeholder="Enter planting rate"
          />
        </div>

        <div>
          <label className="block text-gray-700 dark:text-gray-300 mb-2">Tree Type</label>
          <select
            value={data.treeType}
            onChange={(e) => handleInputChange('treeType', e.target.value)}
            className={inputClasses}
          >
            <option value="broadleaf">Broadleaf</option>
            <option value="evergreen">Evergreen</option>
            <option value="mixed">Mixed</option>
          </select>
        </div>

        <div className="p-4 bg-green-50 rounded-lg">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-600">Estimated Carbon Sequestration</span>
            <span className="text-lg font-semibold text-green-600">{(data.sequestrationTonsPerYear || 0).toFixed(2)} tCO2/year</span>
          </div>
        </div>
      </div>
    </div>
  );

  const renderSoilCarbonInputs = () => (
    <div className={cardClasses}>
      <div className="space-y-6">
        <div>
          <label className="block text-gray-700 dark:text-gray-300 mb-2">Area (hectares)</label>
          <input
            type="number"
            min="0"
            step="any"
            value={data.areaHectares || ''}
            onChange={(e) => handleInputChange('areaHectares', e.target.value === '' ? 0 : parseFloat(e.target.value))}
            className={inputClasses}
            placeholder="Enter area in hectares"
          />
        </div>

        <div>
          <label className="block text-gray-700 dark:text-gray-300 mb-2">Management Practice</label>
          <select
            value={data.practice}
            onChange={(e) => handleInputChange('practice', e.target.value)}
            className={inputClasses}
          >
            <option value="organic">Organic Addition</option>
            <option value="conservation">Conservation Tillage</option>
          </select>
        </div>

        <div className="p-4 bg-orange-50 rounded-lg">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-600">Estimated Carbon Sequestration</span>
            <span className="text-lg font-semibold text-orange-600">{(data.sequestrationTonsPerYear || 0).toFixed(2)} tCO2/year</span>
          </div>
        </div>
      </div>
    </div>
  );

  const renderGrasslandInputs = () => (
    <div className={cardClasses}>
      <div className="space-y-6">
        <div>
          <label className="block text-gray-700 dark:text-gray-300 mb-2">Area (hectares)</label>
          <input
            type="number"
            min="0"
            step="any"
            value={data.areaHectares || ''}
            onChange={(e) => handleInputChange('areaHectares', e.target.value === '' ? 0 : parseFloat(e.target.value))}
            className={inputClasses}
            placeholder="Enter area in hectares"
          />
        </div>

        <div>
          <label className="block text-gray-700 dark:text-gray-300 mb-2">Grass Type</label>
          <select
            value={data.grassType}
            onChange={(e) => handleInputChange('grassType', e.target.value)}
            className={inputClasses}
          >
            <option value="native">Native</option>
            <option value="perennial">Perennial</option>
            <option value="mixed">Mixed</option>
          </select>
        </div>

        <div className="p-4 bg-yellow-50 rounded-lg">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-600">Estimated Carbon Sequestration</span>
            <span className="text-lg font-semibold text-yellow-600">{(data.sequestrationTonsPerYear || 0).toFixed(2)} tCO2/year</span>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      {type === 'afforestation' && renderAfforestationInputs()}
      {type === 'soilCarbon' && renderSoilCarbonInputs()}
      {type === 'grassland' && renderGrasslandInputs()}
    </motion.div>
  );
};

export default CarbonSinksInput;