import { GetQuestions } from "@/actions/GetQuestion";
import { GetAttempt } from "@/actions/getAttempt";
import Celebrate from "@/app/components/Celebrate";
import Heading from "@/app/components/Heading";
import LeaderBoard from "@/app/components/LeaderBoard";
import Results from "@/app/components/Results";

const page = async ({ params }: { params: { id: string } }) => {
  const attempt = await GetAttempt(params.id);
  const { questions, usersAttempted } = attempt.quizId;
  const list=await Promise.all(questions.map((question:any) => GetQuestions(question)))
  const answers = attempt.answers;
  const howGood =
    (attempt.percentage <= 20||attempt.percentage<=0)
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
      <Heading text={`Your percentage is ${Math.trunc(attempt.percentage)}%`}/>
      {attempt.username&&<Heading text={`Hey ${attempt.username}`}/>}
      <Results answers={answers} list={list} />
      {/* <LeaderBoard attempts={usersAttempted}/> */}
    </main>
  );
};

export default page;
