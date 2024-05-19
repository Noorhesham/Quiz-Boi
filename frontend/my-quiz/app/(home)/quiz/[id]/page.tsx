"use client";
import ConfirmPublish from "@/app/components/ConfirmPublish";
import GlobalButton from "@/app/components/GlobalButton";
import NotFound from "@/app/components/NotFound";
import QuizLarge from "@/app/components/QuizLarge";
import Spinner from "@/app/components/Spinner";
import { QuizProvider } from "@/app/context/QuizContext";
import { Input } from "@/components/ui/input";
import { useGetUser, useStartQuiz } from "@/utils/queryFunctions";
import Image from "next/image";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";


const page = () => {
  const { id }: { id: string } = useParams();
  const { user, isLoading: isLoading2 } = useGetUser();
  const { quiz: data, isLoading, error } = useStartQuiz(id);
  const [start, setStart] = useState(false);
  const [userName, setUserName] = useState(function () {
    if(user) return ""
    const storedValue = global?.localStorage?.getItem("username");
    if (storedValue) {
      setStart(true);
      return storedValue;
    } else return "";
  });
  const handleClick = function () {
    if (userName.length > 3) setStart(true);
    localStorage?.setItem("username", userName);
  };
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
  console.log(userName);
  return (
    <section className=" pt-32 quizbg flex items-center justify-center px-20 bg-gray-100 rounded-md min-h-[100vh] ">
      <QuizProvider id={id} initial={data.duration * 60 || 60}>
        {(!user && !start)  && (
          <div className="flex flex-col gap-3">
            <div className="flex flex-col  items-center gap-10">
              <div className="flex flex-col items-center text-center">
                <h2 className=" text-2xl my-5 font-normal text-gray-100 text-center">You are not logged in ..</h2>
                <p className=" text-gray-300 font-normal">
                  enter a username of at least 3 characters to start your quiz
                </p>
                <Image width={250} height={250} src={`/log1.png`} alt="remove" />
              </div>
            </div>
            <Input
              onChange={(e) => setUserName(e.target.value)}
              value={userName}
              className="py-6 px-3 rounded-lg text-black"
              placeholder="user name"
              type="text"
            />
            <GlobalButton text="Start Quiz" onClick={handleClick} />
          </div>
        )}
        {(user || (userName && userName.length >= 3 && start)) && <QuizLarge quiz={data} />}
      </QuizProvider>
    </section>
  );
};

export default page;
