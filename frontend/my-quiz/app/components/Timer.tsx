import React from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const Timer = ({ value }: { value: number }) => {
  const mins = Math.floor(value / 60);
  const secs = value % 60;
  return (
    <div className=" absolute left-[47%] z-10  top-10 " style={{ width: 70, height: 70 }}>
      <CircularProgressbar value={value} text={`${mins < 10 && 0}${mins}:${(secs < 10 && 0) || ""}${secs}`} />
    </div>
  );
};

export default Timer;
