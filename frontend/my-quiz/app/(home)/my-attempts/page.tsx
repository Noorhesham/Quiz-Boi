import { getMyPlayedQuizzes } from "@/actions/GetPlayedQuizzes";
import DialogCustom from "@/app/components/DialogCustom";
import { Empty } from "@/app/components/Empty";
import GlobalButton from "@/app/components/GlobalButton";
import Heading from "@/app/components/Heading";
import Motion from "@/app/components/Motion";
import QuizCard from "@/app/components/QuizCard";
import UploadQuizForm from "@/app/components/UploadQuizForm";
import Link from "next/link";
import React from "react";
export const dynamic = "force-dynamic";
const page = async () => {
  const attemptedQuizzes = await getMyPlayedQuizzes()
  console.log(attemptedQuizzes)
  return (
    <section className=" pb-20 pt-20 md:pt-32 px-4 md:px-20  rounded-md min-h-[80vh] ">
      <Heading text={`Quizzes I Played ! `} paragraph={`Total Quizzes You Played up to now :${attemptedQuizzes.length}`}/>
      {attemptedQuizzes.length < 1 && (
        <Empty text="You Attempted no quizzes yet !">
          <Link className=" underline text-pink-500" href="/">
            GO Play Now !
          </Link>
        </Empty>
      )}
      <Motion className=" grid grid-cols-1 py-2 px-4   md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8   md:p-10 flex-wrap">
        {attemptedQuizzes.map((quiz: any, i: number) => {
          if (!quiz.quizId) return null;
          return (
            <QuizCard points={quiz.points}
              href={`/quiz/${quiz.quizId.usersAttempted?.at(-1)}/results`}
              key={i} click={false}
              card={true}
              quiz={quiz.quizId}
            />
          );
        })}
      </Motion>
      <div className="flex gap-40 items-center fixed right-10 bottom-5">
        <DialogCustom
          title="Want to Create a New Quiz?"
          btn={<GlobalButton text="Create one now" />}
          content={<UploadQuizForm />}
        />
      </div>
    </section>
  );
};

export default page;
