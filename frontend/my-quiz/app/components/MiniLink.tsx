import Link from "next/link";
import React from "react";

const MiniLink = ({ text, onClick, href }: { text: string; onClick?: () => void; href?: string }) => {
  return href ? (
    <div className=" font-normal hover:text-gray-500 cursor-pointer  duration-150 text-gray-800 py-2 px-4">
      <Link href={href}>{text}</Link>
    </div>
  ) : (
    <div
      className=" font-normal hover:text-gray-500 cursor-pointer  duration-150 text-gray-800 py-2 px-4"
      onClick={onClick}
    >
      {text}
    </div>
  );
};

export default MiniLink;
