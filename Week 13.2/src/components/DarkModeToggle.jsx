import React from "react";

const DarkModeToggle = ({ isDarkMode, onToggle, size = "medium" }) => {
  const sizes = {
    small: "w-10 h-5",
    medium: "w-14 h-8",
    large: "w-20 h-10",
  };

  const circleSizes = {
    small: "w-4 h-4",
    medium: "w-6 h-6",
    large: "w-8 h-8",
  };

  return (
    <label className="relative inline-flex items-center cursor-pointer">
      <input
        type="checkbox"
        checked={isDarkMode}
        onChange={onToggle}
        className="sr-only peer"
      />
      <div
        className={`${sizes[size]} bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-300 dark:bg-gray-700 rounded-full peer dark:peer-checked:bg-blue-500 transition-colors duration-300`}
      ></div>
      <div
        className={`absolute top-0.5 left-0.5 ${circleSizes[size]} bg-white rounded-full peer-checked:translate-x-full peer-checked:bg-blue-500 transition-transform duration-300`}
      ></div>
    </label>
  );
};

export default DarkModeToggle;
