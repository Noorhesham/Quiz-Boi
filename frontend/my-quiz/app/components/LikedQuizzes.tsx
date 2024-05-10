"use client";
import { useGetMyLikes, useGetMyPlayed } from "@/utils/queryFunctions";
import React, { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import QuizCard from "./QuizCard";
import { Empty } from "./Empty";
import { SkeletonCard } from "./SkeletonCard";
import Motion from "./Motion";

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
    <Motion animate={true} className=" relative">
      {!isLoading && (!data || data.pages.flat(1).length <= 0) && (
        <Empty
          link="/"
          linkText="Explore more quizzes and like them in the home page !!"
          text="You have not liked any quizzes yet !"
        />
      )}
      <section className=" relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 items-stretch  md:p-10 gap-5">
        {data?.pages.flat(1)?.map((quiz: any, i: number) => {
          if ((!quiz.quiz && !play) || (play && !quiz.quizId)) return null;
          else return <QuizCard key={i} quiz={play ? quiz.quizId : quiz.quiz} />;
        })}
        {(isLoading || (hasNextPage && isFetchingNextPage)) && (
          <div ref={ref} className=" w-full">
            <div  className="w-8 h-8 left-1/2 -bottom-2  absolute mx-auto mt-auto">
            <img src="/loading3.png" className=" animate-spin" alt="" />
          </div>
          </div>
        )}
        {(isLoading || (hasNextPage && isFetchingNextPage)) &&
          Array.from({ length: 4 }).map((_, index) => (
            <div className="">
              <SkeletonCard />
            </div>
          ))}
      </section>
    </Motion>
  );
};

export default LikedQuizzes;
