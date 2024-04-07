"use client";
import { QuizProps } from "@/types";
import React from "react";
import Topic from "./Topic";
import { IMAGE_URL } from "@/constants";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { FaCloudUploadAlt } from "react-icons/fa";
import { useColor } from "../context/ColorContext";

const Quiz = ({ quiz, dark = false }: { quiz: QuizProps; dark?: boolean }) => {
  const { color } = useColor();
  return (
    <div
      className={`${quiz.color || color} ${
        dark && "text-gray-800"
      } rounded-lg  text-gray-100 shadow-md flex sm:flex-row flex-col-reverse md:flex-nowrap flex-wrap items-center  justify-between gap-8 py-5 px-10 `}
    >
      <div className="flex flex-col   justify-between flex-wrap">
        <h2 className={` ${dark && "text-gray-800"} text-gray-100 capitalize font-semibold text-xl`}>{quiz.title}</h2>
        <div className="flex items-center flex-wrap gap-2">
          {quiz.tags.map((tag:string,i:number) => (
            <Topic key={i} small={true} tag={tag} />
          ))}
        </div>
        <span className=" my-3 text-sm font-semibold">Duration : {quiz.duration}</span>
        <p>{quiz.description}</p>
        <div className="flex flex-col items-start gap-2  ">
          <span className={`${dark && "text-red-400 font-semibold "}text-red-100`}>
            {quiz.published ? `Published` : `in Progress...`}
          </span>
          {quiz.published ? (
            <Button>
              <Link href={`/quiz-upload/${quiz._id}`}>Show and Edit Quiz</Link>
            </Button>
          ) : (
            <Button className="flex items-center gap-2 hover:text-red-400 duration-150 " variant="secondary">
              <Link href={`/quiz-upload/${quiz._id}`}>Publish Quiz</Link>
              <FaCloudUploadAlt className=" text-red-400" />
            </Button>
          )}
        </div>
      </div>
      <img className="w-[10rem] rounded-md" src={`${IMAGE_URL}quizzes/${quiz.coverImage}` || "/quiz3.png"} />
    </div>
  );
};

export default Quiz;
