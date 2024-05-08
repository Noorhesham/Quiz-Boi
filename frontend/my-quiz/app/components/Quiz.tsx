"use client";
import { QuizProps } from "@/types";
import React from "react";
import Topic from "./Topic";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { FaCloudUploadAlt } from "react-icons/fa";
import Time from "./Time";
import Date from "./Date";
import Generating from "./Generating";
import { BsArrowRightShort } from "react-icons/bs";


const Quiz = ({ quiz, dark = false }: { quiz: QuizProps; dark?: boolean }) => {
  return (
    <Link href={`/quiz-upload/${quiz._id}`}
      className={` ${
        dark && "text-gray-800"
      } rounded-lg bg-gray-100 max-h-[15rem] glass-white-1 cursor-pointer text-gray-800  hover:bg-pink-400 duration-200  hover:text-gray-100
       shadow-md flex flex-row  items-center  justify-between gap-2 md:gap-8`}
    >
      <div className="flex flex-col h-full flex-1 md:py-3 md:px-6 py-2 px-4   justify-between ">
        <h2 className={`capitalize text-gray-100 font-semibold text-xl`}>{quiz.title}</h2>
        <div className="flex flex-wrap items-center md:gap-1">
          {quiz.tags?.map((tag: string, i: number) => (
            <Topic key={i} small={true} tag={tag} />
          ))}
        </div>
        <div className="flex flex-col">
          <Time className="text-gray-200 font-normal" duration={quiz.duration} />
          <Date className=" mr-0 mt-0 text-gray-200" date={quiz.createdAt} />
        </div>
        <div className="flex flex-col items-start gap-2  ">
          {quiz.published ? (
              <Link className="underline text-nowrap flex items-center text-gray-50 hover:text-gray-300 duration-200 " href={`/quiz-upload/${quiz._id}`}>
                Show,Edit Quiz
                <BsArrowRightShort />
                </Link>
          ) : (
            <Button className="flex items-center gap-2 hover:text-red-400 duration-150 " variant="secondary">
              <Link href={`/quiz-upload/${quiz._id}`}>Publish Quiz</Link>
              <FaCloudUploadAlt className=" text-red-400" />
            </Button>
          )}
        </div>
      </div>
      <div className="h-full  relative w-full">
        <div className=" absolute shadow-md right-2 font-normal py-1 px-2 text-sm text-gray-100 rounded-xl bg-violet-600 bottom-2 z-10">
          {quiz.questionNum} Qs
        </div>
        {quiz.published ? (
          <img className=" absolute z-10 w-[6rem] h-[6rem] -left-3 -bottom-5" src="/published.png" alt="" />
        ) : (
          <Generating className=" left-[40%] md:left-1/2 -translate-x-1/2 bottom-[34%]" />
        )}
        <img
          loading="lazy"
          className="rounded-lg h-full block  object-center aspect-[2/2] object-cover w-full"
          src={`${quiz.coverImage}` || "/quiz3.png"}
          alt={quiz.title}
        />
      </div>
    </Link>
  );
};

export default Quiz;
