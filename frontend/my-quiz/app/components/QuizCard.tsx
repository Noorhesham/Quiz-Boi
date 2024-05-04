"use client";
import { QuizProps } from "@/types";
import React, { useState } from "react";
import Author from "./Author";
import { FiEye, FiHeart } from "react-icons/fi";
import { AnimatePresence, motion } from "framer-motion";
import Like from "./Like";
import QuizShow from "./QuizShow";
import DialogueQuiz from "./DialogueQuiz";
import Link from "next/link";
import { MdModeEdit } from "react-icons/md";
import { Button } from "@/components/ui/button";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import Share from "./Share";

const QuizCard = ({
  quiz,
  card = false,
  edit = false,
  href,
}: {
  quiz: QuizProps;
  card?: boolean;
  edit?: boolean;
  href?: string;
}) => {
  const [hover, setHover] = useState(false);
  return (
    <div
      className="relative h-full cursor-pointer rounded-md bg-white items-start flex flex-col"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div className="relative min-h-full  md:min-h-[22rem] text-nowrap flex text-center justify-center  items-center w-full ">
        {
          <DialogueQuiz
            content={<QuizShow quiz={quiz} />}
            btn={
              <LazyLoadImage
                effect="blur"
                threshold={100}
                height={"auto"}
                width={"auto"}
                className="rounded-md  h-full block mt-0 pt-0 object-top  aspect-[1/1] object-cover w-full"
                src={`${quiz?.coverImage}` || "/quiz3.png"}
                alt={quiz?.title}
              />
            }
          />
        }

        <AnimatePresence>
          {hover && (
            <motion.div
              key={quiz._id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute  bottom-[8px] rounded-md duration-200 left-0 w-full h-16 bg-black bg-opacity-40 flex flex-wrap items-center justify-between px-4"
            >
              <h6 className="text-white text-nowrap font-semibold">{quiz.title}</h6>
              <div className="flex items-center gap-2 text-white">
                <div className="rounded-full  p-1 bg-white hover:text-opacity-90 duration-150 text-gray-900 font-semibold text-center">
                  <FiEye className="" />
                </div>
                <div className="rounded-full  p-1 bg-white hover:text-opacity-90 duration-150 text-gray-900 font-semibold text-center">
                  <Like id={quiz._id} icon={<FiHeart />} />
                </div>
                <Share link={`https://quiz-boi.vercel.app/quiz/${quiz._id}`} />
                {edit && (
                  <div className="rounded-full  p-1 bg-white hover:text-opacity-90 duration-150 text-gray-900 font-semibold text-center">
                    <Link href={`/quiz-upload/${quiz._id}`}>
                      <MdModeEdit className=" hover:text-green-300 duration-150 text-green-500 cursor-pointer" />
                    </Link>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <div className="py-3 flex flex-col relative h-full px-2 w-full">
        
        <div className="flex py-2 px-4 border-b-2 border-gray-200 rounded-lg text-gray-800 flex-wrap justify-between items-center">
          <h6 className="font-semibold text-nowrap">{quiz?.title}</h6>
          <div className=" ml-auto self-end">
            <span className=" text-sm text-nowrap">Duration:{quiz?.duration} min</span>
          </div>
        </div>
        
        {!card &&<Author quiz={quiz} author={quiz.author} />}
        {href && (
          <Button className="rounded-full hover:bg-pink-400 hover:text-gray-100 self-center duration-200  py-3  px-6">
            <Link href={href}>Show Attempt</Link>
          </Button>
        )}
      </div>
    </div>
  );
};

export default QuizCard;
