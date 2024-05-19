import { GetQuestions } from "@/actions/GetQuestion";
import { GetAttempt } from "@/actions/getAttempt";
import Celebrate from "@/app/components/Celebrate";
import FloatingTool from "@/app/components/FloatingTool";
import Heading from "@/app/components/Heading";
import LeaderBoard from "@/app/components/LeaderBoard";
import Results from "@/app/components/Results";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const page = async ({ params }: { params: { id: string } }) => {
  const attempt = await GetAttempt(params.id);
  const { questions } = attempt.quizId;
  const list = await Promise.all(questions.map((question: any) => GetQuestions(question)));
  const answers = attempt.answers;
  console.log(attempt);
  const howGood =
    attempt.percentage <= 20 || attempt.percentage <= 0
      ? "bad"
      : attempt.percentage <= 34
      ? "ok"
      : attempt.percentage <= 50
      ? "meh"
      : attempt.percentage <= 70
      ? "good"
      : attempt.percentage <= 90
      ? "great"
      : "complete";

  return (
    <main className=" relative spacer  flex flex-col items-center">
      <Celebrate text={`You Scored ${attempt.points}`} img={howGood} />
      <FloatingTool />
      <Tabs defaultValue="results" className="py-3 px-6 w-full  xl:w-[75%]">
        <TabsList className="grid md:text-base text-sm grid-cols-2">
          <TabsTrigger value="results">Your Results</TabsTrigger>
          <TabsTrigger value="board">LeaderBoard</TabsTrigger>
        </TabsList>
        <TabsContent className="mt-10 w-full" value="results">
          <Heading className=" text-center" text={`Your percentage is ${Math.trunc(attempt.percentage)}%`} />
          {attempt.username && <Heading className=" text-center" text={`Hey ${attempt.username}`} />}
          <Results answers={answers} list={list} />
        </TabsContent>
        <TabsContent value="board" className=" min-w-full">
          <LeaderBoard me={params.id} id={attempt.quizId.id} />
        </TabsContent>
      </Tabs>
    </main>
  );
};

export default page;
