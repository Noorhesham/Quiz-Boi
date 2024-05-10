import { useGetUsers } from "@/utils/queryFunctions";
import React, { useEffect, useState } from "react";
import Search from "./Search";
import { UserProps } from "@/types";
import { useInView } from "react-intersection-observer";
import AuthorSkeleton from "./AuthorSkeleton";
import Author from "./Author";

const AllAuthors = () => {
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState(""); 
  const { data, isLoading, error, hasNextPage, fetchNextPage, isFetchingNextPage } = useGetUsers(debouncedQuery);
  const { ref, inView } = useInView();
  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedQuery(query);
    }, 500);

    return () => {
      clearTimeout(timerId);
    };
  }, [query]);
  useEffect(
    function () {
      if (inView && hasNextPage) fetchNextPage();
    },
    [inView, hasNextPage, fetchNextPage]
  );
  if (isLoading) return <AuthorSkeleton />;
  console.log(data);
  return (
    <section className=" min-h-[40vh] relative">
      <Search query={query} setQuery={setQuery} />
      <section className="flex relative mt-5 gap-4 flex-col">
        {data?.pages.flat(1).map((user: UserProps) => (
          <Author author={user} />
        ))}
        {(hasNextPage || isFetchingNextPage) && (
          <div ref={ref} className=" w-full">
            <div className="w-8 h-8 left-1/2 -bottom-2  absolute mx-auto mt-auto">
              <img src="/loading3.png" className=" animate-spin" alt="" />
            </div>
          </div>
        )}
        {(hasNextPage && isFetchingNextPage) && <AuthorSkeleton />}
      </section>
    </section>
  );
};

export default AllAuthors;
