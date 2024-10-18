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
import Share from "./Share";
import { item } from "../motion";
import Time from "./Time";
import StartButton from "./StartButton";
import Date from "./Date";
import Points from "./Points";
import { BsArrowRightShort } from "react-icons/bs";
import Image from "next/image";
import MotionItem from "./MotionItem";
import { FaFireAlt } from "react-icons/fa";
import FireButton from "./FireButton";
const QuizCard = ({
  quiz,
  card = false,
  edit = false,
  points,
  href,
  click = true,
}: {
  quiz: QuizProps;
  card?: boolean;
  edit?: boolean;
  href?: string;
  click?: boolean;
  points?: number;
}) => {
  const [hover, setHover] = useState(false);
  console.log(quiz);
  return (
    <MotionItem
      variants={item}
      className="relative  h-full cursor-pointer rounded-2xl bg-white/60 shadow-md items-start flex flex-col"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div
        className={`relative  ${
          card ? "" : "md:h-[22rem]"
        }  text-nowrap  flex text-center justify-center  items-center w-full `}
      >
        <div className=" absolute right-2 font-normal py-1 px-2 text-sm text-gray-100 rounded-xl bg-violet-600 bottom-2 z-10">
          {quiz.questionNum} Qs
        </div>
        {click ? (
          <DialogueQuiz
            content={<QuizShow quiz={quiz} />}
            btn={
              <div className=" aspect-[1/1] w-full h-72 relative">
                <Image
                  src={`${quiz?.coverImage?.includes("quiz") ? "/quiz3.png" : quiz?.coverImage}` || "/quiz3.png"}
                  alt={quiz?.title}
                  fill
                  className="rounded-t-2xl  h-full block mt-0 pt-0    object-cover w-full"
                />
              </div>
            }
          />
        ) : (
          <div className=" aspect-[1/1] w-full h-72 relative">
            <Image
              src={`${quiz?.coverImage}` || "/quiz3.png"}
              alt={quiz?.title}
              fill
              className="rounded-t-2xl  h-full block mt-0 pt-0    object-cover w-full"
            />
          </div>
        )}

        <AnimatePresence>
          {hover && (
            <motion.div
              key={quiz._id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute z-10   bottom-0  rounded-t-2xl   duration-200 left-0 w-full h-16 bg-black bg-opacity-40 flex flex-wrap items-center justify-between px-4"
            >
              <h6 className="text-white capitalize  font-semibold">{quiz.title}</h6>
              <div className="flex  ml-auto items-center gap-2 text-white">
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
      <div className="py-2  glass-white-1 rounded-b-xl flex self-stretch flex-col relative h-full px-2 w-full">
        <div className="flex items-center mt-2 mb-auto justify-between flex-wrap">
          <h5 className="font-bold capitalize  text-gray-900 ">{quiz?.title}</h5>
          <Date date={quiz.createdAt} />
        </div>
        {points && <Points className=" mb-2" points={points} />}
        <div className="flex mb-2 flex-1 py-1  border-b-2 border-gray-200  text-gray-800 flex-col justify-between items-center">
          <div className={`${card && "gap-2"}  w-full flex flex-wrap items-center justify-between flex-1`}>
            <div className=" flex  justify-between items-start lg:items-center gap-2">
              <StartButton id={quiz._id} />
              <FireButton id={quiz._id} />
            </div>
          </div>
            <Time duration={quiz.duration} />
        </div>

        {!card && <Author quiz={quiz} author={quiz.author} />}
        {href && (
          <Link
            className="underline text-nowrap flex items-center text-center mx-auto text-pink-500 hover:text-pink-400 duration-200 "
            href={href}
          >
            Show Answers,Score
            <BsArrowRightShort />
          </Link>
        )}
      </div>
    </MotionItem>
  );
};

export default QuizCard;
