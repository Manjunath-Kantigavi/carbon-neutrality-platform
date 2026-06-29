import React from 'react';

const LandingAbout = () => {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">About Us</h2>
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-lg text-gray-600 mb-8">
            Coal Mining Insights is dedicated to revolutionizing the mining industry through sustainable practices 
            and innovative technology. Our platform provides comprehensive solutions for tracking, analyzing, 
            and optimizing carbon footprint management in mining operations.
          </p>
          <p className="text-lg text-gray-600">
            We combine cutting-edge technology with environmental consciousness to help mining operations 
            achieve their sustainability goals while maintaining operational efficiency.
          </p>
        </div>
      </div>
    </section>
  );
};

export default LandingAbout;
