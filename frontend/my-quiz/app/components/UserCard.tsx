import { Button } from "@/components/ui/button";
import { UserProps } from "@/types";
import React from "react";
import DialogCustom from "./DialogCustom";
import UpdateUserForm from "./UpdateUserForm";
import UpdatePasswordForm from "./UpdatePasswordForm";
import Follow from "./Follow";
import MiniHeaderLink from "./MiniHeaderLink";
import FollowList from "./FollowList";
import FollowingList from "./FollowingList";
import { FcApproval } from "react-icons/fc";

const UserCard = ({ user, mine = false, points }: { user: UserProps; mine: boolean; points?: number }) => {
  return (
    <div className="flex relative overflow-hidden w-full mb-auto h-full self-stretch flex-col items-center py-2 px-4  md:py-4 md:px-8 ">
      <div className=" z-10 p-1">
        <img src={user?.photo} className="w-[8rem] h-[8rem] rounded-full" />
      </div>
      <div className="flex z-5 py-5 px-10 w-full user rounded-3xl -mt-20 text-gray-800 items-center text-lg  flex-col gap-2">
        <div className=" mt-24 flex flex-col items-center">
          <h1 className=" font-bold flex items-center gap-2">
            {user.name} <FcApproval />
          </h1>
          <h4 className="">{user.email}</h4>
          <div className="grid grid-cols-3 gap-2 my-2 md:my-4 items-center ">
            {user.followersCount && (
              <DialogCustom
                title="Followers"
                description="See Followers"
                content={<FollowList length={user.followersCount} id={user._id} />}
                btn={<MiniHeaderLink span={`${user.followersCount}`} text={`followers`} />}
              />
            )}
            {user.followingCount && (
              <DialogCustom
                title="Following"
                description="See Followings"
                content={<FollowingList length={user.followingCount} id={user._id} />}
                btn={<MiniHeaderLink span={`${user.followingCount}`} text={`following`} />}
              />
            )}
            {points && (
              <div className="flex gap-2 flex-col md:flex-row items-center relative">
                <p className=" font-bold">{points}</p>
                <img src="/xp.png" className="w-[2rem] left-1/2 " alt="" />
              </div>
            )}
            <MiniHeaderLink span={`${user.quizzes.length}`} text={`Published Quizzes`} />
          </div>
        </div>
        {!mine ? (
          <Follow className=" text-center mx-auto mr-auto" id={user._id} />
        ) : (
          <DialogCustom
            title="Update your data"
            description="You can update your data and password here 😺🌌"
            btn={
              <Button className="rounded-full text-gray-900 bg-gray-300 hover:bg-gray-400 duration-200 py-2 px-4 font-semibold">
                Edit Profile
              </Button>
            }
            content={
              <section>
                <UpdateUserForm user={user} />
                {!user.isthirdParty&&<UpdatePasswordForm />}
              </section>
            }
          />
        )}
      </div>
    </div>
  );
};

export default UserCard;
