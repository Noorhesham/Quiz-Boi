import { GetQuestions } from "@/actions/GetQuestion";
import { GetQuiz } from "@/actions/GetQuiz";
import { SolveQuiz } from "@/actions/SolveQuestion";
import Celebrate from "@/app/components/Celebrate";
import FloatingTool from "@/app/components/FloatingTool";
import Heading from "@/app/components/Heading";
import Results from "@/app/components/Results";
import { TabsContent, TabsList, TabsTrigger, Tabs } from "@/components/ui/tabs";
import { API_URL } from "@/constants";
import React from "react";
function howGood(percentage: number): string {
  if (percentage <= 0 || percentage <= 20) {
    return "bad";
  } else if (percentage <= 34) {
    return "ok";
  } else if (percentage <= 50) {
    return "meh";
  } else if (percentage <= 70) {
    return "good";
  } else if (percentage <= 90) {
    return "great";
  } else {
    return "complete";
  }
}

const page = async ({ params: { id } }: { params: { id: string } }) => {
  const data = await fetch(`${API_URL}/attempts?sessionId=${id}`, { cache: "no-store" }).then((res) => res.json());
  const quiz = await SolveQuiz(data.data.attempt[0].quizId);
  const attempts = data?.data?.attempt;
  console.log(quiz);
  const { questions } = quiz;
  const theWinnwerIndex = attempts[0].totalPoints > attempts[1].totalPoints ? 0 : 1;
  const theWinnwer = attempts[theWinnwerIndex];
  const theLoser = attempts[1 - theWinnwerIndex];
  console.log(questions);
  return (
    <main className=" relative spacer  flex flex-col items-center">
      <Celebrate
        text={`${theWinnwer.username || theWinnwer.userId.name} Won The Game With ${theWinnwer.points}`}
        img={howGood(theWinnwer.percentage)}
      />
      <FloatingTool />
      <Tabs defaultValue="winner" className="py-3 px-6 w-full  xl:w-[75%]">
        <TabsList className="grid md:text-base text-sm grid-cols-2">
          <TabsTrigger value="winner">{theWinnwer.username || theWinnwer.userId.name}</TabsTrigger>
          <TabsTrigger value="loser">{theLoser.username || theLoser.userId.name}</TabsTrigger>
        </TabsList>
        <TabsContent className="mt-10 w-full" value="winner">
          <Heading
            className=" text-center"
            text={`${theWinnwer.username} percentage is ${Math.trunc(theWinnwer.percentage)}%`}
          />
          {<Heading className=" text-center" text={`Hey ${theWinnwer.username || theWinnwer.userId.name}`} />}
          <Results answers={theWinnwer.answers} list={questions} />
        </TabsContent>
        <TabsContent value="loser" className=" min-w-full">
          <Heading
            className=" text-center"
            text={`${theLoser.username || theLoser.userId.name} percentage is ${Math.trunc(theLoser.percentage)}%`}
          />
          {<Heading className=" text-center" text={`Hey ${theLoser.username || theLoser.userId.name}`} />}
          <Results answers={theLoser.answers} list={questions} />
        </TabsContent>
      </Tabs>
    </main>
  );
};

export default page;
