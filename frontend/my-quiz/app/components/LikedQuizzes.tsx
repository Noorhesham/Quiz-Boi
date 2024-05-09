"use client";
import { useGetMyLikes } from "@/utils/queryFunctions";
import React, { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import QuizCard from "./QuizCard";
import Spinner from "./Spinner";

const LikedQuizzes = () => {
  const { likedQuizzes, isLoading, error, fetchNextPage, hasNextPage, isFetchingNextPage } = useGetMyLikes();
  const { ref, inView } = useInView();
  useEffect(
    function () {
      if (inView && hasNextPage) fetchNextPage();
    },
    [inView, hasNextPage, fetchNextPage]
  );
  console.log(likedQuizzes?.pages.flat(1));
  return (
    <>
      {likedQuizzes?.pages.flat(1)?.map((quiz: any, i: number) => {
        if (!quiz.quiz) return null;
        else return <QuizCard key={i} card={true} quiz={quiz.quiz} />;
      })}
      {hasNextPage && (
        <div ref={ref}>
          <Spinner />
        </div>
      )}
    </>
  );
};

export default LikedQuizzes;
