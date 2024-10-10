import { FilterQuizzesHome } from "@/actions/FilterQuizHome";
import React from "react";
import QuizCard from "./QuizCard";
import { QuizProps } from "@/types";
import NotFound from "./NotFound";
import PaginationHome from "./Pagination";
import Motion from "./Motion";
import MaxWidthWrapper from "./MaxWidthWrapper";

const QuizzesList = async ({ page, categorey }: { page: number; categorey: string }) => {
  const { data, totalPages, totalResults, results } = await FilterQuizzesHome(categorey, page);
  if (!data.quizzes) return <NotFound text="there are no quizzes" />;
  return (
    <MaxWidthWrapper>
      <Motion id="play" className=" grid grid-cols-1 justify-center sm:grid-cols-2 lg:grid-cols-3 items-stretch gap-5">
        {data.quizzes?.map((quiz: QuizProps, i: number) => (
          <QuizCard key={i} quiz={quiz} />
        ))}
      </Motion>
      <PaginationHome
        hasNext={page < totalPages && results < totalResults}
        totalPages={totalPages}
        length={data.quizzes.length}
      />
    </MaxWidthWrapper>
  );
};

export default QuizzesList;
