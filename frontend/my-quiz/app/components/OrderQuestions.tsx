"use client";
import React, { useState } from "react";
import Question from "./Question";
import { QuestionProps, QuizProps } from "@/types";
import { EditQuiz } from "@/actions/EditQuiz";
import { Reorder } from "framer-motion";
import { useRouter } from "next/navigation";

const OrderQuestions = ({ quiz }: { quiz: QuizProps }) => {
  const [items, setItems] = useState(quiz.questions);
  const router = useRouter();
  const handleReorder = async (newItems: QuestionProps[]) => {
    console.log(newItems);
    setItems(newItems);
    console.log({ questions: items.map((i) => i._id) });
    const formData = new FormData();
    newItems.forEach((question: QuestionProps, index: number) => {
      formData.append(`questions[${index}]`, question._id);
    });
    await EditQuiz(formData, quiz._id).then((res) => {
      console.log(res);
      setInterval(() => router.refresh(), 1500);
    });
  };
  return (
    <>
      <Reorder.Group axis="y" className="flex flex-col gap-4" values={items} onReorder={handleReorder}>
        {items.map((question: QuestionProps, i: number) => (
          <Question index={i} key={question._id} question={question} />
        ))}
      </Reorder.Group>
    </>
  );
};

export default OrderQuestions;
