import { GetQuiz } from "@/actions/GetQuiz";
import { getUser } from "@/actions/getUser";
import AddQuestionIcon from "@/app/components/AddQuestionIcon";
import DeleteQuizBtn from "@/app/components/DeleteQuizBtn";
import EditQuizBtn from "@/app/components/EditQuizBtn";
import { Empty } from "@/app/components/Empty";
import Heading from "@/app/components/Heading";
import NotFound from "@/app/components/NotFound";
import PublishQuiz from "@/app/components/PublishQuiz";
import Question from "@/app/components/Question";
import Topic from "@/app/components/Topic";
import { QuestionProps, QuizProps } from "@/types";
import { redirect } from "next/navigation";
import React from "react";
export const dynamic = "force-dynamic";

const page = async ({ params }: { params: { id: string } }) => {
  const user=await getUser()
  if(!user)  return redirect("/");
  const { quiz }: { quiz: QuizProps } = await GetQuiz(params.id);
  console.log(quiz);
  if (!quiz) return <NotFound text="This Quiz is not available" />;
  return (
    <main className="text-gray-50 pt-20 sm:pt-24 flex flex-col gap-3 p-5 md:p-10 ">
      <div className="flex flex-wrap justify-between items-center">
        <Heading text={`Your ${quiz.title} quiz is here ! Get prepared to publish it !`} />
      <div className="flex items-center gap-2">
      <EditQuizBtn quiz={quiz} />
        <DeleteQuizBtn quiz={quiz} />
      </div>
      </div>

      <Heading icon={<AddQuestionIcon type="icon" />} text="All Questions" image="/ques.png" />
      <ul className="flex items-center gap-3">
        <h4 className=" text-2xl mt-2 font-semibold">Related Topics :</h4>
        {quiz.tags.map((tag: string) => (
          <Topic tag={tag} />
        ))}
      </ul>

      <section className=" flex flex-col gap-5 px-10 py-5">
        {quiz.questions.length < 1 && <Empty text="You have not added any question yet !" />}
        {quiz.questions.map((question: QuestionProps, i: number) => (
          <Question key={i} index={i + 1} question={question} />
        ))}
      </section>
      <div className="flex gap-40 items-center fixed right-10 bottom-5">
        <AddQuestionIcon type="btn" />
        {!quiz.published && <PublishQuiz quiz={quiz} />}
      </div>
    </main>
  );
};
export default page;
