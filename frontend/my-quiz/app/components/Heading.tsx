import Image from "next/image";
import React from "react";

const Heading = ({
  text,
  image,
  icon,
  dark = false,
}: {
  text: string;
  image?: string;
  icon?: React.ReactNode;
  dark?: boolean;
}) => {
  return (
    <div className="flex  z-10 items-center justify-between">
      <div className="flex items-center gap-3 mb-3">
        <h2 className={`${dark ? " text-gray-800" : " text-white"} capitalize font-semibold text-4xl`}>{text}</h2>
        {image && <Image width={35} height={35} src={image} alt="" />}
      </div>
      {icon && icon}
    </div>
  );
};

export default Heading;
