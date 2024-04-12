import Image from "next/image";
import React, { ReactNode } from "react";

export const Empty = ({ text, image, children }: { text: string; image?: string; children?: ReactNode }) => {
  return (
    <div className=" flex  items-center justify-center p-10 flex-col">
      <h1 className=" text-gray-800 text-xl md:text-3xl font-semibold">{text}</h1>
      <Image width={300} height={300} src={image ? image : "/play2.png"} alt="asking" />
      {children}
    </div>
  );
};
