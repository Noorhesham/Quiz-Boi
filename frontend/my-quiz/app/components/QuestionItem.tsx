import { Button } from "@/components/ui/button";
import { QuestionProps } from "@/types";
import React, { useState } from "react";
import { useQuiz } from "../context/QuizContext";
import DialogCustom from "./DialogCustom";
import { useColor } from "../context/ColorContext";
import ConfirmQuizSolve from "./ConfirmQuizSolve";
import Answer from "./Answer";
import Hint from "./Hint";

const QuestionItem = ({ question, len, nextFn }: { question: QuestionProps; len: number; nextFn?: any }) => {
  const { handleNext, questionIndex, handleQuizEnd, answers, handlePrev } = useQuiz();
  const [answer, setAnswer] = useState<{ answer: number | undefined; id: string }>();
  const { color } = useColor();
  return (
    <div className={`flex flex-col  gap-2  max-w-full lg:w-[80%] rounded-lg py-3 md:py-5  md:px-10`}>
      {question?.coverImage && <img src={question?.coverImage} className="w-[20rem] mx-auto" />}
      <div className="bg-white shadow-md flex flex-col items-end px-5 py-3 md:py-10 md:px-20 relative border-gray-300 border-2 rounded-md">
        <h2 className="  capitalize text-base md:text-2xl text-left self-start text-gray-800 font-semibold">
          {question.question}
        </h2>
        {question.hint && question.hint.text !== "" && (
          <DialogCustom
            content={<Hint text={question.hint.text} />}
            title="This is Hint By Quiz author"
            description=""
            btn={
              <Button className=" text-gray-100 font-semibold mt-10 text-lg bg-green-400 hover:bg-cyan-500 duration-200">
                Show Hint
              </Button>
            }
          />
        )}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 w-full p-3 gap-4 ">
        {question.answers.map((a, i) => (
          <Answer
            active={answers.filter((ans: any) => ans?.id === question._id)[0]?.answer === i}
            key={i}
            i={i}
            id={question._id}
            answer={answer}
            setAnswer={setAnswer}
            text={a}
          />
        ))}
      </div>
      {answers.length !== len ? (
        <div className="flex justify-between gap-10 py-5 px-10  items-center">
          <Button
            size="lg"
            variant="destructive"
            className={`rounded-full hover:bg-red-400 self-center my-4 py-5 px-10 bg-gray-200 hover:text-white   text-gray-800`}
            //@ts-ignore
            onClick={() => handlePrev()}
          >
            Previous
          </Button>
          <Button
            size="lg"
            variant="default"
            className={` rounded-full hover:bg-red-400 self-center my-4 py-5 px-10 bg-gray-200 hover:text-white   text-gray-800`}
            //@ts-ignore
            onClick={() => {
              if (nextFn) return nextFn();
              //@ts-ignore
              if (answer?.answer >= 0) {
                handleNext(answer, len);
              }
              setAnswer({ answer: undefined, id: "" });
            }}
          >
            {questionIndex + 1 < len ? "Next" : "Submit"}
          </Button>
        </div>
      ) : (
        <DialogCustom
          isopen={true}
          content={<ConfirmQuizSolve values={answers} />}
          btn={
            <Button
              size="lg"
              variant="default"
              className={` rounded-full text-center justify-self-center mx-auto hover:bg-red-400 self-center my-4 w-[70%] py-5  text-white`}
            >
              Publish
            </Button>
          }
        />
      )}
    </div>
  );
};

export default QuestionItem;
