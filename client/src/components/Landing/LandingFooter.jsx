import React from 'react';
import { Link } from 'react-router-dom';

const LandingFooter = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h3 className="text-xl font-bold">Coal Mining Insights</h3>
            <p className="text-gray-400">Empowering sustainable mining practices</p>
          </div>
          <div className="flex space-x-4">
            <Link
              to="/privacy-policy"
              className="hover:text-green-400"
            >
              Privacy Policy
            </Link>
            <Link
              to="/terms-of-service"
              className="hover:text-green-400"
            >
              Terms of Service
            </Link>
            <Link
              to="/contact"
              className="hover:text-green-400"
            >
              Contact
            </Link>
          </div>
        </div>
        <div className="mt-8 text-center text-gray-400">
          <p>&copy; 2023 Coal Mining Insights. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default LandingFooter;
