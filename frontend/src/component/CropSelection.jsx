/* eslint-disable react/prop-types */
import { useState } from 'react';

const CropSelection = ({ crops, onSelect }) => {
  const [selectedCrop, setSelectedCrop] = useState('');

  const handleCropChange = (event) => {
    setSelectedCrop(event.target.value);
    onSelect(event.target.value);
  };

  return (
    <div className="flex justify-center flex-col align-center crop-container">
      <h2 className="block  mb-4 welcomeText">Welcome to crop analyses</h2>
      <select
        value={selectedCrop}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-50"
        onChange={handleCropChange}
      >
        <option selected>Select a crop to analyse</option>
        {crops.map((crop, index) => (
          <option key={index} value={crop}>
            {crop}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CropSelection;
