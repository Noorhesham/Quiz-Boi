import { GetAttemptStats } from "@/actions/getAttempt";
import { getUserDetails } from "@/actions/getUser";
import ProfileTabs from "@/app/components/ProfileTabs";
import UserCard from "@/app/components/UserCard";
import UserData from "@/app/components/UserData";
import React from "react";

const page = async () => {
  const user = await getUserDetails();
  const stats = await GetAttemptStats();
  console.log(stats);
  return (
    <section className="pt-20  flex items-center justify-center flex-col">
      <UserCard mine={true} user={user} />
      <div className=" grid grid-cols-4">
        <div className=" col-span-2">
          <ProfileTabs user={user} />
        </div>
        <UserData />
      </div>
    </section>
  );
};

export default page;
