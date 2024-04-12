import React from "react";

const Order = ({ index }: { index: number }) => {
  return (
    <span className=" py-2 px-2 text-center hidden md:block md:w-10 md:h-10 font-semibold bg-red-200 rounded-lg text-black">
      {index}
    </span>
  );
};

export default Order;
