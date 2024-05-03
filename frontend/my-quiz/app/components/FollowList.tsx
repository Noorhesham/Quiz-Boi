"use client";
import { useGetFollowers, useGetFollowing, useGetUsersMiniPublic,  } from "@/utils/queryFunctions";
import React, { useState } from "react";
import User from "./User";
import Spinner from "./Spinner";
import { UserProps } from "@/types";

const FollowList = ({ role,id }: { role:string,id:string}) => {
  const [page,setPage]=useState(1)
  const {followers,isLoading}=useGetFollowers(id,page)
  const {following,isLoading:isLoading2}=useGetFollowing(id,page)
  const users=role==='followers'?followers:following;

  return (
    <div className=" flex flex-col min-h-[20vh] items-start gap-3">
      {isLoading ||isLoading2&& <Spinner />}
      {users.map((user:UserProps,i:number) => (
        <User key={i} author={user} />
      ))}
    </div>
  );
};

export default FollowList;
