"use client";
import Search from "./Search";
import Heading from "./Heading";
import { QuizProps } from "@/types";
import QuizCard from "./QuizCard";
import Categories from "./Categories";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Empty } from "./Empty";

const Feed = ({ quizzes,categories }: { quizzes: Array<QuizProps> ,categories:any}) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  function handleSearch(term: string) {
    console.log(term);
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set("categorey", term);
    } else {
      params.delete("categorey");
    }
    replace(`${pathname}?${params.toString()}`, { scroll: false });
  }
  return (
    <section className=" pt-5">
      <div className="p-8 flex md:flex-row flex-col items-center justify-between">
        <Heading text="Find your desired quiz now !" />
        <h3
          onClick={() => handleSearch("")}
          className="text-3xl font-semibold text-red-400 hover:underline cursor-pointer duration-150"
        >
          Reset Categories
        </h3>
      </div>
      <Categories categories={categories} setCategorey={handleSearch} />
      {quizzes.length === 0 && (
        <Empty image="/bad.png" text={`There are no quizzes associated with ${searchParams.get("categorey")} yet !`} />
      )}
      <div className=" grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 items-center p-10 gap-5">
        {quizzes?.map((quiz) => (
          <QuizCard quiz={quiz} />
        ))}
      </div>
    </section>
  );
};

export default Feed;
