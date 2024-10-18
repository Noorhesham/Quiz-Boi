import { Button } from "@/components/ui/button";
import { QuestionProps } from "@/types";
import React, { useState } from "react";
import DialogCustom from "./DialogCustom";
import Answer from "./Answer";
import Hint from "./Hint";
import { useMultiPlayer } from "../context/MultiPlayerContext";
import Status from "./Status";

const QuestionMulti = ({ question, len, nextFn }: { question: QuestionProps; len: number; nextFn?: any }) => {
  const { handleNext, questionIndex, handleQuizEnd, answers, handlePrev } = useMultiPlayer();
  const [answer, setAnswer] = useState<{ answer: number | undefined; id: string }>();
  const [finish, setFinish] = useState(false);
  return (
    <div className={`flex flex-col  gap-2  max-w-full w-full lg:w-[80%] rounded-lg py-3 md:py-5  md:px-10`}>
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

      <div className="flex justify-between gap-10 py-5 px-10  items-center">
        {!finish ? (
          <Button disabled={!answer}
            size="lg"
            variant="default"
            className={` rounded-full w-full hover:bg-red-400 self-center  py-5 px-10 bg-gray-200 hover:text-white   text-gray-800`}
            //@ts-ignore
            onClick={() => {
              if (nextFn) nextFn();
              //@ts-ignore
              if (answer?.answer >= 0) {
                handleNext(answer, len);
              }
              if (questionIndex + 1 === len) setFinish(true);
              setAnswer({ answer: undefined, id: "" });
            }}
          >
            {questionIndex + 1 < len ? "Next" : "Finish Quiz"}
          </Button>
        ) : (
          <Status text="WAITING FOR OTHER PLAYER" image={"/rb_8026.png"} />
        )}
      </div>
    </div>
  );
};

export default QuestionMulti;
