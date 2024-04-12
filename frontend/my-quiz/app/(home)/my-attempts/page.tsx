import { getUserDetails } from "@/actions/getUser";
import DialogCustom from "@/app/components/DialogCustom";
import { Empty } from "@/app/components/Empty";
import GlobalButton from "@/app/components/GlobalButton";
import Heading from "@/app/components/Heading";
import QuizCard from "@/app/components/QuizCard";
import UploadQuizForm from "@/app/components/UploadQuizForm";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";
export const dynamic = 'force-dynamic'
const page = async () => {
  const user = await getUserDetails();
  if(!user)  return redirect("/");
  return (
    <section className=" py-10 md:pt-24  px-20  rounded-md min-h-[80vh] ">
    <Heading text="Quizzes I attempted" />
    {user.attemptedQuizzes.length < 1 && (
      <Empty text="You created no quizzes yet !">
        <Link href='/'>GO Play Now !</Link>
      </Empty>
    )}
      <div className=" grid  md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 p-10  md:p-20 flex-wrap">
      {user.attemptedQuizzes.map((quiz:any, i:number) => (
                <QuizCard
                  href={`/quiz/${quiz.quizId.usersAttempted?.at(-1)}/results`}
                  key={i}
                  card={true}
                  quiz={quiz.quizId}
                />
              ))}
      </div>
    <div className="flex gap-40 items-center fixed right-10 bottom-5">
      <DialogCustom title="Want to Create a New Quiz?"
        btn={<GlobalButton text="Create one now" />}
        content={<UploadQuizForm />}
      />
    </div>
  </section>
  );
};

export default page;
