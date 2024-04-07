import React from "react";
import { FaTrash } from "react-icons/fa";
import { Input } from "@/components/ui/input";

const AnswerBox = ({
  index,
  setCorrect,
  correct,
  answers,
  error,
  register,
  handleDeleteAnswer,
}: {
  index: number;
  error: any;
  answers: string[];
  register: any;
  setCorrect(i: number): void;
  correct: boolean;
  handleDeleteAnswer: any;
}) => {
  return (
    <div className=" flex-col items-center">
      <div className="relative flex items-center  self-stretch">
        <div className="inline-flex items-center">
          <input
            className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-full border border-blue-gray-200  transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-8 before:w-8 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-gray-900 checked:before:bg-gray-900 hover:before:opacity-10"
            onChange={() => setCorrect(index)}
            checked={correct}
            type="radio"
            name=""
            id=""
          />
          <span className="absolute text-green-400 transition-opacity opacity-0 pointer-events-none top-2/4 left-[.60em] -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 16 16" fill="currentColor">
              <circle data-name="ellipse" cx="8" cy="8" r="8"></circle>
            </svg>
          </span>
        </div>
        <Input
          className="md:py-3 md:px-1 rounded-lg text-black"
          {...register(`answers.${index}`)}
          placeholder="Answer"
          type="text"
        />
        {answers.length > 2 && (
          <FaTrash
            onClick={() => handleDeleteAnswer(index)}
            className="text-red-600 absolute right-3  cursor-pointer hover:text-red-400 duration-150"
          />
        )}
      </div>
      {error && <span className="text-red-500 absolute text-xs">{error}</span>}
    </div>
  );
};

export default AnswerBox;
