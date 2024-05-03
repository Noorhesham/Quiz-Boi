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

const UserCard = ({ user, mine = false }: { user: UserProps; mine: boolean }) => {
  console.log(user);
  return (
    <div className="flex w-full self-start flex-col items-center  py-4 px-8 ">
      <div className=" p-1">
        <img src={user?.photo} className="w-[8rem] h-[8rem] rounded-full" />
      </div>
      <div className="flex text-gray-100 items-center text-lg p-3 flex-col gap-2">
        <h1>{user.name}</h1>
        <h4 className="">{user.email}</h4>
        <div className="flex items-center gap-5">
          {user.followers.length !== 0 ? (
            <DialogCustom title="Followers" description="See Followers"
              content={<FollowList length={user.followers.length} id={user._id} />}
              btn={<MiniHeaderLink text={`${user.followers.length} followers`} />}
            />
          ) : (
            <MiniHeaderLink text="0 followers" />
          )}
          {user.following.length !== 0 ? (
            <DialogCustom title="Following" description="See Followings"
              content={<FollowingList length={user.following.length} id={user._id}  />}
              btn={<MiniHeaderLink text={`${user.following.length} following`} />}
            />
          ) : (
            <MiniHeaderLink text="0 following " />
          )}
        </div>
        {!mine ? (
          <Follow id={user._id} />
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
                <UpdatePasswordForm />
              </section>
            }
          />
        )}
      </div>
    </div>
  );
};

export default UserCard;
