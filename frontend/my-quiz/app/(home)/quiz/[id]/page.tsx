"use client";
import NotFound from "@/app/components/NotFound";
import QuizLarge from "@/app/components/QuizLarge";
import Spinner from "@/app/components/Spinner";
import { QuizProvider } from "@/app/context/QuizContext";
import { useGetUser, useStartQuiz } from "@/utils/queryFunctions";
import { useParams } from "next/navigation";
import React from "react";

const page = () => {
  const { id }: { id: string } = useParams();
  const {user,isLoading:isLoading2}=useGetUser()
  const { quiz:data, isLoading, error } = useStartQuiz(id);
  if (isLoading||isLoading2) return <Spinner />;
  if (!data.data?.quiz) return <NotFound text="This Quiz is not available" />;
  const quiz=data.data.quiz
  console.log(quiz)
  return (
    <section className=" pt-32 quizbg flex items-center justify-center px-20 bg-gray-100 rounded-md min-h-[100vh] ">
      <QuizProvider id={id}  initial={quiz.duration*60||60}>
        {user&&<QuizLarge quiz={quiz} />}
      </QuizProvider>
    </section>
  );
};

export default page;
