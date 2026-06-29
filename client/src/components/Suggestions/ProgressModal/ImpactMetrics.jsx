import React from 'react';

const ImpactMetrics = ({ suggestion }) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-900">Impact Metrics</h3>
      
      <div className="grid gap-4">
        {/* CO2 Emissions Reduction */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            CO₂ Emissions Reduction
          </label>
          <div className="mt-1 p-2 block w-full rounded-md border border-gray-300 bg-gray-50">
            <span className="text-gray-900">{suggestion?.impactMetrics?.carbonReduced || 'N/A'}</span>
          </div>
        </div>

        {/* Methane Capture Rate */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Methane Capture Rate
          </label>
          <div className="mt-1 p-2 block w-full rounded-md border border-gray-300 bg-gray-50">
            <span className="text-gray-900">{suggestion?.impactMetrics?.methaneCaptureRate || 'N/A'}</span>
          </div>
        </div>

        {/* Energy Efficiency Improvement */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Energy Efficiency Improvement
          </label>
          <div className="mt-1 p-2 block w-full rounded-md border border-gray-300 bg-gray-50">
            <span className="text-gray-900">{suggestion?.impactMetrics?.energyEfficiency || 'N/A'}</span>
          </div>
        </div>

        {/* Carbon Credits Generated */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Carbon Credits Generated
          </label>
          <div className="mt-1 p-2 block w-full rounded-md border border-gray-300 bg-gray-50">
            <span className="text-gray-900">{suggestion?.impactMetrics?.carbonCreditsGenerated || 'N/A'}</span>
          </div>
        </div>

        {/* Implementation Timeline */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Implementation Timeline
          </label>
          <div className="mt-1 p-2 block w-full rounded-md border border-gray-300 bg-gray-50">
            <span className="text-gray-900">{suggestion?.impactMetrics?.implementationTime || 'N/A'}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImpactMetrics;
