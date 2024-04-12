"use client";
import NotFound from "@/app/components/NotFound";
import QuizLarge from "@/app/components/QuizLarge";
import Spinner from "@/app/components/Spinner";
import { QuizProvider } from "@/app/context/QuizContext";
import { useGetUser, useStartQuiz } from "@/utils/queryFunctions";
import { useParams } from "next/navigation";
import React, { useEffect } from "react";

const page = () => {
  const { id }: { id: string } = useParams();
  const { user, isLoading: isLoading2 } = useGetUser();
  const { quiz: data, isLoading, error } = useStartQuiz(id);
  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      event.preventDefault();
      event.returnValue = ""; // Needed for Chrome
      return "Are you sure you want to leave?";
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);
  if (isLoading || isLoading2) return <Spinner />;
  if (!data) return <NotFound text="This Quiz is not available" />;
  console.log(data);
  return (
    <section className=" pt-32 quizbg flex items-center justify-center px-20 bg-gray-100 rounded-md min-h-[100vh] ">
      <QuizProvider id={id} initial={data.duration * 60 || 60}>
        {user && <QuizLarge quiz={data} />}
      </QuizProvider>
    </section>
  );
};

export default page;
