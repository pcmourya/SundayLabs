import { useState } from 'react';
import CropSelection from './component/CropSelection';
import ImageCapture from './component/ImageCapture';
import PastReports from './component/PastReports';
import LoadingAnimation from './component/LoadingAnimation';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ReportDisplay from './component/ReportDisplay';
import jsPDF from 'jspdf';

const crops = ['Rice', 'Wheet', 'Corn', 'Chickpea']; // Sample crop list

const Home = () => {
  const [selectedCrop, setSelectedCrop] = useState('');
  const [capturedImage, setCapturedImage] = useState('');
  const [loading, setLoading] = useState(false);
  const [report, setReport] = useState('');

  const handleCropSelect = (crop) => {
    setSelectedCrop(crop);
  };

  const generatePDFDataURI = (imageData) => {
    // Create a new jsPDF instance
    const pdf = new jsPDF();

    // Add image data to the PDF
    pdf.addImage(imageData, 'JPEG', 10, 10); // Adjust position and dimensions as needed

    // Output the PDF as data URI
    const pdfDataURI = pdf.output('datauristring');

    return pdfDataURI;
  };

  const generatePDFDataBinary = (imageSrc) => {
    // Create a new jsPDF instance
    const pdf = new jsPDF();

    // Add image data to the PDF
    pdf.addImage(imageSrc, 'JPEG', 10, 10); // Adjust position and dimensions as needed

    // Output the PDF as data URI
    const pdfBinary = pdf.output('arraybuffer');

    return pdfBinary;
  };

  const handleSubmit = async (imageSrc) => {
    const formData = new FormData();
    const pdf = new Blob([imageSrc], { type: 'application/pdf' });
    formData.append('cropImage', pdf);
    formData.append('crop', selectedCrop);

    try {
      const response = await fetch('http://localhost:4040/crop', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        console.log('Image uploaded successfully');
      } else {
        console.error('Failed to upload image');
      }
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  const handleImageCapture = (imageSrc) => {
    console.log({ imageSrc });
    if (imageSrc) {
      setCapturedImage(imageSrc);
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
      }, 1000);
      // Send image to backend for processing
      const pdfData = generatePDFDataURI(imageSrc);
      const pdfBinaryData = generatePDFDataBinary(imageSrc);
      handleSubmit(pdfBinaryData);
      setReport(pdfData);
    }
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <div className="main-container">
              <CropSelection crops={crops} onSelect={handleCropSelect} />
              <ImageCapture onCapture={handleImageCapture} />
              {selectedCrop && (
                <>
                  {loading ? (
                    <LoadingAnimation />
                  ) : (
                    capturedImage && (
                      <ReportDisplay
                        report={report}
                        capturedImage={capturedImage}
                        crop={selectedCrop}
                      />
                    )
                  )}
                </>
              )}
            </div>
          }
        ></Route>
        <Route
          path="/reports"
          element={
            <>
              <PastReports />
            </>
          }
        />
      </Routes>
    </Router>
  );
};

export default Home;
