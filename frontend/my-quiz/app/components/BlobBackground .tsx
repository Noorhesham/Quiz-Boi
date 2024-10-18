import React from "react";

const BlobBackground = ({ percentage }: { percentage?: any }) => {
  return <div className="blob left-[35%] -translate-x-1/2 top-10 z-[1]">{/* <div className="blob-content">{percentage}</div> */}</div>;
};

export default BlobBackground;
