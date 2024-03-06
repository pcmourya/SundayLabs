import React, { useState } from 'react';
import Webcam from 'react-webcam';
import '../App.css';

// eslint-disable-next-line react/prop-types
const ImageCapture = ({ onCapture }) => {
  const [imageSrc, setImageSrc] = useState(null);
  const webcamRef = React.useRef(null);

  const capture = React.useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImageSrc(imageSrc);
    onCapture(imageSrc);
    // Disable camera after capturing
    webcamRef.current.stream.getTracks().forEach((track) => {
      track.stop();
    });
  }, [webcamRef, onCapture]);

  return (
    <div className="flex flex-col mt-10 justify-center">
      {imageSrc ? (
        <img
          className="justify-center img"
          src={imageSrc}
          height={200}
          width={300}
          alt="Captured"
        />
      ) : (
        <>
          <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            width={300}
            height={400}
            className="ml-auto mr-auto rounded-lg"
          />
          {/* onClick={capture} */}
          <button
            type="button"
            onClick={capture}
            className="text-gray-900 hover:text-white border border-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800 button"
          >
            Capture
          </button>
        </>
      )}
    </div>
  );
};

export default ImageCapture;
