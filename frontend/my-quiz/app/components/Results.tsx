"use client";
import React from "react";
import { QuestionProps } from "@/types";
import QuestionResults from "./QuestionResults";
import Heading from "./Heading";

const Results = ({ list, answers }: { list: Array<any>; answers: Array<{ answer: number; id: string }> }) => {

  return (
    <>
      <Heading text="Review Your Results Here ..." />
      <section className="grid grid-cols-1 md:grid-cols-2 mt-5  gap-2  items-stretch justify-center">
        {list &&
          list.map((question: QuestionProps, i: number) => (
            <QuestionResults answers={answers} key={i} question={question} />
          ))}
      </section>
    </>
  );
};

export default Results;
