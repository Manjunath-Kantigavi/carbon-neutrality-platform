import React from 'react';

const SelectGroup = ({ label, options, value , onChange }) => {
  return (
    <div className="mb-4">
      <label className="block text-gray-700 dark:text-gray-300 mb-2">{label}</label>
      <select
        className="w-full p-2 border border-gray-300 rounded 
        bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 
        focus:outline-none focus:ring-1 focus:ring-[#FFA500] 
        focus:border-[#FFA500] hover:border-[#FFA500]"
        value={value||""}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="" disabled>Select {label.toLowerCase()}</option>
        {options.map((option, index) => (
          <option
            key={index}
            value={option}
            className="hover:bg-[#FFA500]/10"
          >
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectGroup;
