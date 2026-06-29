import React from 'react';

const LandingServices = () => {
  return (
    <section className="py-20 bg-gray-100">
      <div className="container mx-auto px-6">
        <h3 className="text-3xl font-bold text-gray-900 text-center mb-8">
          We Provide Comprehensive Solutions for Carbon Footprint Management
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Service 1 */}
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <h4 className="text-xl font-bold text-green-500 mb-4">Carbon Emissions Quantification</h4>
            <p className="text-gray-600">Accurately measure emissions from various mining activities with advanced data analysis.</p>
          </div>
          {/* Service 2 */}
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <h4 className="text-xl font-bold text-green-500 mb-4">Carbon Sink Estimation</h4>
            <p className="text-gray-600">Analyze and estimate carbon absorption levels from existing natural resources.</p>
          </div>
          {/* Service 3 */}
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <h4 className="text-xl font-bold text-green-500 mb-4">Gap Analysis & Neutrality Pathways</h4>
            <p className="text-gray-600">Identify the gap between emissions and absorption, suggesting practical pathways to achieve carbon neutrality.</p>
          </div>
          {/* Service 4 */}
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <h4 className="text-xl font-bold text-green-500 mb-4">Per Capita Emission Analysis</h4>
            <p className="text-gray-600">Break down emissions data to provide insights at an individual or team level for targeted improvements.</p>
          </div>
          {/* Service 5 */}
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <h4 className="text-xl font-bold text-green-500 mb-4">Data Visualization</h4>
            <p className="text-gray-600">Use interactive charts and graphs to track trends and understand emission patterns effortlessly.</p>
          </div>
          {/* Service 6 */}
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <h4 className="text-xl font-bold text-green-500 mb-4">Scalable & AI-Driven Insights</h4>
            <p className="text-gray-600">Leverage AI to provide actionable recommendations and scalability for mines of all sizes.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LandingServices;
