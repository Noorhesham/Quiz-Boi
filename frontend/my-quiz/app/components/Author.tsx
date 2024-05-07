import { QuizProps, UserProps } from "@/types";
import React from "react";
import Like from "./Like";
import { MdQuiz } from "react-icons/md";
import User from "./User";
import UserInfro from "./UserInfo";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@radix-ui/react-hover-card";
import { createPortal } from "react-dom";

const Author = ({ author, quiz,hover=true }: { author: UserProps; quiz: QuizProps,hover?:boolean }) => {
  console.log(author)
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
       <div className="flex self-end mt-auto relative items-center justify-between w-full gap-2">
          <User author={author} />
          <div className="flex items-center p-2 gap-2">
            <Like count={quiz.likes?.length} id={quiz._id} />
            <div className="flex items-center">
              <MdQuiz className=" cursor-pointer text-gray-400 hover:text-blue-500 duration-200" />
              <div>{quiz.usersAttempted?.length}</div>
            </div>
          </div>
        </div>
      </HoverCardTrigger>
      {hover&&
      createPortal( <UserInfro author={author} />,document.body)
     }
    </HoverCard>
  );
};

export default Author;
