import { Metadata } from "next";
import { Suspense } from "react";
import FloatingTool from "../components/FloatingTool";
import HomeFetches from "../components/HomeFetches";
import Landing from "../components/Landing";
import QuizzesList from "../components/QuizzesList";
import ThreeDSpace from "../components/ThreeDSpace";
import Welcome from "../components/Welcome";
import QuizSkeleton from "../components/QuizSkeleton";
import MaxWidthWrapper from "../components/MaxWidthWrapper";
import MapGames from "../components/MapGames";

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
  return (
    <main className="flex  relative overflow-hidden w-full min-h-[100vh] flex-col   items-stretch justify-center">
      <Landing />
      <Welcome />
      <FloatingTool />
      <Suspense
        fallback={
          <div className=" grid grid-cols-1 justify-center sm:grid-cols-2 lg:grid-cols-3  items-stretch p-10 gap-5">
            {Array.from({ length: 14 }, (_, i) => (
              <QuizSkeleton key={i} />
            ))}
          </div>
        }
      >
        <HomeFetches />
        <MapGames/>
        <QuizzesList page={page} categorey={categorey} />
      </Suspense>
      <MaxWidthWrapper className="flex flex-col md:mb-20 md:flex-row items-center">
        <ThreeDSpace className="w-full md:w-1/2 lg:w-[80%] h-[400px] md:h-[500px]" />
        <div className="text-center mt-16 text-gray-100 md:text-left md:w-1/2 p-4">
          <h1 className="text-3xl font-bold">Fly In the space of the Quiz Boi!</h1>
          <p className="mt-4 body-2">
            Explore engaging quizzes tailored to your interests. Create and upload your own quizzes, inspiring others
            with diverse topics. Learn and grow while having fun. Connect with friends, compete, and collaborate on
            quizzes. Climb the leaderboards to showcase your skills. Follow your favorite topics and creators to stay
            updated with the latest quizzes. With dynamic visuals and instant feedback, Quiz Boi offers an interactive
            and immersive experience. Join us today and discover endless quizzes, learning, and fun.
          </p>
        </div>
      </MaxWidthWrapper>
    </main>
  );
}
