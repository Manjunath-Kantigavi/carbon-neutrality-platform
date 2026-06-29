import React from 'react';
import ReactApexChart from 'react-apexcharts';

const ChartOne = ({ title, dateRange, data }) => {
  const options = {
    legend: { show: false, position: 'top', horizontalAlign: 'left' },
    colors: ['#006400', '#90EE90'], // Dark Green and Light Green (PaleGreen)
    chart: {
      height: '100%',
      type: 'area',
      dropShadow: {
        enabled: true,
        color: '#623CEA14',
        top: 10,
        blur: 4,
        opacity: 0.1,
      },
      toolbar: { show: false },
    },
    responsive: [
      { breakpoint: 1024, options: { chart: { height: '100%' } } },
      { breakpoint: 1366, options: { chart: { height: '100%' } } },
    ],
    stroke: { width: [2, 2], curve: 'straight', colors: ['#006400', '#32CD32'] }, // Keeping dark green and making light green more visible
    grid: {
      borderColor: '#d1d5db', // Lighter version of gray for grid lines
      xaxis: { lines: { show: true } },
      yaxis: { lines: { show: true } },
    },
    dataLabels: { enabled: false },
    markers: {
      size: 4,
      colors: '#fff',
      strokeColors: ['#006400', '#32CD32'], // Dark Green and more visible Light Green
      strokeWidth: [2, 3], // Making light green marker slightly thicker
    },
    xaxis: {
      type: 'category',
      categories: [
        'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
      ],
      labels: {
        style: {
          colors: '#000000', // Black text color for x-axis labels
        },
      },
    },
    yaxis: {
      min: 0, max: 100,
      labels: {
        style: {
          colors: '#000000', // Black text color for y-axis labels
        },
      },
    },
  };

  return (
    <div className="col-span-12 rounded-sm bg-white p-6">
      <div className="mb-4 justify-between gap-4 sm:flex">
        <div>
          <h4 className="text-xl font-semibold text-black">
            {title}
          </h4>
        </div>
        <div>
          <div className="relative z-20 inline-block">
            <div className="chart-date-range text-lg font-semibold text-black mt-2">
              {dateRange}
            </div>
          </div>
        </div>
      </div>

      <div>
        <div id="chartOne" className="h-[355px] w-full overflow-hidden">
          <ReactApexChart
            options={options}
            series={data}
            type="area"
            height={350}
          />
        </div>
      </div>
    </div>
  );
};

export default ChartOne;
