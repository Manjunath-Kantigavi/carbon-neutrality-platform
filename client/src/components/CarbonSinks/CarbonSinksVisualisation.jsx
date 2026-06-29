import React from 'react';
import ReactApexChart from 'react-apexcharts';
import { motion } from 'framer-motion';
import { FaTree, FaSeedling, FaLeaf, FaIndustry } from 'react-icons/fa';
import { BsArrowUpShort, BsArrowDownShort } from 'react-icons/bs';

const StatsCard = ({ icon: Icon, value, label, change, isPositive, isNegative }) => {
  return (
    <div className="relative flex flex-col p-3 sm:p-6 bg-white rounded-[20px] border border-gray-100">
      <div className="w-12 h-12 mb-4 flex items-center justify-center">
        <Icon className={`text-2xl ${isPositive ? 'text-green-500' : isNegative ? 'text-blue-500' : 'text-orange-500'}`} />
      </div>
      <div className="flex flex-col gap-1">
        <h3 className="text-2xl font-bold text-gray-900">{value}</h3>
        <div className="flex items-center justify-between">
          <span className="text-gray-500 text-sm">{label}</span>
          {change && (
            <span className={`flex items-center text-sm font-medium ${isPositive ? 'text-green-500' : isNegative ? 'text-blue-500' : 'text-orange-500'}`}>
              {change}
              {isPositive && <BsArrowUpShort className="text-xl" />}
              {isNegative && <BsArrowDownShort className="text-xl" />}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

const CarbonSinksVisualisation = ({ data }) => {
  // Use the already-calculated values from parent — no need to recalculate
  const forestCarbonSequestration = data.afforestation.sequestrationTonsPerYear || 0;
  const soilCarbonSequestration = data.soilCarbon.sequestrationTonsPerYear || 0;
  const grasslandSequestration = data.grassland.sequestrationTonsPerYear || 0;
  const methaneCarbonOffset = (data.methaneCapture.captureRateM3 || 0) * 0.8 / 1000; // m³ → approx tCO2

  const totalSequestration =
    forestCarbonSequestration +
    soilCarbonSequestration +
    grasslandSequestration +
    methaneCarbonOffset;

  // Bar Chart - Areas by Type
  const areaChartConfig = {
    series: [{
      name: 'Area',
      data: [
        data.afforestation.areaHectares || 0,
        data.soilCarbon.areaHectares || 0,
        data.grassland.areaHectares || 0
      ]
    }],
    options: {
      chart: { type: 'bar', height: 350, toolbar: { show: false } },
      plotOptions: { bar: { borderRadius: 10, dataLabels: { position: 'top' }, columnWidth: '50%' } },
      colors: ['#10B981'],
      dataLabels: {
        enabled: true,
        formatter: (val) => val.toFixed(1) + " ha",
        offsetY: -20,
        style: { fontSize: '12px', colors: ["#304758"] }
      },
      xaxis: {
        categories: ["Afforestation", "Soil Carbon", "Grassland"],
        labels: { style: { colors: '#304758', fontSize: '12px' } }
      },
      yaxis: {
        labels: { formatter: (val) => val.toFixed(1) + " ha", style: { colors: '#304758', fontSize: '12px' } }
      },
      grid: { borderColor: '#e5e7eb', yaxis: { lines: { show: false } } }
    }
  };

  // Donut Chart - Carbon Sequestration by Type
  const hasSequestration = totalSequestration > 0;
  const sequestrationChartConfig = {
    series: hasSequestration ? [
      (forestCarbonSequestration / totalSequestration) * 100,
      (soilCarbonSequestration / totalSequestration) * 100,
      (grasslandSequestration / totalSequestration) * 100,
      (methaneCarbonOffset / totalSequestration) * 100
    ] : [0, 0, 0, 0],
    options: {
      chart: { type: 'donut', height: 350 },
      labels: ['Afforestation', 'Soil Carbon', 'Grassland', 'Methane Capture'],
      colors: ['#10B981', '#3B82F6', '#F59E0B', '#FFA07A'],
      plotOptions: {
        pie: {
          donut: {
            size: '70%',
            labels: {
              show: true,
              total: {
                show: true,
                label: 'Total Sequestration',
                formatter: () => totalSequestration.toFixed(2) + ' tCO2/year'
              }
            }
          }
        }
      },
      dataLabels: {
        enabled: true,
        formatter: (val, opts) => opts.w.config.series[opts.seriesIndex].toFixed(1) + '%'
      },
      legend: { position: 'bottom', horizontalAlign: 'center', labels: { colors: '#304758' } },
      responsive: [{ breakpoint: 480, options: { chart: { width: 300 }, legend: { position: 'bottom' } } }]
    }
  };

  // Line Chart - Trend Analysis (simple projection)
  const trendChartConfig = {
    series: [{
      name: 'Projected Sequestration',
      data: [
        totalSequestration,
        totalSequestration * 1.2,
        totalSequestration * 1.5,
        totalSequestration * 1.8,
        totalSequestration * 2.1
      ]
    }],
    options: {
      chart: { type: 'line', height: 350, toolbar: { show: false } },
      stroke: { curve: 'smooth', width: 3 },
      colors: ['#10B981'],
      markers: { size: 4, colors: ['#10B981'], strokeColors: '#fff', strokeWidth: 2, hover: { size: 7 } },
      xaxis: {
        categories: ['Year 1', 'Year 2', 'Year 3', 'Year 4', 'Year 5'],
        labels: { style: { colors: '#304758', fontSize: '12px' } }
      },
      yaxis: {
        title: { text: 'Carbon Sequestration (tCO2/year)', style: { color: '#304758' } },
        labels: { formatter: (val) => val.toFixed(1), style: { colors: '#304758', fontSize: '12px' } }
      },
      grid: { borderColor: '#e5e7eb' },
      tooltip: { y: { formatter: (val) => val.toFixed(2) + ' tCO2/year' } }
    }
  };

  // Methane Capture - Single metric gauge/radial chart
  const methaneChartConfig = {
    series: [Math.min((data.methaneCapture.captureRateM3 || 0) / 10, 100)], // scaled for radial display
    options: {
      chart: { type: 'radialBar', height: 350 },
      plotOptions: {
        radialBar: {
          hollow: { size: '60%' },
          dataLabels: {
            name: { show: true, fontSize: '14px', color: '#304758', offsetY: -10 },
            value: {
              show: true,
              fontSize: '24px',
              fontWeight: 600,
              color: '#3B82F6',
              offsetY: 5,
              formatter: () => `${(data.methaneCapture.captureRateM3 || 0).toFixed(1)} m³`
            }
          }
        }
      },
      labels: ['Capture Rate'],
      colors: ['#3B82F6'],
    }
  };

  // Methane Capture - Credits trend (monthly projection)
  const methaneTrendConfig = {
    series: [{
      name: 'Carbon Credits',
      data: [
        data.methaneCapture.creditsPerMonth || 0,
        (data.methaneCapture.creditsPerMonth || 0) * 2,
        (data.methaneCapture.creditsPerMonth || 0) * 3,
        (data.methaneCapture.creditsPerMonth || 0) * 4,
        (data.methaneCapture.creditsPerMonth || 0) * 5,
        (data.methaneCapture.creditsPerMonth || 0) * 6,
      ]
    }],
    options: {
      chart: { type: 'area', height: 350, toolbar: { show: false } },
      stroke: { curve: 'smooth', width: 2 },
      fill: { type: 'gradient', gradient: { shadeIntensity: 1, opacityFrom: 0.4, opacityTo: 0.1 } },
      colors: ['#3B82F6'],
      xaxis: {
        categories: ['Month 1', 'Month 2', 'Month 3', 'Month 4', 'Month 5', 'Month 6'],
        labels: { style: { colors: '#304758', fontSize: '12px' } }
      },
      yaxis: {
        title: { text: 'Carbon Credits', style: { color: '#304758' } },
        labels: { style: { colors: '#304758', fontSize: '12px' } }
      },
      grid: { borderColor: '#e5e7eb' },
      tooltip: { y: { formatter: (val) => val.toFixed(1) + ' credits' } }
    }
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="p-2 sm:p-6">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
        <StatsCard icon={FaTree} value={`${data.afforestation.areaHectares || 0} ha`} label="Afforestation Area" isPositive={true} />
        <StatsCard icon={FaSeedling} value={`${data.soilCarbon.areaHectares || 0} ha`} label="Soil Carbon Area" isPositive={true} />
        <StatsCard icon={FaLeaf} value={`${data.grassland.areaHectares || 0} ha`} label="Grassland Area" isPositive={true} />
        <StatsCard icon={FaIndustry} value={`${(data.methaneCapture.captureRateM3 || 0).toFixed(1)} m³`} label="Methane Captured" isPositive={true} />
      </div>

      <div className="mt-8 mb-8">
        <StatsCard
          icon={FaTree}
          value={`${totalSequestration.toFixed(2)} tCO2/year`}
          label="Total Carbon Sequestration"
          isPositive={true}
        />
      </div>

      <div className="mt-8 grid grid-cols-12 gap-6">
        <div className="col-span-12 md:col-span-9 bg-white p-6 rounded-[20px] border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Area Distribution by Type</h3>
          <ReactApexChart options={areaChartConfig.options} series={areaChartConfig.series} type="bar" height={350} />
        </div>

        <div className="col-span-12 md:col-span-3 bg-white p-6 rounded-[20px] border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Carbon Sequestration</h3>
          <ReactApexChart options={sequestrationChartConfig.options} series={sequestrationChartConfig.series} type="donut" height={350} />
        </div>
      </div>

      <div className="w-full bg-white p-6 rounded-[20px] border border-gray-100 mt-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">5-Year Sequestration Projection</h3>
        <ReactApexChart options={trendChartConfig.options} series={trendChartConfig.series} type="line" height={350} />
      </div>
      {/* Methane Capture Section */}
      <div className="mt-6 grid grid-cols-12 gap-6">
        <div className="col-span-12 md:col-span-4 bg-white p-6 rounded-[20px] border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Methane Capture Rate</h3>
          <ReactApexChart options={methaneChartConfig.options} series={methaneChartConfig.series} type="radialBar" height={350} />
        </div>

        <div className="col-span-12 md:col-span-8 bg-white p-6 rounded-[20px] border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Methane Carbon Credits Trend</h3>
          <ReactApexChart options={methaneTrendConfig.options} series={methaneTrendConfig.series} type="area" height={350} />
        </div>
      </div>
    </motion.div>
  );
};

export default CarbonSinksVisualisation;