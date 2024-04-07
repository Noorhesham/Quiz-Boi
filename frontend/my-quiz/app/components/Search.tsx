import { Cross2Icon } from "@radix-ui/react-icons";
import React from "react";
import { IoIosSearch } from "react-icons/io";

const Search = ({ setQuery, query }: { setQuery: any; query: string }) => {
  return (
    <div
      className={`flex relative w-[60%] bg-gray-100 hover:bg-gray-200 duration-200 text-3xl py-2 px-4 rounded-full m-auto items-center`}
    >
      <button
        className={`transition-all p-1 duration-100 outline-none   justify-end 
      `}
      >
        <IoIosSearch />
      </button>
      <input
        placeholder={`Search Quizzes By Title,Tag`}
        onChange={(e) => setQuery(e.target.value)}
        value={query}
        className={` placeholder:text-gray-400 bg-transparent w-[100%]  ml-1 outline-none text-xl h-[2rem] `}
        type="text"
      />
      <button
        className="p-1"
        onClick={() => {
          setQuery("");
        }}
      >
        <Cross2Icon />
      </button>
    </div>
  );
};

export default Search;
