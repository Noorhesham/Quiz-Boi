"use client";
import { QuizProps } from "@/types";
import { useColor } from "../context/ColorContext";
import QuestionItem from "./QuestionItem";
import { Progress } from "@/components/ui/progress";
import { useQuiz } from "../context/QuizContext";
import Timer from "./Timer";

import TimeOver from "./TimeOver";

const QuizLarge = ({ quiz }: { quiz: QuizProps }) => {
  const { color } = useColor();
  const { questionIndex, progress, timer,answers } = useQuiz();
  //we set the timer in the local stoarage to be the duration of the quiz
  !localStorage.getItem("timer") && localStorage.setItem("timer", JSON.stringify(+quiz.duration * 60 || 60));
  const len = quiz.questions.length;   //num questions 

  return (
    <div className="flex flex-col items-center w-[80%] ">
      {timer > 0 && (
        <div className="flex items-center  relative w-full gap-3 px-5 flex-col ">
          <Timer value={timer} />
          <Progress className=" h-[1rem]" value={progress} />
          <span className=" self-start font-semibold text-gray-800">{`Question ${questionIndex + 1}/ ${len}`}</span>
        </div>
      )}
      {!(timer <= 0) ? (
        <QuestionItem len={len} question={quiz.questions[+questionIndex]} />
      ) :<TimeOver values={answers}/>}           
    </div>
  );
};

export default QuizLarge;
