import { Document, Page, Image, View } from '@react-pdf/renderer';

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
            <p className="text-xl mt-4 mb-4">Generated Result</p>
            <a href={report} target="_blank" rel="noopener noreferrer">
              <img
                src={capturedImage}
                alt="Captured"
                style={{ width: '200px', height: '200px' }}
                className="rounded"
              />
            </a>
            <p className="text-md mt-3">{crop}</p>
          </div>
        </div>
      ) : (
        <div>Please select an image</div>
      )}
      {<>{report && renderPdf()}</>}
    </>
  );
};

export default ReportDisplay;
