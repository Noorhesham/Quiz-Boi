import { GetAttempt } from "@/actions/getAttempt";
import Celebrate from "@/app/components/Celebrate";
import Results from "@/app/components/Results";

const page = async ({ params }: { params: { id: string } }) => {
  const attempt = await GetAttempt(params.id);
  const { questions, usersAttempted } = attempt.quizId;
  const answers = attempt.answers;
  const howGood =
    attempt.percentage <= 20
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
  console.log(attempt);
  return (
    <main className=" relative spacer  flex flex-col items-center">
      <Celebrate text={`You Scored ${attempt.points}`} img={howGood} />
      <Results answers={answers} list={questions} />
    </main>
  );
};

export default page;
