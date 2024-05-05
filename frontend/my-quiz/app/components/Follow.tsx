"use client";
import { Button } from "@/components/ui/button";
import { useFollow, useGetUser, useUnFollow } from "@/utils/queryFunctions";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import DialogCustom from "./DialogCustom";
import YouAreNotAuth from "./YouAreNotAuth";
import { SlUserFollowing } from "react-icons/sl";
import { SlUserFollow } from "react-icons/sl";

const Follow = ({ id,className }: { id: string,className?:string }) => {
  const { FollowUser, isPending, error, isSuccess } = useFollow();
  const [auth, setisAuth] = useState(true);
  const { UnFollowUser, isPending: isPending2, error: error2, isSuccess: isSucces2 } = useUnFollow();
  const { user } = useGetUser();
  const [isFollowed, setIsFollowed] = useState(!!user?.following.some((follower: any) => follower === id));
  const router = useRouter();
  const handleFollowClick = async () => {
    if (!user) {
      setisAuth(false);
      return;
    }
    if (isFollowed) UnFollowUser(id);
    else FollowUser(id);
    setIsFollowed((prev: boolean) => !prev);
    router.refresh();
  };
  return (
    <>
      {(error || error2 || !auth) && (
        <DialogCustom
          btn={""}
          title={"Error Following the User"}
          content={<YouAreNotAuth text={error?.message || error2?.message || "(To follow this user)"} />}
          isopen={true}
        />
      )}{" "}
      <Button
        disabled={isPending || isPending2}
        onClick={handleFollowClick}
        className={` ${
          isFollowed ? "bg-pink-400 text-gray-100" : "bg-gray-100 text-gray-800"
        } rounded-full hover:bg-pink-400 hover:text-gray-100 ${className||""} self-center ml-auto duration-200 flex items-center gap-2  py-3  px-6  `}
      >
        {isFollowed ? "Following" : "Follow"}
        {isFollowed ? <SlUserFollowing className=" duration-200 text-gray-50 text-xl" /> : <SlUserFollow className=" duration-200 text-xl" />}
      </Button>
    </>
  );
};

export default Follow;
