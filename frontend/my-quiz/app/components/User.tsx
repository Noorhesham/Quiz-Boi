"use client";
import { UserProps } from "@/types";
import Link from "next/link";
import React, { ReactNode, useState } from "react";
import { FcApproval } from "react-icons/fc";

const User = ({
  author,
  children,
  isLogged = true,
  className,
  size,small=false
}: {
  author: UserProps;
  children?: ReactNode;
  isLogged?: boolean;small?:boolean
  className?: string;size?:string
}) => {
  const [randomAvatarIndex, setRandomAvatarIndex] = useState<number>(Math.trunc(Math.random() * 8) + 1);
  return (
    <>
      <div className="flex justify-between flex-wrap gap-2 items-center">
        <div className={`flex items-center ${className || "text-gray-800 text-sm"}`}>
          <img src={author?.photo || `/avatar${randomAvatarIndex}.jpg`} className={`${size||"w-[2rem] h-[2rem]"} rounded-full`} />
          {isLogged ? (
            <Link className="flex justify-between items-center" href={`/user/${author._id}`}>
              <h6 className=" font-normal text-nowrap   py-1 px-2">{!small?author.name:author.name.split(' ')[0]}</h6>
              <FcApproval />
            </Link>
          ) : (
            <h6 className=" font-normal text-nowrap  py-1 px-2">{!small?author.username:author?.username?.split(' ')[0]}</h6>
          )}
        </div>
        {children}
      </div>
    </>
  );
};

export default User;
