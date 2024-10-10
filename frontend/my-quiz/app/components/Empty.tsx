import Image from "next/image";
import Link from "next/link";
import React, { ReactNode } from "react";

export const Empty = ({
  text,
  image,
  children,
  link,
  linkText,color
}: {
  text: string;
  image?: string;
  children?: ReactNode;
  link?: string;
  linkText?: string;color?:string
}) => {
  return (
    <div className=" flex m-auto col-span-3  mx-auto   w-full  items-center justify-center p-10 flex-col">
      <h1 className={`${color?color:" text-gray-100 "} capitalize  text-xl md:text-3xl font-semibold`}>{text}</h1>
      <Image width={300} height={300} src={image ? image : "/play2.png"} alt="asking" />
      {children}
      {link && (
        <Link
          className="text-xl text-[300] leading-[1.5rem] underline hover:text-pink-600 duration-200  text-pink-300"
          href={link}
        >
          {linkText}
        </Link>
      )}
    </div>
  );
};
