import Welcome from "../components/Welcome";
import Landing from "../components/Landing";
import Feed from "../components/Feed";
import { GetTags } from "@/actions/GetTags";
import { FilterQuizzesHome } from "@/actions/FilterQuizHome";
import NotFound from "../components/NotFound";
import BecauseYouFollowed from "../components/BecauseYouFollowed";

export const dynamic='force-dynamic'
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
  const { data, totalPages, totalResults, results } = await FilterQuizzesHome(categorey, page);
  const categories = await GetTags();
  const isNext = page < totalPages && results < totalResults;
  if (!data) return <NotFound text="there are no quizzes" />;
  return (
    <main className="flex w-full min-h-[100vh] flex-col relative  items-stretch justify-center">
      <Landing />
      <Welcome />
      <BecauseYouFollowed/>
      {<Feed hasNext={isNext} categories={categories} totalPages={totalPages} quizzes={data?.quizzes} />}
    </main>
  );
}
