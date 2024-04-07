"use client";

import { useState } from "react";
import Search from "./Search";
import Heading from "./Heading";
import { QuizProps } from "@/types";
import QuizCard from "./QuizCard";

const Feed = ({ quizzes }: { quizzes: Array<QuizProps> }) => {
  const [query, setQuery] = useState("");
  return (
    <section className=" min-h-[80vh] pt-5">
      <div className=" p-8">
        <Heading text="Find your desired quiz now !" />
      </div>
      <Search query={query} setQuery={setQuery} />
      <div className=" grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 items-center p-10 gap-5">
        {!query && quizzes?.map((quiz) => <QuizCard quiz={quiz} />)}
      </div>
    </section>
  );
};

export default Feed;
