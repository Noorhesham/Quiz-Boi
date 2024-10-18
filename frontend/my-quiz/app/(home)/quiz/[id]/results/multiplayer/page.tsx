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
  const list = await Promise.all(quiz.questions.map((question: any) => GetQuestions(question._id)));

  const attempts = data?.data?.attempt;

  // Calculate total duration for each user
  const durations = attempts.map((attempt) => {
    return attempt.answers.reduce((acc, curr) => acc + curr.duration, 0);
  });

  let theWinnerIndex;
  if (attempts[0].points === attempts[1].points) {
    // If points are equal, the winner is determined by total duration
    theWinnerIndex = durations[0] < durations[1] ? 0 : 1;
  } else {
    // Winner based on points
    theWinnerIndex = attempts[0].points > attempts[1].points ? 0 : 1;
  }

  const theWinner = attempts[theWinnerIndex];
  const theLoser = attempts[1 - theWinnerIndex];

  return (
    <main className="relative spacer flex flex-col items-center">
      <Celebrate
        text={`${theWinner.username || theWinner.userId.name} Won The Game With ${theWinner.points} from ${
          theWinner.totalPoints
        }`}
        img={howGood(theWinner.percentage)}
      />
      <FloatingTool />
      <Tabs defaultValue="winner" className="py-3 px-6 w-full xl:w-[75%]">
        <TabsList className="grid md:text-base text-sm grid-cols-2">
          <TabsTrigger value="winner">{theWinner.username || theWinner.userId.name}</TabsTrigger>
          <TabsTrigger value="loser">{theLoser.username || theLoser.userId.name}</TabsTrigger>
        </TabsList>
        <TabsContent className="mt-5 flex flex-col items-center w-full min-w-full" value="winner">
          <Heading
            className="text-center"
            text={`${theWinner.username || theWinner.userId.name} percentage is ${Math.trunc(theWinner.percentage)}%`}
          />
          <Results answers={theWinner.answers} list={list} />
        </TabsContent>
        <TabsContent value="loser" className="mt-5 flex flex-col items-center w-full min-w-full">
          <Heading
            className="text-center"
            text={`${theLoser.username || theLoser.userId.name} percentage is ${Math.trunc(theLoser.percentage)}%`}
          />
          <Results answers={theLoser.answers} list={list} />
        </TabsContent>
      </Tabs>
    </main>
  );
};

export default page;
