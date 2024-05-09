"use client";
import { useGetMyLikes, useGetMyPlayed } from "@/utils/queryFunctions";
import React, { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import QuizCard from "./QuizCard";
import { motion } from "framer-motion";
import { container } from "../motion";
import { Empty } from "./Empty";

const LikedQuizzes = ({ id, play }: { id?: string; play?: boolean }) => {
  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } = play
    ? useGetMyPlayed(id)
    : useGetMyLikes(id);
  const { ref, inView } = useInView();
  useEffect(
    function () {
      if (inView && hasNextPage) fetchNextPage();
    },
    [inView, hasNextPage, fetchNextPage]
  );
  console.log(data);
  return (
    <>
      {!isLoading && (!data || data.pages.flat(1).length <= 0) && (
        <Empty
          link="/"
          linkText="Explore more quizzes and like them in the home page !!"
          text="You have not liked any quizzes yet !"
        />
      )}
      <motion.section
        variants={container}
        className=" relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 items-stretch  md:p-10 gap-5"
      >
        {data?.pages.flat(1)?.map((quiz: any, i: number) => {
          if ((!quiz.quiz && !play) || (play && !quiz.quizId)) return null;
          else return <QuizCard key={i} card={true} quiz={play ? quiz.quizId : quiz.quiz} />;
        })}
        {(hasNextPage || isLoading || isFetchingNextPage) && (
          <div ref={ref} className="absolute -bottom-2 -translate-x-1/2 left-1/2 ">
            <img src="/loading3.png" className=" w-[2.5rem] h-[2.5rem] animate-spin" />
          </div>
        )}
      </motion.section>
    </>
  );
};

export default LikedQuizzes;
