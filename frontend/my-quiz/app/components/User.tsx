import { UserProps } from "@/types";
import Link from "next/link";
import React, { ReactNode } from "react";
import { FcApproval } from "react-icons/fc";

const User = ({ author, children }: { author: UserProps; children?: ReactNode }) => {
  return (
    <>
      <div className="flex justify-between flex-wrap gap-2 items-center">
        <div className="flex items-center">
            <img src={author?.photo} className="w-[2rem] h-[2rem] rounded-full" />
          <Link className="flex justify-between items-center" href={`/user/${author._id}`}>
            <h6 className=" font-normal text-nowrap text-sm text-gray-800 py-1 px-2">{author.name}</h6>
            <FcApproval />
          </Link>
        </div>
        {children}
      </div>
    </>
  );
};

export default User;
