q"use client";
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
const getStorage = function (key: string, value: any) {
  const storedValue = global?.localStorage?.getItem(key);
  try {
    if (storedValue) {
      return JSON.parse(storedValue);
    }
  } catch (error) {
    console.error(`Error parsing JSON for key "${key}":`, error);
  }
  return value;
};
export const QuizProvider = ({ children, initial, id }: { children: React.ReactNode; initial: number; id: string }) => {
  const [answers, setAnswers] = useState<{ answer: number; id: string }[]>(getStorage("answers", []));
  const [questionIndex, setQuestionIndex] = useState(getStorage("questionIndex", 0));
  const [progress, setProgress] = useState(getStorage("progress", 0));
  const [submitting, setSubmitting] = useState(false);
  const [timer, setTimer] = useState<number>(getStorage("timer", initial));
  const [start, setStart] = useState(false);
  const [Id, setId] = useState(getStorage("currentquiz", id));

  useEffect(() => {
    const timerId = setInterval(() => {
      setTimer((prevTimer) => prevTimer - 1);
      if (submitting) clearInterval(timer);
    }, 1000);
    if (timer <= 0) {
      clearInterval(timerId);
      localStorage.removeItem("timer");
    }
    return () => clearInterval(timerId);
  }, [start]);

  const handleStart = function (duration: number) {
    setTimer(duration);
    setQuestionIndex(0);
    setProgress(0);
    setStart(true);
  };

  useEffect(() => {
    localStorage.setItem("answers", JSON.stringify(answers));
    localStorage.setItem("questionIndex", questionIndex.toString());
    localStorage.setItem("progress", progress.toString());
    localStorage.setItem("timer", timer?.toString());
    localStorage.setItem("currentquiz", JSON.stringify(Id));
    if (timer <= 0) localStorage.removeItem("timer");
  }, [answers, questionIndex, timer]);

  const handleNext = function (answer: { answer: number; id: string }, len: number) {
    setAnswers((prev) => {
      const isDuplicate = prev.some((prevAnswer) => prevAnswer.id === answer.id);
      if (isDuplicate) {
        const updatedAnswers = prev.map((prevAnswer) => (prevAnswer.id === answer.id ? answer : prevAnswer));
        return updatedAnswers;
      }
      if (prev.length === 0) {
        console.log(answers, answer);
        return [answer];
      } else {
        console.log([...prev, answer]);
        return [...prev, answer];
      }
    });
    if (questionIndex + 1 === len) return;
    setQuestionIndex((prevIndex: number) => {
      const nextIndex = prevIndex + 1;
      const nextProgress = (nextIndex / len) * 100;
      setProgress(nextProgress);
      return nextIndex;
    });
  };
  const handlePrev = function (answer: { answer: number; id: string }, len: number) {
    if (questionIndex === 0) return;
    setQuestionIndex((currentIndex: number) => {
      const PrevIndex = currentIndex - 1;
      const prevProgress = Math.trunc(progress - (PrevIndex / len) * 100);
      setProgress(prevProgress);
      return PrevIndex;
    });
  };
  const handleReset = function () {
    setAnswers([]);
    setQuestionIndex(0);
    setProgress(0);
    setTimer(0)
  };
  const handleQuizEnd = function () {
    handleReset();
    localStorage.removeItem("timer");
    localStorage.removeItem("answers");
    localStorage.removeItem("questionIndex");
    localStorage.removeItem("progress");
    localStorage.removeItem("currentquiz");
  };
  useEffect(
    function () {
      if (id === Id) return:
      setId(id);
      localStorage.setItem("currentquiz", Id);
      handleQuizEnd()
    },
    [Id]
  );
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
        handleStart,
        setStart,
        handlePrev,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
};

export const useQuiz = () => useContext(QuizContext);
