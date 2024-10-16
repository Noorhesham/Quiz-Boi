import { GetStats } from "@/actions/GetStats";
import { getPublicUser } from "@/actions/getUser";
import AreaChartCustom from "@/app/components/Area";
import FloatingTool from "@/app/components/FloatingTool";
import ProfileTabs from "@/app/components/ProfileTabs";
import UserCard from "@/app/components/UserCard";
import UserData from "@/app/components/UserData";
import React from "react";

export async function generateMetadata({ params }: { params: { id: string } }) {
  const user = await getPublicUser(params.id);
  return { title: user.name };
}

const page = async ({ params }: { params: { id: string } }) => {
  const user = await getPublicUser(params.id);
  const userData = await await GetStats(params.id);
  return (
    <section className="pt-20  flex items-center justify-center flex-col">
      <FloatingTool />
      <div className=" md:px-14   max-w-full md:max-w-[80rem]">
        <div className="grid px-5 md:px-0 grid-cols-1 lg:grid-cols-3  gap-5 mb-2 md:flex  items-center  mx-auto ">
          <UserCard mine={false} points={userData.totalPoints} user={user} />
          <UserData stats={userData} />
        </div>
        <AreaChartCustom userAttempts={userData.userAttempts} />
        <ProfileTabs id={params.id} user={user} />
      </div>
    </section>
  );
};

export default page;
