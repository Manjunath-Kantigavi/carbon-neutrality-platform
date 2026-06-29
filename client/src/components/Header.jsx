import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import CarbonCredit from './CarbonCredit';

function Header({ onLogout, userData , onOpenSidebar}) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const location = useLocation();

  const userName = userData?.fullName || "User";
  const userInitial = userName.charAt(0).toUpperCase();

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const isActive = (path) => location.pathname.includes(path);

  const navItems = [
    { label: 'Dashboard', path: '/dashboard/visualise' },
    { label: 'Emission Data', path: '/dashboard/dataInput' },
    { label: 'Carbon Sinks', path: '/dashboard/carbonSinks' },
    { label: 'Pathways', path: '/dashboard/suggestions' },
    { label: 'Reports', path: '/dashboard/reports' }
  ];

 return (
  <header className="bg-[#1a1a1a] border-b border-gray-800 text-white px-4 py-3 flex flex-row items-center justify-between gap-2 flex-wrap lg:flex-nowrap">

    {/* Hamburger + Logo */}
    <div className="flex items-center gap-3 flex-shrink-0">
      <button onClick={onOpenSidebar} className="lg:hidden text-white">
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>
      <div className="w-9 h-9 bg-gradient-to-r from-green-500 to-blue-500 rounded-lg flex items-center justify-center flex-shrink-0">
        <span className="text-lg font-bold text-white">C</span>
      </div>
      <Link to="/dashboard" className="text-lg font-medium hover:text-green-500 transition-colors duration-200 whitespace-nowrap hidden sm:block">
        CarbonTrack Dashboard
      </Link>
    </div>

    {/* Carbon Credit */}
    <div className="flex items-center flex-shrink-0 max-w-[160px] sm:max-w-none overflow-hidden">
      <CarbonCredit />
    </div>

    {/* Navigation — desktop only */}
    <nav className="hidden lg:flex items-center gap-1 flex-shrink-0">
      {navItems.map((item, index) => (
        <Link
          key={index}
          to={item.path}
          className={`px-3 py-2 rounded-lg transition-all duration-200 text-sm font-medium whitespace-nowrap
            ${isActive(item.path)
              ? 'bg-gray-800 text-green-500'
              : 'text-gray-300 hover:bg-gray-800 hover:text-green-500'
            }`}
        >
          {item.label}
        </Link>
      ))}
    </nav>

    {/* User Dropdown */}
    <div className="relative flex-shrink-0">
      <button
        onClick={toggleDropdown}
        className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-800 transition-all duration-200"
      >
        <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
          <span className="text-sm font-bold">{userInitial}</span>
        </div>
        <span className="text-sm font-medium text-gray-300 hidden sm:block">{userName}</span>
        <svg
          className={`w-4 h-4 transform transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : 'rotate-0'}`}
          fill="none" stroke="currentColor" viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {dropdownOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-[#1a1a1a] rounded-lg shadow-lg py-2 z-50 border border-gray-800">
          <Link to="/dashboard/myProfile" onClick={toggleDropdown}
            className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-800 hover:text-green-500">
            My Profile
          </Link>
          <Link to="/dashboard/accountSettings" onClick={toggleDropdown}
            className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-800 hover:text-green-500">
            Account Settings
          </Link>
          <button onClick={() => { toggleDropdown(); onLogout(); }}
            className="w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-800 hover:text-green-500">
            Logout
          </button>
        </div>
      )}
    </div>
  </header>
);
}

export default Header;
