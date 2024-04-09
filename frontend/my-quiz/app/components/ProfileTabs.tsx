"use client";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UserProps } from "@/types";
import QuizCard from "./QuizCard";
import { Suspense } from "react";
import Spinner from "./Spinner";
import { Empty } from "./Empty";
import Link from "next/link";

export default function ProfileTabs({ user }: { user: UserProps }) {
  return (
    <Tabs defaultValue="published" className=" py-3 px-6 min-w-[80%]">
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
            <CardContent className="grid  grid-cols-2 lg:grid-cols-3 gap-3 ">
              {user.quizzes
                .filter((q) => q.published)
                .map((quiz, i) => (
                  <QuizCard key={i} edit={true} card={true} quiz={quiz} />
                ))}
              {user.quizzes.length === 0 && (
                <Empty text="You have Published No Quizzes yet">
                  <Link className=" hover:underline hover:text-pink-400 duration-150" href={"/my-quizzes?upload"}>
                    Go Now?
                  </Link>
                </Empty>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="attemptedQuizzes">
          <Card>
            <CardHeader>
              <CardTitle>Attempted Quizzes</CardTitle>
            </CardHeader>
            <CardContent className="grid  grid-cols-2 lg:grid-cols-3 gap-3 ">
              {user.attemptedQuizzes.map((quiz, i) => (
                <QuizCard
                  href={`/quiz/${quiz.quizId.usersAttempted?.at(-1)}/results`}
                  key={i}
                  card={true}
                  quiz={quiz.quizId}
                />
              ))}
              {user.attemptedQuizzes.length === 0 && (
                <Empty text="You have not attempted any Quiz yet">
                  <Link className=" hover:underline hover:text-pink-400 duration-150" href={"/"}>
                    Go Now?
                  </Link>
                </Empty>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="liked">
          <Card>
            <CardHeader>
              <CardTitle>Liked Quizzes</CardTitle>
            </CardHeader>
            <CardContent className="grid  grid-cols-2 lg:grid-cols-3 gap-3 ">
              {user.likedQuizzes
                .filter((q) => q.quiz.published)
                .map((quiz, i) => (
                  <QuizCard key={i} card={true} quiz={quiz.quiz} />
                ))}
              {user.likedQuizzes.length === 0 && (
                <Empty text="You have liked any Quizzes \">
                  <Link className=" hover:underline hover:text-pink-400 duration-150" href={"/"}>
                    Explore ?
                  </Link>
                </Empty>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Suspense>
    </Tabs>
  );
}
