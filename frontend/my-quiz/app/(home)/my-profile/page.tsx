import { GetStats } from "@/actions/GetStats";
import { getUserDetails } from "@/actions/getUser";
import AreaChartCustom from "@/app/components/Area";
import ProfileTabs from "@/app/components/ProfileTabs";
import UserCard from "@/app/components/UserCard";
import UserData from "@/app/components/UserData";
import { redirect } from "next/navigation";
import React from "react";

const page = async () => {
  const user = await getUserDetails();
  const userData = await await GetStats(user.id);
  if (!user) return redirect("/");
  return (
    <section className="pt-20  flex items-center justify-center flex-col">
      <div className=" md:px-14   max-w-full md:max-w-[80rem]">
        <div className="grid px-5 md:px-0 grid-cols-1 lg:grid-cols-3  gap-5 mb-2 md:flex  items-center  mx-auto ">
          <UserCard points={userData.totalPoints} mine={true} user={user} />
          <UserData stats={userData} />
        </div>
          <AreaChartCustom userAttempts={userData.userAttempts}/>
        <ProfileTabs user={user} />
      </div>
      
    </section>
  );
};

export default page;
