import { QuestionProps } from "@/types";
import React from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import AnswerResult from "./AnswerResult";

const QuestionResults = ({
  question,
  answers,
}: {
  question: QuestionProps;
  answers: Array<{ answer: number; id: string }>;
}) => {
  const myAnswer = answers.find((answer) => answer.id === question._id)?.answer;
  return (
    <div className={`flex flex-col  mb-auto  gap-2  self-stretch  rounded-lg py-3 px-6`}>
      <div className="bg-white shadow-md mt-auto mb-auto min-h-[10rem] flex flex-col gap-3   py-5 px-10 relative border-gray-300 border-2 rounded-md">
        <h2 className="  text-xl text-left text-gray-800 font-semibold">{question.question}</h2>
        {question.explain && (
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-3">
              <AccordionTrigger className=" text-pink-400">View Explaination?</AccordionTrigger>
              <AccordionContent>{question.explain}.</AccordionContent>
            </AccordionItem>
          </Accordion>
        )}
        <div className=" mt-auto place-self-end self-end justify-end">
          {!myAnswer ||
            (myAnswer < 0 && (
              <span className=" p-1 mt-1 capitalize font-semibold ">You did not answer this question</span>
            ))}
          {myAnswer === +question.correctAnswerIndex && (
            <span className=" p-1 mt-1 capitalize font-semibold ">
              You got {question.points} for answering this question correctly
            </span>
          )}
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2  p-3 gap-4 ">
        {question.answers?.map((a, i) => (
          <AnswerResult yourAnswer={myAnswer} key={i} correct={question.correctAnswerIndex} i={i} text={a} />
        ))}
      </div>
    </div>
  );
};

export default QuestionResults;
