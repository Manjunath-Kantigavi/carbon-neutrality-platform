import React, { useState } from 'react';
import ReactApexChart from 'react-apexcharts';

const baseOptions = {
  chart: {
    fontFamily: 'Satoshi, sans-serif',
    type: 'donut',
    background: '#ffffff', // Background color for the chart
    dropShadow: {
      enabled: true,
      color: '#623CEA14',
      top: 10,
      blur: 4,
      opacity: 0.1,
    },
    padding: {
      top: 10,
      bottom: 10,
      left: 10,
      right: 10,
    },
  },
  colors: ['#006400', '#FFA500', '#228B22'], // Dark green, orange, and green
  labels: ['CO2', 'SO2', 'Particulate Matter'],
  legend: {
    show: false,
    position: 'bottom',
  },
  plotOptions: {
    pie: {
      donut: {
        size: '60%', // Adjusted size to improve border visibility
        background: 'transparent',
      },
    },
  },
  dataLabels: {
    enabled: false,
  },
  stroke: {
    show: true,
    width: 3, // Increased width for better visibility
    colors: ['#ffffff'], // White border
  },
  states: {
    hover: {
      filter: {
        type: 'none', // No dimming effect to keep borders consistent
      },
    },
  },
  responsive: [
    {
      breakpoint: 2600,
      options: {
        chart: {
          width: 380,
        },
      },
    },
    {
      breakpoint: 640,
      options: {
        chart: {
          width: 200,
        },
      },
    },
  ],
};

const ChartThree = ({series}) => {
  return (
    <div className="col-span-12  rounded-lg border border-black bg-white p-4 shadow-lg transition-transform duration-500 ease-in-out transform hover:scale-105 hover:shadow-2xl xl:col-span-5">
      <div className="mb-5 flex justify-between gap-4">
        <div>
          <h5 className="text-xl font-semibold text-black mb-3">
            Emissions Analytics - Coal Mine Process
          </h5>
        </div>
        <div>
          <div className="relative z-20 inline-block">
            <select className="relative text-black z-20 inline-flex appearance-none bg-transparent py-1 pl-3 pr-8 text-sm font-medium outline-none">
              <option value="" className="text-gray-950 bg-white">
                Monthly
              </option>
            </select>
            <span className="absolute right-3 top-1/2 z-10 -translate-y-1/2">
              <svg width="10" height="6" viewBox="0 0 10 6" fill="none">
                <path
                  d="M0.47 1.09c0-.06.03-.13.08-.17a.44.44 0 0 1 .37 0l3.94 3.71a.42.42 0 0 0 .29.11.42.42 0 0 0 .3-.12L9.09.9a.44.44 0 0 1 .63.63L5.5 4.99a1.05 1.05 0 0 1-1.5 0L.47 1.1Z"
                  fill="#637381"
                />
              </svg>
            </span>
          </div>
        </div>
      </div>

      <div className="mb-2">
        <div id="chartThree" className="mx-auto flex justify-center overflow-hidden">
          <ReactApexChart
            options={baseOptions}
            series={series}
            type="donut"
          />
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-y-3 px-2">
        {baseOptions.labels.map((label, index) => (
          <div key={index} className="sm:w-1/2 w-full px-2">
            <div className="flex w-full items-center">
              <span
                className={`mr-2 block h-3 w-full max-w-3 rounded-full`}
                style={{ backgroundColor: baseOptions.colors[index] }}
              ></span>
              <p className="flex w-full justify-between text-sm font-medium text-black">
                <span>{label}</span>
                <span>{series[index]}%</span>
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChartThree;
