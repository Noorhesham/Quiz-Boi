import { getPublicUser } from "@/actions/getUser";
import ProfileTabs from "@/app/components/ProfileTabs";
import UserCard from "@/app/components/UserCard";
import React from "react";

const page = async ({ params }: { params: { id: string } }) => {
  const user = await getPublicUser(params.id);
  return (
    <section className="pt-20  flex items-center justify-center flex-col">
      <div className="flex flex-col justify-center items-center">
        <UserCard mine={false} user={user} />
        <ProfileTabs  user={user} />
      </div>
    </section>
  );
};

export default page;
