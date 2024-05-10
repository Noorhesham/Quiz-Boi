"use client"
import { QuizProps, UserProps } from "@/types";
import React from "react";
import Like from "./Like";
import User from "./User";
import UserInfro from "./UserInfo";
import { HoverCard, HoverCardTrigger } from "@radix-ui/react-hover-card";
import { createPortal } from "react-dom";
import { FcConferenceCall, FcQuestions } from "react-icons/fc";
import ToolTip from "./ToolTip";

const Author = ({ author, quiz, hover = true }: { author: UserProps; quiz?: QuizProps; hover?: boolean }) => {
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <div className="flex self-end flex-wrap mt-auto relative items-center justify-between w-full md:gap-2">
          <User author={author} />
         {quiz&& <div className="flex items-center p-2 ml-auto gap-2">
            <Like count={quiz.likesCount} id={quiz._id} />
            <ToolTip
              trigger={
                <div className="flex items-center">
                <FcQuestions className=" cursor-pointer duration-200" />
                <div>{quiz.questionNum}</div>
              </div>
              }
              content={<p>Number of Questions</p>}
            />
            <ToolTip
              trigger={
                <div className="flex items-center">
                  <FcConferenceCall className=" cursor-pointer duration-200" />
                  <div>{quiz.attemptsNum}</div>
                </div>
              }
              content={<p>Number of Players</p>}
            />
           
          </div>}
        </div>
      </HoverCardTrigger>
      {hover && createPortal(<UserInfro author={author} />, document?.body)}
    </HoverCard>
  );
};

export default Author;
