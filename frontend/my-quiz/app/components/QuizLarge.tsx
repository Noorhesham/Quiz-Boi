"use client";
import { QuizProps } from "@/types";
import QuestionItem from "./QuestionItem";
import { Progress } from "@/components/ui/progress";
import { useQuiz } from "../context/QuizContext";
import Timer from "./Timer";
import TimeOver from "./TimeOver";


const QuizLarge = ({ quiz }: { quiz: QuizProps }) => {
  !localStorage.getItem("timer") && localStorage.setItem("timer", JSON.stringify(+quiz.duration * 60 || 60));
  const { questionIndex, progress, timer, answers } = useQuiz();
  //we set the timer in the local stoarage to be the duration of the quiz
  const len = quiz.questions.length; //num questions


  return (
    <div className="flex flex-col items-center   md:w-[80%] ">
      {timer > 0 && (
        <div className="flex  items-center   relative w-[40%] md:w-[100%] gap-3 px-2 md:px-5 flex-col ">
          <Timer />
          <Progress className="  bg-gray-100 h-[1rem]" value={progress} />
          <div className=" self-start flex items-center gap-2 font-semibold text-gray-200">
            Question <div className=" text-pink-400">{` ${questionIndex + 1}`}</div>/ {len}
          </div>
        </div>
      )}
      {!(timer <= 0) ? <QuestionItem len={len} question={quiz.questions[+questionIndex]} /> : <TimeOver />}
    </div>
  );
};

export default QuizLarge;
