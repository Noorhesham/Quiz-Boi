import React from "react";

const MiniHeaderLink = ({ text,span }: { text: string,span?:string }) => {
  return <h4 className=" hover:underline cursor-pointer gap-2 hover:text-gray-400 flex items-center duration-300">
    <h5 className=" font-bold">{span}</h5>
    {text}
  </h4>;
};

export default MiniHeaderLink;
