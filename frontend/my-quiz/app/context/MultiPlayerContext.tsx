"use client";
import React, { createContext, useContext, useEffect, useState } from "react";

interface MultiPlayerContextType {
  answers: number[];
  setAnswers: React.Dispatch<React.SetStateAction<number[]>>;
  questionIndex: number;
  setQuestionIndex: React.Dispatch<React.SetStateAction<number>>;
  handleNext: any;
  handleReset: any;
}

const MultiPlayerContext = createContext<MultiPlayerContextType | any>(undefined);

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
export const MultiPlayerProvider = ({ children }: { children: React.ReactNode }) => {
  const [answers, setAnswers] = useState<{ answer: number; id: string }[]>([]);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [start, setStart] = useState(false);
  console.log(answers)
  const handleStart = function (duration: number) {
    setQuestionIndex(0);
    setProgress(0);
    setStart(true);
  };

  useEffect(() => {
    localStorage.setItem("answers", JSON.stringify(answers));
    localStorage.setItem("questionIndex", questionIndex.toString());
  }, [answers, questionIndex]);

  const handleNext = function (answer: { answer: number; id: string }, len: number) {
    setAnswers((prev) => {
      const isDuplicate = prev.some((prevAnswer) => prevAnswer?.id === answer?.id);
      if (isDuplicate) {
        const updatedAnswers = prev.map((prevAnswer) => (prevAnswer?.id === answer?.id ? answer : prevAnswer));
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
      const prevProgress = progress - 10;
      setProgress(prevProgress);
      return PrevIndex;
    });
  };
  const handleReset = function () {
    setAnswers([]);
    setQuestionIndex(0);
    setProgress(0);
  };
  const handleQuizEnd = function () {
    setStart(false);
    handleReset();

    localStorage.removeItem("answers");
    localStorage.removeItem("questionIndex");
  };
  return (
    <MultiPlayerContext.Provider
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
        handleStart,
        setStart,
        handlePrev,
      }}
    >
      {children}
    </MultiPlayerContext.Provider>
  );
};

export const useMultiPlayer = () => useContext(MultiPlayerContext);
