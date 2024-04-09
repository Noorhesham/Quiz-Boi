"use client";
import { Button } from "@/components/ui/button";
import { useFollow, useGetUser, useUnFollow } from "@/utils/queryFunctions";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import DialogCustom from "./DialogCustom";
import YouAreNotAuth from "./YouAreNotAuth";

const Follow = ({ id }: { id: string }) => {
  const { FollowUser, error, isSuccess } = useFollow();
  const [auth, setisAuth] = useState(true);
  const { UnFollowUser, error: error2, isSuccess: isSucces2 } = useUnFollow();
  const { user } = useGetUser();
  const [isFollowed, setIsFollowed] = useState(user?.following.some((follower: any) => follower === id));
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
          content={<YouAreNotAuth text={error?.message || error2?.message||"(To follow this user)"} />}
          isopen={true}
        />
      )}{" "}
      <Button
        onClick={handleFollowClick}
        className={` ${
          isFollowed ? "bg-pink-400 text-gray-100" : "bg-gray-100 text-gray-800"
        } rounded-full hover:bg-pink-400 hover:text-gray-100 self-center duration-200  py-3  px-6  `}
      >
        {isFollowed ? "Following" : "Follow"}
      </Button>
    </>
  );
};

export default Follow;