import React from "react";

const MiniHeaderLink = ({ text, span }: { text: string; span?: string }) => {
  return (
    <div className=" capitalize order-2 md:text-nowrap text-center mx-auto text-sm md:text-base  hover:underline cursor-pointer md:gap-2 hover:text-gray-400 flex-col  md:flex-row flex items-center duration-300">
      <h5 className=" font-bold">{span}</h5>
      {text}
    </div>
  );
};

export default MiniHeaderLink;
