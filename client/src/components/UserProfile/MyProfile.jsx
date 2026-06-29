import React, { useState } from 'react';
import { FaFacebook, FaTwitter, FaLinkedin, FaCamera, FaWhatsapp } from 'react-icons/fa';

const MyProfile = ({ userData }) => {
  const [bgImage, setBgImage] = useState('https://via.placeholder.com/600x300');
  const [profileImage, setProfileImage] = useState('https://via.placeholder.com/100');

  if (!userData) return <div className="text-center mt-20 text-gray-500">Loading profile...</div>;

  const handleChangeBgImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setBgImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleChangeProfileImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const fullName = userData?.fullName || "User";
  const username = userData?.username || "";
  const email = userData?.email || "";
  const userInitial = fullName.charAt(0).toUpperCase();

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md mt-8 flex flex-col items-center">
      {/* Coal Mine Image */}
      <div className="relative w-full h-48 bg-cover bg-center rounded-lg mb-16" style={{ backgroundImage: `url('${bgImage}')` }}>
        {/* Change Background Image Icon */}
        <label htmlFor="bgImageInput" className="absolute top-2 right-2 cursor-pointer">
          <FaCamera className="text-white bg-blue-500 rounded-full p-1 w-8 h-8" />
          <input
            type="file"
            id="bgImageInput"
            className="hidden"
            accept="image/*"
            onChange={handleChangeBgImage}
          />
        </label>
        {/* Profile Image */}
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2">
          {profileImage ? (
            <img src={profileImage} alt="Profile" className="rounded-full border-4 border-white w-24 h-24 object-cover" />
          ) : (
            <div className="w-24 h-24 rounded-full border-4 border-white bg-gradient-to-r from-green-500 to-blue-500 flex items-center justify-center">
              <span className="text-3xl font-bold text-white">{userInitial}</span>
            </div>
          )}
          {/* Change Profile Image Icon */}
          <label htmlFor="profileImageInput" className="absolute bottom-0 right-0 cursor-pointer">
            <FaCamera className="text-white bg-blue-500 rounded-full p-1 w-8 h-8" />
            <input
              type="file"
              id="profileImageInput"
              className="hidden"
              accept="image/*"
              onChange={handleChangeProfileImage}
            />
          </label>
        </div>
      </div>

      {/* User Info */}
      <div className="text-center mt-8 mb-10">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-white">{fullName}</h2>
        <p className="text-gray-500 dark:text-gray-400">@{username}</p>
        <p className="text-gray-500 dark:text-gray-400 mt-1">{email}</p>

        <div className="flex justify-center space-x-4 mt-4">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">
            <FaFacebook className="w-6 h-6" />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-600">
            <FaTwitter className="w-6 h-6" />
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-blue-700 hover:text-blue-900">
            <FaLinkedin className="w-6 h-6" />
          </a>
          <a href="https://wa.me" target="_blank" rel="noopener noreferrer" className="text-green-500 hover:text-green-700">
            <FaWhatsapp className="w-6 h-6" />
          </a>
        </div>
      </div>

      {/* Info Cards */}
      <div className="w-full max-w-md space-y-4 mb-10">
        <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
          <p className="text-xs text-gray-400 uppercase tracking-wide">Full Name</p>
          <p className="text-gray-800 dark:text-white font-medium mt-1">{fullName}</p>
        </div>
        <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
          <p className="text-xs text-gray-400 uppercase tracking-wide">Username</p>
          <p className="text-gray-800 dark:text-white font-medium mt-1">@{username}</p>
        </div>
        <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
          <p className="text-xs text-gray-400 uppercase tracking-wide">Email</p>
          <p className="text-gray-800 dark:text-white font-medium mt-1">{email}</p>
        </div>
      </div>

      <button className="text-green-600 border border-green-600 px-6 py-2 rounded-md hover:bg-green-600 hover:text-white transition-all duration-300">
        Edit Profile
      </button>
    </div>
  );
};

export default MyProfile;
