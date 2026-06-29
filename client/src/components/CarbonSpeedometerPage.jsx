import React, { useState, useEffect } from 'react';
import ReactSpeedometer from 'react-d3-speedometer';
import { motion } from 'framer-motion';
import { FiTrendingUp, FiAward, FiInfo } from 'react-icons/fi';
import { calculateCarbonCredit } from '../utils/carbonCreditCalculator';

const CarbonSpeedometerPage = () => {
  const [creditData, setCreditData] = useState({
    score: 900,
    trend: 'up',
    percentageChange: '5.0',
    emissions: 0,
    sequestration: 0,
    offsetRatio: '95.0',
    lastUpdate: '2 hrs ago',
    monthlyChange: '+5.7%',
    yearlyAverage: 750
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
      methaneCapture: 50         // tons
    };

    // Calculate other metrics but keep score constant
    const result = calculateCarbonCredit(emissionsData, sinkData);
    setCreditData({
      ...result,
      score: 900 // Keep score constant at 900
    });
  }, []); // Add dependencies when you have actual data sources

  const [showTooltip, setShowTooltip] = useState(null);

  const tooltips = {
    monthlyChange: "Change in carbon credits from coal mine operations over the last month",
    yearlyAverage: "Average carbon credits from coal mine efficiency over the past year",
    totalSaved: "Total carbon emissions reduced from coal mining operations in tons",
    nextMilestone: "Next achievement milestone for coal mine carbon reduction"
  };

  return (
    <div className="min-h-screen bg-white p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">
                Coal Mine Carbon Credits: <span className="text-green-600">{creditData.score}</span>
                <span className="text-lg ml-2 text-gray-500">({creditData.offsetRatio}% offset)</span>
              </h1>
              <div className="flex items-center gap-4">
                <p className="text-gray-400">Last updated {creditData.lastUpdate}</p>
                <span className={`text-sm ${creditData.trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
                  {creditData.percentageChange}% change
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Speedometer Section */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-2 bg-gray-800 rounded-2xl p-8 shadow-xl border border-gray-700 hover:shadow-2xl transition-shadow duration-300"
          >
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="flex justify-center mb-8"
            >
              <ReactSpeedometer
                value={creditData.score}
                minValue={0}
                maxValue={1000}
                needleColor="#2563eb"
                needleTransitionDuration={4000}
                needleTransition="easeElastic"
                currentValueText="${value} Credits"
                customSegmentLabels={[
                  { text: "Critical", position: "INSIDE", color: "#fff" },
                  { text: "Low", position: "INSIDE", color: "#fff" },
                  { text: "Average", position: "INSIDE", color: "#fff" },
                  { text: "Good", position: "INSIDE", color: "#fff" },
                  { text: "Excellent", position: "INSIDE", color: "#fff" }
                ]}
                ringWidth={40}
                width={500}
                height={300}
                segments={5}
                segmentColors={["#ef4444", "#f97316", "#eab308", "#22c55e", "#15803d"]}
                textColor="#fff"
                valueTextFontSize="32px"
                maxSegmentLabels={5}
                customSegmentStops={[0, 200, 400, 600, 800, 1000]}
              />
            </motion.div>
            
            {/* Performance Metrics */}
            <div className="grid grid-cols-2 gap-4 mt-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.7 }}
                className="bg-gray-900 rounded-xl p-4 hover:bg-gray-800 transition-colors duration-300 relative"
                onMouseEnter={() => setShowTooltip('emissions')}
                onMouseLeave={() => setShowTooltip(null)}
              >
                <h3 className="text-gray-400 text-sm mb-2">Total Emissions</h3>
                <p className="text-2xl font-bold text-red-500">{creditData.emissions} CO2e</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.8 }}
                className="bg-gray-900 rounded-xl p-4 hover:bg-gray-800 transition-colors duration-300 relative"
                onMouseEnter={() => setShowTooltip('sequestration')}
                onMouseLeave={() => setShowTooltip(null)}
              >
                <h3 className="text-gray-400 text-sm mb-2">Carbon Sequestration</h3>
                <p className="text-2xl font-bold text-green-500">{creditData.sequestration} CO2e</p>
              </motion.div>
            </div>
          </motion.div>

          {/* Side Panel */}
          <div className="lg:col-span-1 space-y-8">
            {/* Status Card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="bg-gray-800 rounded-2xl p-6 border border-gray-700 hover:shadow-xl transition-shadow duration-300"
            >
              <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                <FiAward className="text-yellow-500" />
                Mine Performance Status
              </h2>
              <div className="space-y-6">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-gray-400">Current Level</p>
                    <p className={`text-2xl font-bold ${
                      creditData.score >= 800 ? 'text-green-500' : 
                      creditData.score >= 600 ? 'text-yellow-500' : 
                      'text-red-500'
                    }`}>
                      {creditData.score >= 800 ? 'Excellent' : 
                       creditData.score >= 600 ? 'Good' : 
                       'Needs Improvement'}
                    </p>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div 
                      className="bg-green-500 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${(creditData.score / 1000) * 100}%` }}
                    />
                  </div>
                </div>
                <div>
                  <p className="text-gray-400 mb-1">Next Milestone</p>
                  <div className="flex items-center justify-between">
                    <p className="text-xl text-blue-500">{Math.ceil(creditData.score / 100) * 100} Credits</p>
                    <p className="text-gray-400">
                      {Math.ceil(creditData.score / 100) * 100 - creditData.score} credits to go
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Tips Card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="bg-gray-800 rounded-2xl p-6 border border-gray-700 hover:shadow-xl transition-shadow duration-300"
            >
              <h2 className="text-xl font-semibold text-white mb-4">Mining Optimization Tips</h2>
              <ul className="space-y-4">
                {[
                  {
                    title: "Methane Capture",
                    description: "Implement methane capture systems",
                    color: "green"
                  },
                  {
                    title: "Equipment Efficiency",
                    description: "Use energy-efficient mining equipment",
                    color: "blue"
                  },
                  {
                    title: "Ventilation Control",
                    description: "Optimize mine ventilation systems",
                    color: "purple"
                  }
                ].map((tip, index) => (
                  <motion.li
                    key={tip.title}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                    className="bg-gray-700 p-3 rounded-lg hover:bg-gray-600 transition-colors cursor-pointer"
                  >
                    <p className={`text-${tip.color}-500 font-medium mb-1`}>{tip.title}</p>
                    <p className="text-gray-400 text-sm">{tip.description}</p>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarbonSpeedometerPage;
