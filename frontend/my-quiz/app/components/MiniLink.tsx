import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const MiniLink = ({ text, onClick, href }: { text: string; onClick?: () => void; href?: string }) => {
  const pathName=usePathname()
  const isActive=href&&pathName.startsWith(href)
  return href ? (
    <div className=" font-normal hover:text-gray-500 cursor-pointer  duration-150 text-gray-800 py-2 px-4">
      <Link className={`${isActive&&"text-fuchsia-500 "}`} href={href}>{text}</Link>
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
