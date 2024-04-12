import React from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useQuiz } from "../context/QuizContext";

const Timer = () => {
  const { timer } = useQuiz();
  const mins = Math.floor(timer / 60);
  const secs = timer % 60;
  return (
    <div
      className=" text-pink-400 font-semibold fill-pink-400 absolute left-[50%] translate-x-[-50%] z-10 top-[-80px]  md:top-8 "
      style={{ width: 70, height: 70 }}
    >
      <CircularProgressbar value={timer} text={`${mins < 10 && 0}${mins}:${(secs < 10 && 0) || ""}${secs}`} />
    </div>
  );
};

export default Timer;
