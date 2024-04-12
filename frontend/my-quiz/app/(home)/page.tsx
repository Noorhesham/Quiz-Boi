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
  const {data,totalPages,totalResults} = await FilterQuizzesHome(categorey, page);
  const categories=await GetTags()
  console.log(totalPages)
  const isNext=page<totalPages
  return (
    <main className="flex w-full min-h-[100vh] flex-col relative  items-stretch justify-center">
      <Landing />
      <Welcome />
      <Feed categories={categories} totalPages={totalPages} quizzes={data.quizzes} />
    </main>
  );
}
