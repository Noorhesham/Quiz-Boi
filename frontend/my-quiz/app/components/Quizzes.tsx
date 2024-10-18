"use client";
import React from "react";
import MotionContainer from "./MotionContainer";
import MotionItem from "./MotionItem";
import QuizCard from "./QuizCard";
import { QuizProps } from "@/types";

const Quizzes = ({ quizzes }: { quizzes: any }) => {
  return (
    <MotionContainer
      id="play"
      className=" grid grid-cols-1 justify-center sm:grid-cols-2 lg:grid-cols-3 items-stretch gap-5"
    >
      {quizzes?.map((quiz: QuizProps, i: number) => (
        <MotionItem key={i}>
          <QuizCard key={i} quiz={quiz} />
        </MotionItem>
      ))}
    </MotionContainer>
  );
};

export default Quizzes;
