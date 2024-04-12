"use client";
import Search from "./Search";
import Heading from "./Heading";
import { QuizProps } from "@/types";
import QuizCard from "./QuizCard";
import Categories from "./Categories";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Empty } from "./Empty";
import DialogCustom from "./DialogCustom";
import AllCategories from "./AllCategories";
import { IoIosArrowForward } from "react-icons/io";
import PaginationHome from "./Pagination";

const Feed = ({ quizzes, categories,totalPages }: { quizzes: Array<QuizProps>; categories: any,totalPages:number }) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  function handleSearch(term: string) {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set("categorey", term);
      params.set("page","1")
    } else {
      params.delete("categorey");
    }
    replace(`${pathname}?${params.toString()}`, { scroll: false });
  }
  function handlePagination(page:string){
    const params = new URLSearchParams(searchParams);
    console.log(page)
    if (page) params.set("page",page)
    else params.delete("page"); 
    replace(`${pathname}?${params.toString()}`, { scroll: false });
  }
  return (
    <section className=" pt-5">
      <div className="p-8 flex md:flex-row flex-col items-stretch justify-between">
        <Heading text="Find your desired quiz now !" />
        <div className="flex items-center gap-10">
          <button
            onClick={() => handleSearch("")}
            className="text-3xl font-semibold text-red-400 hover:underline hover:text-red-500 cursor-pointer duration-150"
          >
            Reset Categories
          </button>
          <DialogCustom
            title="Filter By Your Fav Topic !"
            description="Choose Your best topic here to filter your quizzes"
            content={<AllCategories setCategorey={handleSearch} />}
            btn={
              <button
                onClick={() => handleSearch("")}
                className="text-3xl flex items-center font-semibold text-red-400 underline hover:text-red-500 cursor-pointer duration-150"
              >
                View All <IoIosArrowForward />
              </button>
            }
          />
        </div>
      </div>
      <Categories categories={categories} setCategorey={handleSearch} />
      {(quizzes?.length === 0||!quizzes) && (
        <Empty image="/bad.png" text={`There are no quizzes associated with ${searchParams.get("categorey")} yet !`} />
      )}
      <div className=" grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 items-stretch p-10 gap-5">
        {quizzes?.map((quiz, i) => (
          <QuizCard key={i} quiz={quiz} />
        ))}
      </div>
      <PaginationHome totalPages={totalPages} length={quizzes.length} onClick={handlePagination}/>
    </section>
  );
};

export default Feed;
