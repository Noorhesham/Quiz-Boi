"use client";
import Heading from "./Heading";
import Categories from "./Categories";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import DialogCustom from "./DialogCustom";
import AllCategories from "./AllCategories";
import { IoIosArrowForward } from "react-icons/io";
import MaxWidthWrapper from "./MaxWidthWrapper";

const Filter = ({ categories }: { categories: any }) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  function handleSearch(term: string) {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set("categorey", term);
      params.set("page", "1");
    } else {
      params.delete("categorey");
    }
    replace(`${pathname}?${params.toString()}`, { scroll: false });
  }

  return (
    <MaxWidthWrapper className=" relative pt-5">
      <div className="md:p-8 p-4 flex md:flex-row flex-col items-start justify-between">
        <Heading
          text="Find your desired quiz now !"
          paragraph="You can Filter the Quizzes by Topics here... just click on the desired topic and quizzes will be filtered ! 🚀👩‍🚀 "
        />
        <div className="flex items-center justify-between gap-4 ">
          <button
            onClick={() => handleSearch("")}
            className=" text-lg md:text-xl font-semibold text-nowrap text-purple-400 hover:underline hover:text-purple-500 cursor-pointer duration-150"
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
                className=" text-lg md:text-xl flex items-center font-semibold text-nowrap text-purple-400 hover:underline hover:text-purple-500 cursor-pointer duration-150"
              >
                View All <IoIosArrowForward />
              </button>
            }
          />
        </div>
      </div>
      <Categories categories={categories} setCategorey={handleSearch} />
    </MaxWidthWrapper>
  );
};

export default Filter;
