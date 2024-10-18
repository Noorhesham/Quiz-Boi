import { FilterQuizzesHome } from "@/actions/FilterQuizHome";
import React from "react";
import QuizCard from "./QuizCard";
import { QuizProps } from "@/types";
import NotFound from "./NotFound";
import PaginationHome from "./Pagination";
import MaxWidthWrapper from "./MaxWidthWrapper";
import MotionContainer from "./MotionContainer";
import MotionItem from "./MotionItem";
import Quizzes from "./Quizzes";

const QuizzesList = async ({ page, categorey }: { page: number; categorey: string }) => {
  const { data, totalPages, totalResults, results } = await FilterQuizzesHome(categorey, page);
  if (!data?.quizzes) return <NotFound text="there are no quizzes" />;
  
  return (
    <MaxWidthWrapper>
     <Quizzes quizzes={data.quizzes}/>
      <PaginationHome
        hasNext={page < totalPages && results < totalResults}
        totalPages={totalPages}
        length={data.quizzes.length}
      />
    </MaxWidthWrapper>
  );
};

export default QuizzesList;
