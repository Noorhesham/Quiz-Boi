import Welcome from "../components/Welcome";
import Landing from "../components/Landing";
import Feed from "../components/Feed";
import { GetTags } from "@/actions/GetTags";
import { FilterQuizzesHome } from "@/actions/FilterQuizHome";

export default async function Page({
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
    <main className="flex w-full min-h-[100vh] flex-col relative  items-stretch justify-center">
      <Landing />
      <Welcome />
      <Feed categories={categories} quizzes={quizzes} />
    </main>
  );
}
