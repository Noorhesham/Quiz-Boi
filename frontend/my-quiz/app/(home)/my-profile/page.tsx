import { getUser, getUserDetails } from "@/actions/getUser";
import ProfileTabs from "@/app/components/ProfileTabs";
import UserCard from "@/app/components/UserCard";
import UserData from "@/app/components/UserData";
import { redirect } from "next/navigation";
import React from "react";

const page = async () => {
  const user = await getUserDetails();
  if(!user)  return redirect("/");
  return (
    <section className="pt-20  flex items-center justify-center flex-col">
      <UserCard mine={true} user={user} />
      <div className=" grid grid-cols-1 md:grid-cols-4">
        <div className=" col-span-3">
          <ProfileTabs user={user} />
        </div>
        <UserData />
      </div>
    </section>
  );
};

export default page;
