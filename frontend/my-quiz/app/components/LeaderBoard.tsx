"use client";
import { useGetAttempts } from "@/utils/queryFunctions";
import React, { use } from "react";
import Spinner from "./Spinner";
import User from "./User";

const LeaderBoard = ({ attempts }: { attempts: Array<any> }) => {
  const { attemptedUsers, isLoading } = useGetAttempts(attempts.slice(0, 3));
  console.log(attemptedUsers);
  if (isLoading) return <Spinner />;
//   const { userId, percentage, attemptedAt, totalPoints } = attemptedUsers;
  return <section className=" relative ">
    {attemptedUsers?.map(user=><div>
        <User author={user.userId}/>
    </div>)}
  </section>;
};

export default LeaderBoard;
