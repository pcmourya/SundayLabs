import { useState, useEffect } from 'react';
import axios from 'axios';
import pdfIcon from '../pdfIcon.png';

const PastReports = () => {
  const [reports, setReports] = useState([]);

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

  const pdfFile = async (pdf) => {
    const pdfData = await fetch('http://localhost:4040/files/${report.report}');
    console.log({ pdfData });
    const base64Data = btoa(
      String.fromCharCode.apply(null, new Uint8Array(pdf)),
    );
    console.log({ base64Data });

    return `data:application/pdf;base64,${base64Data}`;
  };

  console.log({ reports });

  return (
    <div>
      <h2>Past Reports:</h2>
      <ul className="flex flex-grow-3 flex-wrap ">
        {reports?.map((report) => (
          <li key={report.id} className="flex flex-grow-0 ">
            <div className="h-50 w-50 justify-center flex flex-col mt-3 ml-3 ">
              <a
                // href={`localhost:4040/files/${report.report}`}
                href={pdfFile(report.report)}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src={pdfIcon}
                  alt="Captured"
                  style={{ width: '100px', height: '130px' }}
                />
              </a>
              <p>{report.crop}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PastReports;
