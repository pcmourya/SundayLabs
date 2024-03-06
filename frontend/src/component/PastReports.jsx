import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const PastReports = () => {
  const [reports, setReports] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get('http://localhost:4040/crops')
      .then((response) => {
        console.log({ response });
        setReports(response.data);
      })
      .catch((error) => {
        console.error('Error fetching reports:', error);
      });
  }, []);

  const convertFileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        // Resolve with the base64 string
        resolve(reader.result.split(',')[1]);
      };
      reader.onerror = (error) => reject(error);
    });
  };

  const openPdfInNewTab = async (pdfUrl) => {
    const response = await fetch(pdfUrl);
    const blob = await response.blob();
    const base64Data = await convertFileToBase64(blob);
    const base64Url = `data:application/pdf;filename=generated.pdf;base64,${base64Data}`;
    window.open(base64Url, '_blank');
  };

  return (
    <div className="div">
      <div className="div-2 relative flex justify-center">
        <div
          className="cursor-pointer absolute left-[80px]"
          onClick={() => navigate('/')}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
            />
          </svg>
        </div>
        <div className="flex gap-3 items-center justify-center ">
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/5f37e033c3626b4f2466b6b8712ab8cfb571c6fa97bd75770791c22c68cfccc0?"
            className="img"
          />
          <div className="div-3">Your Reports</div>
        </div>
      </div>
      <div className="flex flex-col w-full max-w-[1064px] justify-between mt-[50px] gap-[20px] p-l">
        {reports.map((report) => (
          <>
            <div className="flex w-full justify-between gap-2xl p-[16px] bg-white rounded-2xl items-center">
              <div className="div-5 ">
                <div className="div-6" />
                <div className="div-7">{report.crop}</div>
                {/* <div className="div-8">19 Aug 2000</div> */}
              </div>
              <div
                className="div-9 flex items-center justify-center cursor-pointer"
                onClick={() =>
                  openPdfInNewTab(
                    `http://localhost:4040/files/${report.report}`,
                  )
                }
              >
                <div className="div-10">View Report</div>
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/ba8e8c8b8937ae7bf75cba711497599024a5eee6e8ecaa9915768cf0af1f8e48?"
                  className="img-2"
                />
              </div>
            </div>
          </>
        ))}
      </div>
    </div>
  );
};

export default PastReports;
