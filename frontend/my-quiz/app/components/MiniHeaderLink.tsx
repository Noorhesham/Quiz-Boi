import React from "react";

const MiniHeaderLink = ({ text }: { text: string }) => {
  return <h4 className=" hover:underline cursor-pointer hover:text-gray-400 duration-300">{text}</h4>;
};

export default MiniHeaderLink;
