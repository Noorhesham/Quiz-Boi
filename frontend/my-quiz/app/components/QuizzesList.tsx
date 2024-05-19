import { FilterQuizzesHome } from "@/actions/FilterQuizHome";
import React from "react";
import QuizCard from "./QuizCard";
import { QuizProps } from "@/types";
import NotFound from "./NotFound";
import PaginationHome from "./Pagination";
import Motion from "./Motion";

const QuizzesList = async ({ page, categorey }: { page: number; categorey: string }) => {
  const { data, totalPages, totalResults, results } = await FilterQuizzesHome(categorey, page);
  if (!data.quizzes) return <NotFound text="there are no quizzes" />;
  return (
    <>
      <Motion
        id="play"
        className=" grid grid-cols-1 justify-center sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 items-stretch p-10 gap-5"
      >
      {data.quizzes?.map((quiz: QuizProps, i: number) => (
        <QuizCard key={i} quiz={quiz} />
      ))}
      </Motion>
      <PaginationHome
        hasNext={page < totalPages && results < totalResults}
        totalPages={totalPages}
        length={data.quizzes.length}
      />
    </>
  );
};

export default QuizzesList;
