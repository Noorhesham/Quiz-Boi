"use client";
import { useGetFollowing } from "@/utils/queryFunctions";
import React, { useState } from "react";
import Spinner from "./Spinner";
import { UserProps } from "@/types";
import User from "./User";
import GlobalButton from "./GlobalButton";
import { FaSpinner } from "react-icons/fa";

const FollowingList = ({ id, length }: { id: string; length: number }) => {
  const { following, isLoading, fetchNextPage, hasNextPage,isFetchingNextPage } = useGetFollowing(id,);
  const handleLoadMore = () => {
    if (hasNextPage && !isLoading) fetchNextPage();
  };
  return (
    <div className=" flex flex-col min-h-[20vh] items-start gap-3">
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          {following?.pages.flat(1).map((user: UserProps, i: number) => (
            <User key={i} author={user} />
          ))}
          {following && length > following.pages.flat(1).length && hasNextPage && (
            <GlobalButton className=" mt-5" text="Load More" onClick={handleLoadMore} />
          )}
          {isFetchingNextPage&&<FaSpinner className="animate-spin"/>}
        </>
      )}
    </div>
  );
};

export default FollowingList;
