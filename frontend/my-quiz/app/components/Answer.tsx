import React from "react";
import { useQuiz } from "../context/QuizContext";

const Answer = ({
  answer,
  setAnswer,
  i,
  id,
  text,
}: {
  answer?: { answer: number | undefined; id: string } | undefined;
  setAnswer?: any;
  i: number;
  id?: string | undefined;
  text: string;
}) => {
  const {answers}=useQuiz()
  return (
    <div
      onClick={() => {
        if(!setAnswer) return
        setAnswer({ answer: i, id });
      }}
      className={`${
        (answer?.answer===i) ? "bg-red-400 text-gray-100" : "bg-white text-gray-800"
      } py-2 px-4 flex items-center gap-2 group w-full hover:text-gray-100 hover:bg-red-400 duration-200 cursor-pointer font-semibold  rounded-lg`}
    >
      <div
        className={`${
          answer?.answer === i ? " text-gray-100" : " text-red-400"
        }  border-r-2  group-hover:text-gray-100 border-gray-300 font-semibold p-2`}
      >
        {i + 1}
      </div>
      {text}
    </div>
  );
};

export default Answer;
