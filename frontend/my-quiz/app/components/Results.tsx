"use client";
import { useGetQuestions } from "@/utils/queryFunctions";
import React from "react";
import Spinner from "./Spinner";
import { QuestionProps } from "@/types";
import QuestionResults from "./QuestionResults";
import Heading from "./Heading";

const Results = ({ list, answers }: { list: Array<string>; answers: Array<{ answer: number; id: string }> }) => {
  const { questions, isLoading } = useGetQuestions(list);
  if(isLoading) return <Spinner />

  return (
    <>
      <Heading text="Review Your Results Here ..." />
      <section className="grid grid-cols-1 md:grid-cols-2 mt-5 auto-rows-fr gap-4 items-stretch justify-center">
        {questions &&
          questions.map((question: QuestionProps, i: number) => (
            <QuestionResults answers={answers} key={i} question={question} />
          ))}
      </section>
    </>
  );
};

export default Results;
