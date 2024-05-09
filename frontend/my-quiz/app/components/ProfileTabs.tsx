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

export default function ProfileTabs({ user,id }: { user: UserProps,id?:string }) {
  const [publishedPagination, setPublishedPagination] = useState(5);
  const handlePublishedLoadMore = () => {
    setPublishedPagination((prevPagination) => prevPagination + 5);
  };
  return (
    <Tabs defaultValue="published" className="py-3 mt-28 md:mt-20 px-6 min-w-[80%]">
      <TabsList className="grid w-full md:text-base text-sm grid-cols-3">
        <TabsTrigger value="published">Published Qs</TabsTrigger>
        <TabsTrigger value="liked">Liked Qs</TabsTrigger>
        <TabsTrigger value="attemptedQuizzes">Attempted Qs</TabsTrigger>
      </TabsList>
      <Suspense fallback={<Spinner />}>
        <TabsContent value="published">
          <Card>
            <CardHeader>
              <CardTitle>Published Quizzes</CardTitle>
            </CardHeader>
            <CardContent className=" min-w-full  grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 items-stretch md:p-10 gap-5">
              {user.quizzes
                .filter((q) => q?.published)
                .slice(0, publishedPagination)
                .map((quiz, i) => (
                  <QuizCard key={i} edit={true} card={true} quiz={quiz} />
                ))}
              {user.quizzes.length === 0 && (
                <Empty
                  link="/my-quizzes?upload"
                  linkText="Go publish your own quiz Now"
                  text="You have Published No Quizzes yet"
                />
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
            <CardContent className=" min-w-full min-h-[40vh]">
              <LikedQuizzes id={id} />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="attemptedQuizzes">
          <Card>
            <CardHeader>
              <CardTitle>Attempted Quizzes</CardTitle>
            </CardHeader>
            <CardContent className=" min-w-full min-h-[40vh]">
            <LikedQuizzes play={true} id={id} />
            </CardContent>
          </Card>
        </TabsContent>
      </Suspense>
    </Tabs>
  );
}
