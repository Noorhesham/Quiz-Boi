
import { FilterQuizzesHome } from "@/actions/FilterQuizHome";
import React from "react";
import NotFound from "./NotFound";
import Pagination from "./Pagination";
import MaxWidthWrapper from "./MaxWidthWrapper";

import Quizzes from "./Quizzes";

const QuizzesList = async ({ page, categorey }: { page: number; categorey: string }) => {
  const { data, totalPages, totalResults, results } = await FilterQuizzesHome(categorey, page);
  if (!data?.quizzes) return <NotFound text="there are no quizzes" />;

  return (
    <MaxWidthWrapper>
      <Quizzes quizzes={data.quizzes} />
      <Pagination
        hasNext={page < totalPages && results < totalResults}
        totalPages={totalPages}
        length={data.quizzes.length}
      />
    </MaxWidthWrapper>
  );
};

export default QuizzesList;
