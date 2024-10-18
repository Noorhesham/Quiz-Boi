import React from "react";

const AnswerResult = ({
  correct,
  i,
  text,
  yourAnswer,
}: {
  correct: number;
  i: number;
  text: string;
  yourAnswer: number|undefined;
}) => {
  return (
    <div
      className={`${
        correct === i
          ? " bg-green-500 text-gray-100"
          : yourAnswer === i && yourAnswer !== correct
          ? "bg-red-500"
          : "bg-white text-gray-800 "
      } py-2 px-4 flex items-center gap-2 group w-full  duration-200 cursor-pointer font-semibold  rounded-lg`}
    >
      <div
        className={`${
          correct === i ? " text-gray-100" : " text-red-400"
        }  border-r-2   border-gray-300 font-semibold p-2`}
      >
        {i + 1}
      </div>
      {text}
    </div>
  );
};

export default AnswerResult;
