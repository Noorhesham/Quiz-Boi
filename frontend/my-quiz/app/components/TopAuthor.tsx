import React, { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { UserProps } from "@/types";
import { createPortal } from "react-dom";
import { HoverCard, HoverCardTrigger } from "@radix-ui/react-hover-card";
import UserInfro from "./UserInfo";
const TopAuthor = ({ user }: { user: UserProps }) => {

  return (
    <HoverCard>
    <HoverCardTrigger asChild>
      <Link
        className=" flex flex-col gap-2 items-center"
        href={`/user/${user._id}`}
      >
        <div className="rounded-full  md:w-[13rem] md:h-[13rem] w-16 h-16">
          <motion.img
            key="menu-avatar"
            className=" h-full w-full  object-cover rounded-full object-center"
            alt={`${user.name}-Avatar`}
            src={user.photo}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          />
        </div>
        <motion.h6
          key="menu-username"
          className="text-gray-800 md:font-semibold text-wrap text-xs mx-auto text-center  md:text-xl mt-2 hover:underline duration-150"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {user.name.split(' ')[0].slice(0,10)}
        </motion.h6>
      </Link>
      </HoverCardTrigger>
      {createPortal(<UserInfro author={user} />, document?.body)}
      </HoverCard>
  );
};

export default TopAuthor;
