import { QuizProps, UserProps } from "@/types";
import React from "react";
import Like from "./Like";
import { MdQuiz } from "react-icons/md";

const Author = ({ author, quiz }: { author: UserProps; quiz:QuizProps }) => {
  return (
    <div className="flex items-center justify-between w-full gap-2">
      <div className="flex items-center">
        <img src={author.photo} className="w-[2rem] h-[2rem] rounded-full" />
        <h6 className=" font-normal text-sm text-gray-800 py-1 px-2">{author.name}</h6>
      </div>
      <div className="flex items-center p-2 gap-2">
          <Like count={quiz.likes.length} id={quiz._id} />
        <div className="flex items-center">
          <MdQuiz className=" cursor-pointer text-gray-400 hover:text-blue-500 duration-200" />
          <div>{quiz.usersAttempted.length}</div>
        </div>
      </div>
    </div>
  );
};

export default Author;
