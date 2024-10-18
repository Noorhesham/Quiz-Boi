import { getMyPlayedQuizzes } from "@/actions/GetPlayedQuizzes";
import DialogCustom from "@/app/components/DialogCustom";
import { Empty } from "@/app/components/Empty";
import FloatingTool from "@/app/components/FloatingTool";
import GlobalButton from "@/app/components/GlobalButton";
import Heading from "@/app/components/Heading";
import MaxWidthWrapper from "@/app/components/MaxWidthWrapper";
import PaginationHome from "@/app/components/Pagination";
import QuizCard from "@/app/components/QuizCard";
import UploadQuizForm from "@/app/components/UploadQuizForm";
import Link from "next/link";
import React from "react";
export const dynamic = "force-dynamic";
const page = async ({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}) => {
  const page = +searchParams?.page || 1;
  const data = await getMyPlayedQuizzes(page);
  const attemptedQuizzes = data.attemptedQuizzes;
  const totalPages = data.totalPages;
  console.log(attemptedQuizzes);
  return (
    <section className="pt-10">
      {" "}
      <MaxWidthWrapper className=" rounded-md min-h-[80vh] ">
        <FloatingTool />
        <Heading
          text={`Quizzes I Played ! `}
          paragraph={`Total Quizzes You Played up to now :${data.totalAttemptedQuizzes}`}
        />
        {attemptedQuizzes.length < 1 && (
          <Empty text="You Attempted no quizzes yet !">
            <Link className=" underline text-pink-500" href="/">
              GO Play Now !
            </Link>
          </Empty>
        )}
        <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-8    flex-wrap">
          {attemptedQuizzes.map((quiz: any, i: number) => {
            if (!quiz.quizId) return null;
            return (
              <QuizCard
                points={quiz.points}
                href={`/quiz/${quiz._id}/results`}
                key={i}
                card={true}
                quiz={quiz.quizId}
              />
            );
          })}
        </div>
        <div className="flex gap-40 items-center fixed right-10 bottom-5">
          <DialogCustom
            title="Want to Create a New Quiz?"
            btn={<GlobalButton text="Create one now" />}
            content={<UploadQuizForm />}
          />
        </div>
        <PaginationHome
          hasNext={page < totalPages && data.attemptedQuizzes.length < data.totalAttemptedQuizzes}
          length={data.totalAttemptedQuizzes}
          totalPages={totalPages}
        />
      </MaxWidthWrapper>
    </section>
  );
};

export default page;
