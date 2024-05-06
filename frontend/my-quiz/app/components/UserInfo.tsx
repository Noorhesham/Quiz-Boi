import React from "react";
import User from "./User";
import { UserProps } from "@/types";
import Follow from "./Follow";
import { HoverCardContent } from "@radix-ui/react-hover-card";

const UserInfro = ({ author }: { author: UserProps }) => {
  return (
    <HoverCardContent className="w-80 relative py-2 px-4 z-50 rounded-3xl shadow-lg bg-gray-100 flex flex-col">
      <div className="flex flex-col z-50  relative  justify-between space-x-4">
        <User author={author}>{<Follow id={author._id} />}</User>
        <div className="space-y-1">
          <div className="flex items-center pt-2">
            <span className="text-xs text-muted-foreground">Follow To Be up to date </span>
          </div>
        </div>
      </div>
    </HoverCardContent>
  );
};

export default UserInfro;
