import React, { useState, useEffect } from 'react';
import ChartOne from './ChartOne';
import ChartTwo from './ChartTwo';
import ChartThree from './ChartThree';
import CardDataStats from './CardDataStats';
import { getVisualizationData } from '../../api/api';
import { CircularProgress } from '@mui/material';

import coalIcon from '../../assets/icons/coalicon1.png';
import gasPumpIcon from '../../assets/icons/fuel.png';
import carbonOffsetIcon from '../../assets/icons/carbonoffset.png';
import emissionIcon from '../../assets/icons/emissionicon.png';

const Visualization = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [vizData, setVizData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getVisualizationData();
        setVizData(res.data);
      } catch (err) {
        setError(err?.response?.data?.message || "Failed to load visualization data.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-64 gap-4">
        <CircularProgress sx={{ color: '#FFA500' }} />
        <p className="text-gray-500">Loading your data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-64 gap-4">
        <p className="text-red-500 font-medium">{error}</p>
      </div>
    );
  }

  const { kpi, pollutants, monthlyEmissionSinkTrend, productionFuelTrend } = vizData;

  //  Map real data into ChartOne's expected format
  const chartOneData = [
    { name: 'Fuel Consumption', data: productionFuelTrend.fuelConsumption },
    { name: 'Coal Production', data: productionFuelTrend.coalProduction },
  ];

  //  Map real data into ChartTwo's expected format
  const chartTwoSeries = [
    { name: 'Carbon Emissions', data: monthlyEmissionSinkTrend.emissions, color: '#FF4444' },
    { name: 'Carbon Sinks', data: monthlyEmissionSinkTrend.sinks, color: '#228B22' },
  ];

  //  Map real pollutants into percentage breakdown for ChartThree
  const totalPollutants = (pollutants.co2 || 0) + (pollutants.so2 || 0) + (pollutants.pm || 0);
  const chartThreeSeries = totalPollutants > 0
    ? [
      Math.round((pollutants.co2 / totalPollutants) * 100),
      Math.round((pollutants.so2 / totalPollutants) * 100),
      Math.round((pollutants.pm / totalPollutants) * 100),
    ]
    : [0, 0, 0];

  return (
    <div className="p-3 sm:p-6 rounded-lg shadow-md ">
      <h2 className="text-2xl font-bold mb-4 text-black">Data Visualization</h2>

      {/* Cards Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <CardDataStats
          title="Coal Production"
          total={`${kpi.coalProduction} Tons/Day`}
          icon={coalIcon}
        />
        <CardDataStats
          title="Fuel Consumption"
          total={`${kpi.fuelConsumption} L/Day`}
          icon={gasPumpIcon}
        />
        <CardDataStats
          title="Carbon Offset"
          total={`${kpi.carbonOffset} Tons/Day`}
          icon={carbonOffsetIcon}
        />
        <CardDataStats
          title="Emission Level"
          total={`${kpi.emissionLevel} Tons/Day`}
          icon={emissionIcon}
        />
      </div>

      {/* ChartOne */}
      <div className="mb-8 border border-black p-3 sm:p-6 rounded-lg shadow-md transition-transform duration-500 ease-in-out transform hover:scale-105 hover:shadow-2xl mt-4">
        <ChartOne title="Coal Production and Fuel Consumption" dateRange="January - December" data={chartOneData} />
      </div>

      {/* ChartTwo and ChartThree */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-8">
        <div className="lg:col-span-2">
          <ChartTwo series={chartTwoSeries} />
        </div>
        <div className="lg:col-span-1">
          <ChartThree series={chartThreeSeries} />
        </div>
      </div>
    </div>
  );
};

export default Visualization;