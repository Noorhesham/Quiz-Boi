import Welcome from "../components/Welcome";
import Landing from "../components/Landing";
import Filter from "../components/Filter";
import { GetTags } from "@/actions/GetTags";
import BecauseYouFollowed from "../components/BecauseYouFollowed";
import { getUser } from "@/actions/getUser";
import { GetSuggesstions } from "@/actions/getSuggesstions";
import { Metadata } from "next";
import { getAuthors } from "@/actions/TopAuthors";
import Authors from "../components/Authors";
import FloatingTool from "../components/FloatingTool";
import ThreeDSpace from "../components/ThreeDSpace";
import { Suspense } from "react";
import QuizzesList from "../components/QuizzesList";
export const metadata: Metadata = {
  title: "Quiz Boi - Home",
  description: "Explore a wide range of quizzes on Quiz Boi. Find quizzes based on your interests and preferences.",
  icons: { icon: "/favicon.ico" },
};
export default async function Page({
  searchParams,
}: {
  searchParams?: {
    categorey?: string;
    page?: number;
  };
}) {
  const user = await getUser();
   const [authors,suggesstions,categories]=await Promise.all([getAuthors(),GetSuggesstions(),GetTags()])
  const categorey = searchParams?.categorey || "";
  const page = searchParams?.page || 1;
  return (
    <main className="flex max-w-full relative overflow-hidden scroll-smooth w-full min-h-[100vh] flex-col   items-stretch justify-center">
      <Landing />
      <Welcome />
      <FloatingTool />
      {suggesstions && (
        <BecauseYouFollowed DELAY={4000} text="Based On Your " span="Followings :" suggesstions={suggesstions} />
      )}
      <Authors DELAY={5000} text="Top" span=" Authors :" suggesstions={authors} />
      <Filter categories={categories} />
      <Suspense
        key={categorey}
        fallback={
          <div className=" w-full  z-50">
            <div className="w-8 h-8 left-1/2 -bottom-2  absolute mx-auto mt-auto">
              <img src="/loading3.png" className=" animate-spin" alt="" />
            </div>
          </div>
        }
      >
        <QuizzesList page={page} categorey={categorey} />
      </Suspense>
      <div className="flex px-5 md:px-10  flex-col md:mb-20 md:flex-row items-center">
        <ThreeDSpace className="w-full md:w-1/2 lg:w-[80%] h-[400px] md:h-[500px]" />
        <div className="text-center mt-16 text-gray-100 md:text-left md:w-1/2 p-4">
          <h1 className="text-3xl font-bold">Fly In the space of the Quiz Boi!</h1>
          <p className="mt-4">
            Explore engaging quizzes tailored to your interests. Create and upload your own quizzes, inspiring others
            with diverse topics. Learn and grow while having fun. Connect with friends, compete, and collaborate on
            quizzes. Climb the leaderboards to showcase your skills. Follow your favorite topics and creators to stay
            updated with the latest quizzes. With dynamic visuals and instant feedback, Quiz Boi offers an interactive
            and immersive experience. Join us today and discover endless quizzes, learning, and fun.
          </p>
        </div>
      </div>
    </main>
  );
}
