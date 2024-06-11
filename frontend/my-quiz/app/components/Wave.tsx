import React from "react";

const Wave = () => {
  return (
    <>
      <div className="wave lg:wave-1 " style={{ animationDelay: ".3s" }}></div>
      <div className="wave lg:wave-2 " style={{ animationDelay: "2s" }}></div>
      <div className="wave lg:wave-3 " style={{ animationDelay: "3s" }}></div>
      <div className="wave lg:wave-4 " style={{ animationDelay: "4s" }}></div>
    </>
  );
};

export default Wave;
