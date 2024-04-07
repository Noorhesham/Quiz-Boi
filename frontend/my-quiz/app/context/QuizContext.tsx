"use client";
import React, { createContext, useContext, useEffect, useState } from "react";

interface QuizContextType {
  answers: number[];
  setAnswers: React.Dispatch<React.SetStateAction<number[]>>;
  questionIndex: number;
  setQuestionIndex: React.Dispatch<React.SetStateAction<number>>;
  handleNext: any;
  handleReset: any;
}

const QuizContext = createContext<QuizContextType | any>(undefined);

export const QuizProvider = ({ children }: { children: React.ReactNode }) => {
  const [answers, setAnswers] = useState<{ answer: number; id: string }[]>(function () {
    const storedValue = global?.localStorage.getItem("answers");
    return storedValue ? JSON.parse(storedValue) : [];
  });
  const [questionIndex, setQuestionIndex] = useState(function () {
    const storedValue = global?.localStorage.getItem("questionIndex");
    return storedValue ? JSON.parse(storedValue) : 0;
  });
  const [progress, setProgress] = useState(function () {
    const storedValue = global?.localStorage.getItem("progress");
    return storedValue ? JSON.parse(storedValue) : 0;
  });
  const [submitting, setSubmitting] = useState(false);
  const [timer, setTimer] = useState(function () {
    const storedValue = global?.localStorage.getItem("timer");
    return storedValue ? parseInt(storedValue, 10) : 60;
  });

  useEffect(() => {
    const timerId = setInterval(() => {
      setTimer((prevTimer) => (!submitting ? prevTimer - 1 : prevTimer));
    }, 1000);
    if (timer <= 0) {
      clearInterval(timerId);
      localStorage.removeItem("timer");
    }
    return () => clearInterval(timerId);
  }, []);

  useEffect(() => {
    localStorage.setItem("answers", JSON.stringify(answers));
    localStorage.setItem("questionIndex", questionIndex.toString());
    localStorage.setItem("progress", progress.toString());
    localStorage.setItem("timer", timer.toString());
  }, [answers, questionIndex, timer]);

  const handleNext = function (answer: { answer: number; id: string }, len: number) {
    setAnswers((prev) => {
      if(prev.length===0) return [answer]
      else return[...prev, answer]});
    setQuestionIndex((prevIndex: number) => {
      const nextIndex = prevIndex + 1;
      const nextProgress = (nextIndex / len) * 100;
      setProgress(nextProgress);
      return nextIndex;
    });
    console.log(answers, answer);
  };
  const handleReset = function () {
    setAnswers([]);
    setQuestionIndex(0);
    setProgress(0);
    localStorage.removeItem("timer");
  };
  const handleQuizEnd = function () {
    localStorage.removeItem("answers");
    localStorage.removeItem("questionIndex");
    localStorage.removeItem("progress");
    localStorage.removeItem("timer");
  };
  return (
    <QuizContext.Provider
      value={{
        answers,
        setAnswers,
        handleQuizEnd,
        questionIndex,
        setQuestionIndex,
        handleNext,
        handleReset,
        setSubmitting,
        progress,
        setProgress,
        timer,
        setTimer,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
};

export const useQuiz = () => useContext(QuizContext);
