import React, { useState } from 'react';
import Webcam from 'react-webcam';
import '../App.css';
import { useNavigate } from 'react-router-dom';
// eslint-disable-next-line react/prop-types
const ImageCapture = ({ onCapture }) => {
  const [imageSrc, setImageSrc] = useState(null);
  const webcamRef = React.useRef(null);
  const navigate = useNavigate();

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
          className="justify-center img rounded"
          src={imageSrc}
          height={200}
          width={300}
          alt="Captured"
        />
      ) : (
        <Webcam
          audio={false}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          width={300}
          height={400}
          className="ml-auto mr-auto rounded-lg"
        />
      )}

      {/* onClick={capture} */}
      <div className="flex align-middle justify-center mt-8 flex-wrap">
        {!imageSrc && (
          <button
            type="button"
            onClick={capture}
            className="text-gray-900 hover:text-white border border-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 w-60  dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800 button"
          >
            Take a picture
          </button>
        )}
        <button
          type="button"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 w-60"
          onClick={() => navigate('/reports')}
        >
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6 4V8H18V4H20.007C20.555 4 21 4.445 21 4.993V21.007C20.9997 21.2703 20.895 21.5227 20.7089 21.7089C20.5227 21.895 20.2703 21.9997 20.007 22H3.993C3.72964 22 3.47707 21.8954 3.29084 21.7092C3.10462 21.5229 3 21.2704 3 21.007V4.993C3 4.445 3.445 4 3.993 4H6ZM9 17H7V19H9V17ZM9 14H7V16H9V14ZM9 11H7V13H9V11ZM16 2V6H8V2H16Z"
              fill="#5964E0"
            />
          </svg>
          <span className="ml-10">View Past Report</span>
        </button>
      </div>
    </div>
  );
};

export default ImageCapture;
