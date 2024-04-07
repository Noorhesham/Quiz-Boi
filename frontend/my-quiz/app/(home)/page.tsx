import { API_URL } from "@/constants";
import Welcome from "../components/Welcome";
import Landing from "../components/Landing";
import Feed from "../components/Feed";
export const dynamic = "force-dynamic";
export default async function Home() {
  const quizzes = await fetch(`${API_URL}/quiz`).then((res) => res.json());
  console.log(quizzes);
  return (
    <main className="flex  min-h-[100vh] flex-col relative  items-stretch justify-center">
      <Landing />
      <Welcome />
      <Feed quizzes={quizzes.data.quizzes} />
    </main>
  );
}
