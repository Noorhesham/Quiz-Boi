import Image from "next/image";
import Link from "next/link";
import React from "react";

const Logo = () => {
  return (
    <Link href={'/'}>
      <h2 className="relative flex items-center font-sans text-gray-800 w-fit text-5xl font-semibold">
        Quiz <span className=" text-red-500"> Boi</span>
        <img className="w-[6rem]" src="/logo.png" alt="" />
      </h2>
    </Link>
  );
};

export default Logo;
