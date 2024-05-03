import Welcome from "../components/Welcome";
import Landing from "../components/Landing";
import Feed from "../components/Feed";
import { GetTags } from "@/actions/GetTags";
import { FilterQuizzesHome } from "@/actions/FilterQuizHome";
import NotFound from "../components/NotFound";
import BecauseYouFollowed from "../components/BecauseYouFollowed";
import { getUser } from "@/actions/getUser";
import { GetSuggesstions } from "@/actions/getSuggesstions";

export default async function Page({
  searchParams,
}: {
  searchParams?: {
    categorey?: string;
    page?: number;
  };
}) {
  const user = await getUser();
  const categorey = searchParams?.categorey || "";
  const page = searchParams?.page || 1;
  const { data, totalPages, totalResults, results } = await FilterQuizzesHome(categorey, page);
  let suggesstions;
  if (user) suggesstions = await GetSuggesstions();
  const categories = await GetTags();
  const isNext = page < totalPages && results < totalResults;
  if (!data) return <NotFound text="there are no quizzes" />;
  return (
    <main className="flex scroll-smooth w-full min-h-[100vh] flex-col relative  items-stretch justify-center">
      <Landing />
      <Welcome />
      {suggesstions && <BecauseYouFollowed img={"/cause.png"} text="Based On Your " span="Followings :" suggesstions={suggesstions} />}
      {user && user.likedQuizzes && <BecauseYouFollowed user={user} />}
      {<Feed hasNext={isNext} categories={categories} totalPages={totalPages} quizzes={data?.quizzes} />}
    </main>
  );
}
