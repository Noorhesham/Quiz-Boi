"use client";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UserProps } from "@/types";
import QuizCard from "./QuizCard";
import { Suspense, useState } from "react";
import Spinner from "./Spinner";
import { Empty } from "./Empty";
import Link from "next/link";
import GlobalButton from "./GlobalButton";
import LikedQuizzes from "./LikedQuizzes";

export default function ProfileTabs({ user }: { user: UserProps }) {
  const [publishedPagination, setPublishedPagination] = useState(5);
  const handlePublishedLoadMore = () => {
    setPublishedPagination((prevPagination) => prevPagination + 5);
  };

console.log(user.likedQuizzes)
  return (
    <Tabs defaultValue="published" className="py-3 px-6 min-w-[80%]">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="published">Published Quizzes</TabsTrigger>
        <TabsTrigger value="liked">Liked Quizzes</TabsTrigger>
        <TabsTrigger value="attemptedQuizzes">Attempted Quizzes</TabsTrigger>
      </TabsList>
      <Suspense fallback={<Spinner />}>
        <TabsContent value="published">
          <Card>
            <CardHeader>
              <CardTitle>Published Quizzes</CardTitle>
            </CardHeader>
            <CardContent className="  grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 items-stretch p-10 gap-5">
              {user.quizzes
                .filter((q) => q?.published)
                .slice(0, publishedPagination)
                .map((quiz, i) => (
                  <QuizCard key={i} edit={true} card={true} quiz={quiz} />
                ))}
              {user.quizzes.length === 0 && (
                <Empty text="You have Published No Quizzes yet">
                  <Link className="hover:underline hover:text-pink-400 duration-150" href={"/my-quizzes?upload"}>
                    Go Now?
                  </Link>
                </Empty>
              )}
            </CardContent>
            <CardFooter className="flex items-center justify-center">
              {user.quizzes.filter((q) => q.published).length > publishedPagination && (
                <GlobalButton text="Load More" onClick={handlePublishedLoadMore} />
              )}
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="liked">
          <Card>
            <CardHeader>
              <CardTitle>Liked Quizzes</CardTitle>
            </CardHeader>
            <CardContent className=" grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 items-stretch p-10 gap-5">
              <LikedQuizzes/>
            </CardContent>
            <CardFooter className="flex items-center justify-center">
              {/* {user.likedQuizzes.length > likedPagination && (
                <GlobalButton text="Load More" onClick={handleLikedLoadMore} />
              )} */}
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="attemptedQuizzes">
          <Card>
            <CardHeader>
              <CardTitle>Attempted Quizzes</CardTitle>
            </CardHeader>
            <CardContent className=" grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 items-stretch p-10 gap-5">
              {/* {user.attemptedQuizzes.slice(0, attemptedPagination).map((quiz, i) =>{
                 if(!quiz.quizId) return null
                  return (<QuizCard
                    key={i}
                    href={`/quiz/${quiz.quizId?.usersAttempted?.at(-1)}/results`}
                    card={true}
                    quiz={quiz.quizId}
                  />)
                
              })} */}
              {/* {user.attemptedQuizzes.length === 0 && (
                <Empty text="You have not attempted any Quiz yet">
                  <Link className="hover:underline hover:text-pink-400 duration-150" href={"/"}>
                    Go Now?
                  </Link>
                </Empty>
              )} */}
            </CardContent>
            <CardFooter className="flex items-center justify-center">
              {/* {user.attemptedQuizzes.length > attemptedPagination && (
                <GlobalButton text="Load More" onClick={handleAttemptedLoadMore} />
              )} */}
            </CardFooter>
          </Card>
        </TabsContent>
      </Suspense>
    </Tabs>
  );
}
