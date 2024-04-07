"use client";
import NotFound from "@/app/components/NotFound";
import QuizLarge from "@/app/components/QuizLarge";
import Spinner from "@/app/components/Spinner";
import { useStartQuiz } from "@/utils/queryFunctions";
import { useParams } from "next/navigation";
import React from "react";

const page = () => {
  const { id }: { id: string } = useParams();
  const { quiz, isLoading, error } = useStartQuiz(id);
  if (isLoading) return <Spinner />;
  if (!quiz.data?.quiz) return <NotFound text="This Quiz is not available" />;
  return (
    <section className=" py-10 flex items-center justify-center px-20 bg-gray-100 rounded-md min-h-[80vh] ">
      <QuizLarge quiz={quiz.data.quiz} />
    </section>
  );
};

export default page;
