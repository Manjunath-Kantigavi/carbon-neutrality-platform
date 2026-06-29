import React, { useState } from 'react';

const AccountSettings = ({ ownerData, onSave }) => {
  const [name, setName] = useState(ownerData.name);
  const [phone, setPhone] = useState(ownerData.phone);
  const [email, setEmail] = useState(ownerData.email);
  const [mineName, setMineName] = useState(ownerData.coalMineName);
  const [mineAddress, setMineAddress] = useState(ownerData.address);
  const [about, setAbout] = useState(ownerData.about || '');

  const handleSave = () => {
    const updatedData = {
      name,
      phone,
      email,
      coalMineName: mineName,
      address: mineAddress,
      about
    };
    onSave(updatedData);
  };

  const inputClasses = "w-full p-2 border border-gray-300 rounded bg-white text-gray-700 focus:outline-none focus:ring-1 focus:ring-[#FFA500] focus:border-[#FFA500] hover:border-[#FFA500]";

  return (
    <div className="bg-white p-8 rounded-lg shadow-md mt-8 ml-8">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Account Settings</h2>
        
        <div className="grid gap-8">
          {/* Personal Information */}
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
            <h3 className="text-xl font-semibold text-[#FFA500] mb-6">Personal Information</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-gray-700 mb-2 font-medium" htmlFor="full-name">Full Name</label>
                <input
                  type="text"
                  id="full-name"
                  className={inputClasses}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2 font-medium" htmlFor="phone">Phone Number</label>
                <input
                  type="text"
                  id="phone"
                  className={inputClasses}
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2 font-medium" htmlFor="email">Email Address</label>
                <input
                  type="email"
                  id="email"
                  className={inputClasses}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Mine Information */}
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
            <h3 className="text-xl font-semibold text-[#FFA500] mb-6">Mine Information</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-gray-700 mb-2 font-medium" htmlFor="mine-name">Mine Name</label>
                <input
                  type="text"
                  id="mine-name"
                  className={inputClasses}
                  value={mineName}
                  onChange={(e) => setMineName(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2 font-medium" htmlFor="mine-address">Mine Address</label>
                <input
                  type="text"
                  id="mine-address"
                  className={inputClasses}
                  value={mineAddress}
                  onChange={(e) => setMineAddress(e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* About Section */}
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
            <h3 className="text-xl font-semibold text-[#FFA500] mb-6">About</h3>
            <div>
              <label className="block text-gray-700 mb-2 font-medium" htmlFor="about">Description</label>
              <textarea
                id="about"
                className={inputClasses + " h-32 resize-none"}
                value={about}
                onChange={(e) => setAbout(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="mt-8">
          <button
            type="submit"
            className="w-full text-green-600 border border-green-600 px-4 py-2 rounded-md hover:bg-green-600 hover:text-white transition-all duration-300"
            onClick={handleSave}
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default AccountSettings;
