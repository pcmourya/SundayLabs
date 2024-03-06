/* eslint-disable react/prop-types */
import { useState } from 'react';

const CropSelection = ({ crops, onSelect }) => {
  const [selectedCrop, setSelectedCrop] = useState('');

  const handleCropChange = (event) => {
    setSelectedCrop(event.target.value);
    onSelect(event.target.value);
  };

  return (
    <div className="flex justify-center align-center mt-4">
      <h2 className="text-3xl font-bold underline">Select Crop:</h2>
      <select
        value={selectedCrop}
        className="cursor-pointer text-xl border-black rounded"
        onChange={handleCropChange}
      >
        <option value="" className="cursor-pointer border-black text-xl">
          Select Crop
        </option>
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
