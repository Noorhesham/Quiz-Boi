import Welcome from "../components/Welcome";
import Landing from "../components/Landing";
import Feed from "../components/Feed";
import { FilterQuizzesHome } from "@/actions/FilterQuizHome";
import { GetTags } from "@/actions/GetTags";
export const dynamic = "force-dynamic";
export default async function Home({
  searchParams,
}: {
  searchParams?: {
    categorey?: string;
    page?: number;
  };
}) {
  const categorey = searchParams?.categorey || "";
  const page = searchParams?.page || 1;
  const quizzes = await FilterQuizzesHome(categorey, page);
  const categories=await GetTags()
  return (
    <main className="flex w-full \  min-h-[100vh] flex-col relative  items-stretch justify-center">
      <Landing />
      <Welcome />
      {<Feed categories={categories} quizzes={quizzes} />}
    </main>
  );
}
