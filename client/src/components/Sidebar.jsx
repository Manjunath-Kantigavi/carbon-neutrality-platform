import React, { useState } from 'react';
import {
  FaDatabase, FaChartBar, FaLightbulb, FaCog, FaBars, FaTree, FaTimes, FaFileAlt,
  FaUserCircle, FaSignOutAlt
} from 'react-icons/fa';
import { Link, useLocation } from 'react-router-dom';

function Sidebar({ userData, isMobileOpen, closeMobileSidebar, onLogOut }) {
  const [isOpen, setIsOpen] = useState(true); // desktop collapse/expand
  const location = useLocation();

  const userName = userData?.fullName || "User";

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const isActiveLink = (path) => {
    return location.pathname === path;
  };

  const menuItems = [
    {
      title: "Dashboard",
      icon: FaChartBar,
      path: "/dashboard/visualise",
    },
    {
      title: "Emission Data",
      icon: FaDatabase,
      path: "/dashboard/dataInput",
    },
    {
      title: "Carbon Sinks",
      icon: FaTree,
      path: "/dashboard/carbonSinks",
    },
    {
      title: "Reduction Pathways",
      icon: FaLightbulb,
      path: "/dashboard/suggestions",
    },
    {
      title: "Reports",
      icon: FaFileAlt,
      path: "/dashboard/reports",
    },
  ];

  return (
    <>
      {/*  Mobile overlay backdrop */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-40 lg:hidden"
          onClick={closeMobileSidebar}
        />
      )}

      <div
        className={`
          flex flex-col bg-black min-h-screen p-5 pt-8 relative duration-300
          ${isOpen ? 'lg:w-72' : 'lg:w-20'}
          fixed lg:static top-0 left-0 z-50 w-64
          transform transition-transform duration-300
          ${isMobileOpen ? 'translate-x-0' : '-translate-x-full'}
          lg:translate-x-0
        `}
      >
        {/* Mobile close button */}
        <button
          onClick={closeMobileSidebar}
          className="absolute top-5 right-5 lg:hidden text-white"
        >
          <FaTimes className="text-xl" />
        </button>

        {/* Desktop collapse toggle */}
        <button
          onClick={toggleSidebar}
          className={`hidden lg:flex absolute cursor-pointer rounded-full -right-3 top-9 w-7 h-7 border-2 border-black bg-white hover:bg-gray-100 items-center justify-center ${!isOpen && "rotate-180"}`}
        >
          <FaBars className="text-black text-sm" />
        </button>

        <div className="flex gap-x-4 items-center mb-12">
          <div className={`cursor-pointer duration-500 ${!isOpen && "lg:rotate-[360deg]"}`}>
            <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-blue-500 rounded-lg flex items-center justify-center flex-shrink-0">
              <span className="text-2xl font-bold text-white">C</span>
            </div>
          </div>
          <h1 className={`text-white origin-left font-medium text-xl duration-300 ${!isOpen && "lg:scale-0"}`}>
            CarbonTrack
          </h1>
        </div>

        <div className="flex flex-col gap-y-2">
          {menuItems.map((item, index) => (
            <Link
              key={index}
              to={item.path}
              onClick={closeMobileSidebar}
              className={`flex items-center gap-x-4 cursor-pointer p-3 hover:bg-gray-900 rounded-lg transition-all duration-200
                ${isActiveLink(item.path) ? 'bg-gray-900 border-l-4 border-green-500' : 'text-gray-300'}`}
            >
              <item.icon className={`text-xl flex-shrink-0 ${isActiveLink(item.path) ? 'text-green-500' : 'text-gray-400'}`} />
              <span className={`${!isOpen && 'lg:hidden'} origin-left duration-200 text-sm font-medium whitespace-nowrap
                ${isActiveLink(item.path) ? 'text-green-500' : 'text-gray-300'}`}>
                {item.title}
              </span>
            </Link>
          ))}
        </div>

        <div className="mt-auto pt-6 border-t border-gray-800">
          <Link
            to="/dashboard/myProfile"
            onClick={closeMobileSidebar}
            className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-900 transition mb-1"
          >
            <FaUserCircle className="text-2xl text-green-500 flex-shrink-0" />
            <div className={`${!isOpen && "lg:hidden"}`}>
              <p className="text-white text-sm font-medium">{userName}</p>
              <p className="text-xs text-gray-400">My Profile</p>
            </div>
          </Link>

          {/* ✅ Settings */}
          <Link
            to="/dashboard/accountSettings"
            onClick={closeMobileSidebar}
            className={`flex items-center gap-x-4 p-3 hover:bg-gray-900 rounded-lg transition-all duration-200
      ${isActiveLink('/dashboard/accountSettings') ? 'bg-gray-900 border-l-4 border-green-500' : 'text-gray-300'}`}
          >
            <FaCog className={`text-xl flex-shrink-0 ${isActiveLink('/dashboard/accountSettings') ? 'text-green-500' : 'text-gray-400'}`} />
            <span className={`${!isOpen && 'lg:hidden'} text-sm font-medium
      ${isActiveLink('/dashboard/accountSettings') ? 'text-green-500' : 'text-gray-300'}`}>
              Settings
            </span>
          </Link>

          {/* ✅ Logout */}
          <button
            onClick={() => { onLogOut(); closeMobileSidebar(); }}
            className="flex items-center gap-x-4 w-full p-3 text-gray-300 hover:bg-gray-900 hover:text-red-400 rounded-lg transition-all duration-200 mt-1"
          >
            <FaSignOutAlt className="text-xl flex-shrink-0" />
            <span className={`${!isOpen && 'lg:hidden'} text-sm font-medium`}>Logout</span>
          </button>
        </div>




      </div>
    </>
  );
}

export default Sidebar;