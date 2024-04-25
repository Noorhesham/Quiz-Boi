import Image from "next/image";
import React from "react";

const Hint = ({ text }: { text: string }) => {
  return (
    <div className="flex items-center flex-col">
      <Image width={250} height={250} src={`/6900_3_09-ai.png`} alt={text} />
      <p className=" text-gray-600 font-lg">{text}</p>
    </div>
  );
};

export default Hint;
