import { IMAGE_URL } from "@/constants";
import { QuizProps } from "@/types";
import React from "react";
import Author from "./Author";

const QuizCard = ({ quiz }: { quiz: QuizProps }) => {
  console.log(quiz);
  return (
    <div className=" md:w-[20rem] rounded-md bg-white items-start flex flex-col">
      <img
        className=" rounded-md object-contain w-full h-full"
        src={`${IMAGE_URL}quizzes/${quiz.coverImage}` || "/quiz3.png"}
        alt={quiz.title}
      />
      <div className=" py-3 px-2 w-full">
        <div className=" flex py-2 px-4 text-gray-800 justify-between items-center">
          <h6>{quiz.title}</h6>
          <div>
            <span className=" self-end text-sm">Duration:{quiz.duration}</span>
            {/* <span>{quiz.questions.length}</span> */}
          </div>
        </div>
        <Author quiz={quiz}  author={quiz.author} />
      </div>
    </div>
  );
};

export default QuizCard;
