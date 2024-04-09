import { QuizProps, UserProps } from "@/types";
import React from "react";
import Like from "./Like";
import { MdQuiz } from "react-icons/md";
import User from "./User";
import UserInfro from "./UserInfo";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@radix-ui/react-hover-card";

const Author = ({ author, quiz,hover=true }: { author: UserProps; quiz: QuizProps,hover?:boolean }) => {
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
       <div className="flex relative items-center justify-between w-full gap-2">
          <User author={author} />
          <div className="flex items-center p-2 gap-2">
            <Like count={quiz.likes?.length} id={quiz._id} />
            <div className="flex items-center">
              <MdQuiz className=" cursor-pointer text-gray-400 hover:text-blue-500 duration-200" />
              <div>{quiz.usersAttempted.length}</div>
            </div>
          </div>
        </div>
      </HoverCardTrigger>
      {hover&&<HoverCardContent className="w-80">
        <UserInfro author={author} />
      </HoverCardContent>}
    </HoverCard>
  );
};

export default Author;
