import Image from "next/image";
import React, { ReactNode } from "react";

const Heading = ({
  text,
  image,
  icon,span,
  dark = false,children
}: {
  text: string;
  image?: string;
  icon?: React.ReactNode;
  dark?: boolean;
  span?:string,children?:ReactNode
}) => {
  return (
    <div className="flex  z-10 items-center justify-between">
      <div className="flex items-center gap-3 mb-3">
        <h2 className={`${dark ? " text-gray-800" : " text-white"} flex items-center capitalize font-semibold text-xl md:text-4xl`}>
          {text}
          {span&&<h5 className=" ml-3  text-pink-400">{span}</h5>}
      {children}
        </h2>
        {image && <Image width={40} height={40} src={image} alt="" />}
      </div>
      {icon && icon}
    </div>
  );
};

export default Heading;
