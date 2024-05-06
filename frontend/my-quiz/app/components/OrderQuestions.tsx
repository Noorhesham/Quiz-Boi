"use client";
import React, { useState } from "react";
import Question from "./Question";
import { QuestionProps, QuizProps } from "@/types";
import { EditQuiz } from "@/actions/EditQuiz";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import Ordering from "./Ordering";

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
      toast.success("We reordered your questions 🐯❤️");
      router.refresh();
    });
  };
  return (
    <Ordering items={items} handleReorder={handleReorder}>
      {quiz.questions.map((question: QuestionProps, i: number) => (
        <Question index={i} key={question._id} question={question} />
      ))}
    </Ordering>
  );
};

export default OrderQuestions;
