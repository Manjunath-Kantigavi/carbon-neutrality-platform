import React from 'react';

const LandingFeatures = () => {
  return (
    <section id="features" className="py-16 bg-gray-100">
      <div className="container mx-auto px-6 py-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">
          Key Features of Our Platform
        </h2>
        <div className="space-y-12">
          {/* Feature 1 */}
          <div className="flex flex-col lg:flex-row items-center gap-4 lg:gap-8 p-8 bg-gray-200 shadow-lg rounded-lg mb-8 mx-auto max-w-4xl">
            <div className="lg:w-1/2">
              <img
                src="/assets/carbon-emission-tracking.jpg"
                alt="Carbon Emission Tracking"
                className="rounded-lg shadow-lg max-h-80 object-cover"
              />
            </div>
            <div className="lg:w-1/2 text-gray-700 space-y-4">
              <h3 className="text-2xl font-semibold text-gray-800">
                Carbon Emission Tracking
              </h3>
              <p>
                Monitor emissions with real-time data visualization, breaking down emissions by activity.
                Use advanced tracking methods for accurate carbon footprint assessments.
              </p>
            </div>
          </div>

          {/* Feature 2 */}
          <div className="flex flex-col lg:flex-row items-center gap-4 lg:gap-8 lg:flex-row-reverse p-8 bg-gray-200 shadow-lg rounded-lg mb-8 mx-auto max-w-4xl">
            <div className="lg:w-1/2">
              <img
                src="/assets/carbon-sink-estimation.jpg"
                alt="Carbon Sink Estimation"
                className="rounded-lg shadow-lg max-h-80 object-cover"
              />
            </div>
            <div className="lg:w-1/2 text-gray-700 space-y-4">
              <h3 className="text-2xl font-semibold text-gray-800">
                Carbon Sink Estimation
              </h3>
              <p>
                Assess current carbon sinks like forests and estimate the potential for offsetting emissions.
                Get a balance analysis of emissions and absorption capabilities.
              </p>
            </div>
          </div>

          {/* Feature 3 */}
          <div className="flex flex-col lg:flex-row items-center gap-4 lg:gap-8 p-8 bg-gray-200 shadow-lg rounded-lg mb-8 mx-auto max-w-4xl">
            <div className="lg:w-1/2">
              <img
                src="/assets/data-visualization.jpg"
                alt="Data Visualization"
                className="rounded-lg shadow-lg max-h-80 object-cover"
              />
            </div>
            <div className="lg:w-1/2 text-gray-700 space-y-4">
              <h3 className="text-2xl font-semibold text-gray-800">
                Interactive Data Visualization
              </h3>
              <p>
                View your data through intuitive charts and graphs. Make informed decisions
                with clear, actionable insights from your emission data.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LandingFeatures;
