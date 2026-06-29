import React, { useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import { FaBars } from "react-icons/fa";

import Sidebar from "./components/Sidebar";
import DataInput from "./components/DataInput/DataInput.jsx";
import Visualization from "./components/Visualise/Visualise.jsx";
import Suggestions from "./components/Suggestions/Suggestion.jsx";
import MyProfile from "./components/UserProfile/MyProfile";
import AccountSettings from "./components/UserProfile/AccountSettings";
import ChartOne from "./components/Visualise/ChartOne";
import ChartTwo from "./components/Visualise/ChartTwo";
import ChartThree from "./components/Visualise/ChartThree";
import ExportOptions from "./components/Export/ExportOptions";
import CarbonSinks from "./components/CarbonSinks/CarbonSinks";
import LandingPage from "./components/Landing/LandingPage";
import Login from "./components/Landing/Login";
import Register from "./components/Landing/Register";

const App = () => {

  const [userData, setUserData] = useState(() => {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  });

  const [isAuthenticated, setIsAuthenticated] = useState(
    () => !!localStorage.getItem("token")
  );

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleLogin = (user, token) => {
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
    setUserData(user);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUserData(null);
    setIsAuthenticated(false);
  };

  return (
    <BrowserRouter>
      <Routes>

        {/* Public */}
        <Route path="/" element={<LandingPage />} />

        <Route
          path="/login"
          element={
            !isAuthenticated ? (
              <Login onLogin={handleLogin} />
            ) : (
              <Navigate to="/dashboard" replace />
            )
          }
        />

        <Route
          path="/register"
          element={
            !isAuthenticated ? (
              <Register />
            ) : (
              <Navigate to="/dashboard" replace />
            )
          }
        />

        {/* Protected */}
        <Route
          path="/dashboard/*"
          element={
            isAuthenticated ? (
              <div className="flex h-screen overflow-hidden">
                <div className="w-0 lg:w-auto flex-shrink-0">
                  <Sidebar
                    userData={userData}
                    isMobileOpen={isSidebarOpen}
                    closeMobileSidebar={() => setIsSidebarOpen(false)}
                    onLogOut={handleLogout}
                  />
                </div>
                <div className="flex flex-col flex-grow bg-white min-w-0 overflow-auto">

                  <div className="lg:hidden flex items-center bg-black text-white px-4 py-3">
                    <button onClick={() => setIsSidebarOpen(true)}>
                      <FaBars className="text-xl" />
                    </button>

                    <h1 className="ml-4 text-lg font-semibold">CarbonTrack</h1>
                  </div>
                  <main className="p-4 sm:p-8 flex-grow ">
                    <Routes>
                      <Route path="/" element={<Navigate to="dataInput" />} />
                      <Route path="dataInput" element={<DataInput />} />
                      <Route path="visualise" element={<Visualization />} />
                      <Route path="carbonSinks" element={<CarbonSinks />} />
                      <Route path="suggestions" element={<Suggestions />} />
                      <Route path="myProfile" element={<MyProfile userData={userData} />} />
                      <Route path="accountSettings" element={<AccountSettings userData={userData} />} />
                      <Route path="chartOne" element={<ChartOne />} />
                      <Route path="chartTwo" element={<ChartTwo />} />
                      <Route path="chartThree" element={<ChartThree />} />
                      <Route path="reports" element={<ExportOptions />} />
                    </Routes>
                  </main>
                </div>
              </div>
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

      </Routes>
    </BrowserRouter>
  );
};

export default App;
