"use client";
import { QuizProps } from "@/types";
import React from "react";
import Topic from "./Topic";
import { IMAGE_URL } from "@/constants";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { FaCloudUploadAlt } from "react-icons/fa";
import { useColor } from "../context/ColorContext";
import { LazyLoadImage } from "react-lazy-load-image-component";

const Quiz = ({ quiz, dark = false }: { quiz: QuizProps; dark?: boolean }) => {
  const { color } = useColor();
  return (
    <div
      className={` ${
        dark && "text-gray-800"
      } rounded-lg bg-gray-100 cursor-pointer text-gray-800  hover:bg-pink-400 duration-200  hover:text-gray-100 shadow-md flex sm:flex-row flex-col-reverse md:flex-nowrap flex-wrap items-center  justify-between gap-8 py-5 px-10 `}
    >
      <div className="flex flex-col   justify-between flex-wrap">
        <h2 className={`  capitalize font-semibold text-xl`}>{quiz.title}</h2>
        <div className="flex items-center flex-wrap gap-2">
          {quiz.tags?.map((tag: string, i: number) => (
            <Topic key={i} small={true} tag={tag} />
          ))}
        </div>
        <div className=" my-3 text-sm font-semibold">Duration : {quiz.duration}</div>
        <p>{quiz.description}</p>
        <div className="flex flex-col items-start gap-2  ">
          <div className={`${dark && "text-red-400 font-semibold "}text-red-100`}>
            {quiz.published ? `Published` : `in Progress...`}
          </div>
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
          <div className="w-[10rem]">
          <LazyLoadImage
        effect="blur"
        className="rounded-md h-full  aspect-[1/1] object-cover w-full"
        src={`${quiz.coverImage}` || "/quiz3.png"}
        alt={quiz.title}
      />
          </div>
    </div>
  );
};

export default Quiz;
