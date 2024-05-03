"use client";
import { useGetFollowers } from "@/utils/queryFunctions";
import User from "./User";
import Spinner from "./Spinner";
import { UserProps } from "@/types";
import GlobalButton from "./GlobalButton";
import { FaSpinner } from "react-icons/fa";

const FollowList = ({ id, length }: { id: string; length: number }) => {
  const { followers, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } = useGetFollowers(id);
  const handleLoadMore = () => {
    if (hasNextPage && !isLoading) fetchNextPage();
  };
  return (
    <div className=" flex flex-col min-h-[20vh] items-start gap-3">
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          {followers?.pages.flat(1).map((user: UserProps, i: number) => (
            <User key={i} author={user} />
          ))}
          {isFetchingNextPage && <FaSpinner className="animate-spin" />}
          {followers && length > followers.pages.flat(1).length && hasNextPage && (
            <GlobalButton className=" mt-5" text="Load More" onClick={handleLoadMore} />
          )}
        </>
      )}
    </div>
  );
};

export default FollowList;
