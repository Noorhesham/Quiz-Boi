import React from "react";
import { FcLineChart } from "react-icons/fc";

const Points = ({ points, className }: { points: number; className?: string }) => {
  return (
    <div className={` text-sm text-nowrap flex items-center gap-1 font-semibold ${className || "text-gray-600"}`}>
      <FcLineChart />
      Scored : {points}
    </div>
  );
};

export default Points;
