"use client";
import { useGetUsersMiniPublic,  } from "@/utils/queryFunctions";
import React from "react";
import User from "./User";
import Spinner from "./Spinner";

const FollowList = ({ list }: { list: Array<string> }) => {
  const { users, isLoading } = useGetUsersMiniPublic(list);
  console.log(users, list);
  return (
    <div className=" flex flex-col min-h-[20vh] items-start gap-3">
      {isLoading && <Spinner />}
      {users?.map((user,i) => (
        <User key={i} author={user} />
      ))}
    </div>
  );
};

export default FollowList;
