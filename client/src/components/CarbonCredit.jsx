import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { calculateCarbonCredit } from '../utils/carbonCreditCalculator';

const CarbonCredit = () => {
  const navigate = useNavigate();
  const [creditData, setCreditData] = useState({
    score: 900,
    trend: 'up',
    percentageChange: '5.0',
    emissions: 0,
    sequestration: 0,
    offsetRatio: '95.0',
    lastUpdate: '2 hrs ago'
  });

  useEffect(() => {
    // Example data - replace with actual data from your state management system
    const emissionsData = {
      excavationAmount: 1000,    // tons
      transportAmount: 500,      // km
      operatingHours: 200,       // hours
      fuelConsumption: 80        // efficiency percentage
    };

    const sinkData = {
      area: 100,                 // hectares
      plantingRate: 1000,        // trees per hectare
      vegetationArea: 50,        // hectares
      soilArea: 75,              // hectares
      methaneCapture: 50         // tons (now as a carbon sink)
    };

    // Calculate other metrics but keep score constant
    const result = calculateCarbonCredit(emissionsData, sinkData);
    setCreditData(prev => ({
      ...result,
      score: 900, // Keep score constant at 900
      lastUpdate: prev.lastUpdate
    }));
  }, []); // Add dependencies when you have actual data sources

  return (
    <div
      onClick={() => navigate('/dashboard/carbon-speedometer')}
      className="bg-gray-800 rounded-lg px-2 sm:px-4 py-1 sm:py-2 cursor-pointer hover:bg-gray-700 transition duration-200 border border-gray-700 shadow-md hover:shadow-lg"
    >
      <div className="flex items-center gap-3">
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-gray-300">Carbon Credits</span>
            <div className={`w-2 h-2 rounded-full ${creditData.trend === 'up' ? 'bg-green-500' : 'bg-red-500'}`}></div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold text-green-500">{creditData.score}</span>
            <span className="text-sm text-gray-400">({creditData.offsetRatio}% offset)</span>
            {creditData.trend === 'up' ? (
              <svg 
                className="w-5 h-5 text-green-500 transform transition-transform group-hover:translate-y-[-2px]"
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"/>
              </svg>
            ) : (
              <svg 
                className="w-5 h-5 text-red-500 transform transition-transform group-hover:translate-y-[2px]"
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 17h8m0 0v-8m0 8l-8-8-4 4-6-6"/>
              </svg>
            )}
          </div>
          <div className=" hidden sm:flex items-center gap-2">
            <span className="text-xs text-gray-500">Last updated {creditData.lastUpdate}</span>
            <span className="text-xs text-gray-400">•</span>
            <span className={`text-xs ${creditData.trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
              {creditData.percentageChange}%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarbonCredit;