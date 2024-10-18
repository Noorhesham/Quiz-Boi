import React from "react";

const Answer = ({
  answer,
  setAnswer,
  active,
  i,
  id,
  text,
  duration,
}: {
  answer?: { answer: number | undefined; id: string } | undefined;
  setAnswer?: any;
  active: boolean;
  i: number;
  id?: string | undefined;
  text: string;
  duration?: number;
}) => {
  return (
    <div
      onClick={() => {
        if (!setAnswer) return;
        setAnswer({ answer: i, id, duration });
      }}
      className={`${
        answer?.answer === i
          ? "bg-blue-400 text-gray-100"
          : active
          ? "bg-pink-200 text-gray-800"
          : "bg-white text-gray-800"
      } py-2 px-2 md:px-4 flex items-center gap-2 group w-full hover:text-gray-100 hover:bg-blue-400 duration-200 cursor-pointer font-semibold  rounded-lg`}
    >
      <div
        className={`${
          answer?.answer === i || active ? " text-gray-100" : " text-red-400"
        }  border-r-2  group-hover:text-gray-100 border-gray-300 font-semibold p-2`}
      >
        {i + 1}
      </div>
      {text}
    </div>
  );
};

export default Answer;
