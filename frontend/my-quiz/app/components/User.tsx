import { UserProps } from "@/types";
import Link from "next/link";
import React, { ReactNode } from "react";

const User = ({ author, children }: { author: UserProps; children?: ReactNode }) => {
  return (
    <>
      <div className="flex justify-between items-center">
        <div className="flex items-center">
            <img src={author?.photo} className="w-[2rem] h-[2rem] rounded-full" />
          <Link href={`/user/${author._id}`}>
            <h6 className=" font-normal text-sm text-gray-800 py-1 px-2">{author.name}</h6>
          </Link>
        </div>
        {children}
      </div>
    </>
  );
};

export default User;
