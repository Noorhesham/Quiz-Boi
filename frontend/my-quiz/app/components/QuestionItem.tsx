import { Button } from "@/components/ui/button";
import { QuestionProps } from "@/types";
import React, { useState } from "react";
import { useQuiz } from "../context/QuizContext";
import DialogCustom from "./DialogCustom";
import { useColor } from "../context/ColorContext";
import ConfirmQuizSolve from "./ConfirmQuizSolve";

const QuestionItem = ({ question, len }: { question: QuestionProps; len: number }) => {
  const [answer, setAnswer] = useState<{ answer: number; id: string }>();
  const { color } = useColor();
  const { handleNext, questionIndex, handleQuizEnd, answers, setSubmitting } = useQuiz();
  return (
    <div className={`flex flex-col gap-2 w-full  lg:w-[80%] rounded-lg py-5 px-10`}>
      {question.coverImage && <img src={question.coverImage} className="w-[20rem]" />}
      <div className="  py-10 px-20 relative border-gray-300 border-2 rounded-md">
        <h2 className=" text-2xl text-left text-gray-800 font-semibold">{question.question}</h2>
      </div>
      <div className="grid grid-cols-1 w-full p-3 gap-4 ">
        {question.answers.map((answer, i) => (
          <div
            onClick={() => {
              setAnswer({ answer: i, id: question._id });
            }}
            className=" py-2 px-4 flex items-center gap-2 text-gray-100 hover:bg-red-500 duration-200 cursor-pointer font-semibold  bg-red-400 rounded-full "
          >
            <span className="  border-r-2  border-gray-300 font-semibold p-2">{i + 1}</span>
            {answer}
          </div>
        ))}
      </div>
      {questionIndex + 1 < len ? (
        <div className="flex  items-center">
          <Button
            size="lg"
            className={` rounded-full self-center my-4 w-[70%] py-5 ${color} text-white`}
            //@ts-ignore
            onClick={() => answer?.answer >= 0 && handleNext(answer, len)}
          >
            Next
          </Button>
          <Button
            size="lg"
            className={` rounded-full self-center my-4 w-[70%] py-5 ${color} text-white`}
            //@ts-ignore
            onClick={() => handleQuizEnd()}
          >
            End Quiz
          </Button>
        </div>
      ) : (
        <DialogCustom
          content={<ConfirmQuizSolve values={answers} />}
          btn={
            <Button
              onClick={() => setSubmitting((s: boolean) => !s)}
              size="lg"
              className={`rounded-full self-center my-4 w-[70%] py-5  ${color} text-white`}
            >
              Submit
            </Button>
          }
        />
      )}
    </div>
  );
};

export default QuestionItem;
