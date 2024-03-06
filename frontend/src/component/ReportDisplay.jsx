import { Document, Page, Image, View } from '@react-pdf/renderer';
import PastReports from './PastReports';

// eslint-disable-next-line react/prop-types
const ReportDisplay = ({ report, capturedImage, crop }) => {
  const renderPdf = () => {
    if (!report) {
      return <div>Please select an image</div>;
    }

    return (
      <Document>
        <Page size="A4">
          <View>
            <Image src={report} />
          </View>
        </Page>
      </Document>
    );
  };

  return (
    <>
      {report ? (
        <div className="flex flex-grow-0 justify-center">
          <div className="h-50 w-50 justify-center flex flex-col ">
            <p>Generated Result</p>
            <a href={report} target="_blank" rel="noopener noreferrer">
              <img
                src={capturedImage}
                alt="Captured"
                style={{ width: '200px', height: '200px' }}
              />
            </a>
            <p>{crop}</p>
          </div>
        </div>
      ) : (
        <div>Please select an image</div>
      )}
      {
        <>
          {report && renderPdf()}
          <PastReports />
        </>
      }
    </>
  );
};

export default ReportDisplay;
