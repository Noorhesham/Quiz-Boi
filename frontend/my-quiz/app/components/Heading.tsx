import Image from "next/image";
import React, { ReactNode } from "react";

const Heading = ({
  text,
  image,
  icon,
  span,
  dark = false,
  children,className,
  paragraph,
}: {
  text: string;
  image?: string;
  icon?: React.ReactNode;
  paragraph?: string;
  dark?: boolean;
  span?: string;className?:string
  children?: ReactNode;
}) => {
  return (
    <div className={`flex flex-col gap-1 mb-2 ${className||""}`}>
      <div className="flex max-w-[50rem]  z-10 items-center justify-between">
        <div className="flex items-center gap-3 mb-2 md:mb-3">
          <h2
            className={`${
              dark ? " text-gray-800" : " text-white"
            } flex items-center  capitalize font-semibold text-xl md:text-4xl`}
          >
            {text}
            {span && <div className=" ml-3  text-pink-400">{span}</div>}
            {children}
          </h2>
          {image && <Image width={40} height={40} src={image} alt="" />}
        </div>
        {icon && icon}
      </div>
      {paragraph && <p className=" text-base md:text-xl text-[300] leading-[1.5rem]  text-gray-100">{paragraph}</p>}
    </div>
  );
};

export default Heading;
