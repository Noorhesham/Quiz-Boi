import React, { useState } from "react";
import Link from "next/link";
import { UserProps } from "@/types";
import { createPortal } from "react-dom";
import { HoverCard, HoverCardTrigger } from "@/components/ui/hover-card";
import UserInfro from "./UserInfo";
import Image from "next/image";
const TopAuthor = ({ user }: { user: UserProps }) => {
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Link className=" flex flex-col gap-2 items-center" href={`/user/${user._id}`}>
          <div className="rounded-full overflow-hidden  relative md:w-40 md:h-40 w-16 h-16">
            <Image
              fill
              key="menu-avatar"
              className="  object-cover  object-center"
              alt={`${user.name}-Avatar`}
              src={user.photo}
            />
          </div>
          <h6
            key="menu-username"
            className="text-gray-800 md:font-semibold text-wrap text-xs mx-auto text-center  md:text-xl mt-2 hover:underline duration-150"
          >
            {user.name.split(" ")[0].slice(0, 10)}
          </h6>
        </Link>
      </HoverCardTrigger>
      {createPortal(<UserInfro author={user} />, global?.document?.body)}
    </HoverCard>
  );
};

export default TopAuthor;
