import React from 'react';
import { Link } from 'react-router-dom';

const LandingHero = () => {
  return (
    <section className="bg-cover bg-center bg-fixed h-screen flex items-center justify-center text-center px-6"
      style={{ backgroundImage: "url('/assets/Lbackground.jpg')" }}
    >
      <div className="bg-black bg-opacity-60 p-6 rounded-lg">
        <h2 className="text-4xl text-white font-bold mb-4">Welcome to Coal Mining Insights</h2>
        <p className="text-lg text-gray-300 mb-6">
          Quantify, analyze, and pave the way to a sustainable future with our innovative platform.
        </p>
        <Link
          to="/register"
          className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition"
        >
          Get Started
        </Link>
      </div>
    </section>
  );
};

export default LandingHero;
