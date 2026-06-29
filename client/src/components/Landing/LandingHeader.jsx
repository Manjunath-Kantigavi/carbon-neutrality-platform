import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const LandingHeader = ({ scrollToSection }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-white text-black py-4 px-6 shadow-md fixed w-full z-50">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl sm:text-3xl font-bold">Coal Mining Insights</h1>

        {/* Hamburger button - mobile only */}
        <button
          className="sm:hidden text-black focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {menuOpen
              ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            }
          </svg>
        </button>

        {/* Desktop nav */}
        <nav className="hidden sm:block">
          <ul className="flex space-x-6 items-center">
            <li><button onClick={() => scrollToSection('about')} className="hover:text-green-400 cursor-pointer">About Us</button></li>
            <li><button onClick={() => scrollToSection('features')} className="hover:text-green-400 cursor-pointer">Features</button></li>
            <li><button onClick={() => scrollToSection('contact')} className="hover:text-green-400 cursor-pointer">Contact</button></li>
            <li><Link to="/login" className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition">Login</Link></li>
            <li><Link to="/register" className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition">Register</Link></li>
          </ul>
        </nav>
      </div>

      {/* Mobile dropdown menu */}
      {menuOpen && (
        <div className="sm:hidden mt-4 border-t border-gray-200 pt-4">
          <ul className="flex flex-col gap-3 px-2">
            <li><button onClick={() => { scrollToSection('about'); setMenuOpen(false); }} className="hover:text-green-400 cursor-pointer w-full text-left">About Us</button></li>
            <li><button onClick={() => { scrollToSection('features'); setMenuOpen(false); }} className="hover:text-green-400 cursor-pointer w-full text-left">Features</button></li>
            <li><button onClick={() => { scrollToSection('contact'); setMenuOpen(false); }} className="hover:text-green-400 cursor-pointer w-full text-left">Contact</button></li>
            <li><Link to="/login" onClick={() => setMenuOpen(false)} className="block bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition text-center">Login</Link></li>
            <li><Link to="/register" onClick={() => setMenuOpen(false)} className="block bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition text-center">Register</Link></li>
          </ul>
        </div>
      )}
    </header>
  );
};

export default LandingHeader;