import Link from "next/link";
import React from "react";

const MiniLogo = () => {
  return (
    <Link href={"/"}>
      <h2 className={`relative flex items-center font-sans text-gray-200 w-fit text-base md:text-3xl  font-semibold`}>
        Quiz <span className=" text-red-200"> Boi</span>
        <img className={` w-[2rem] md:w-[4rem]`} src="/logo.png" alt="" />
      </h2>
    </Link>
  );
};

export default MiniLogo;
