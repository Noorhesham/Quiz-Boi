import { useGetUser, useLikeQuiz, useUnlikeQuiz } from "@/utils/queryFunctions";
import React, { useState } from "react";
import { IoIosHeart } from "react-icons/io";
import DialogCustom from "./DialogCustom";
import YouAreNotAuth from "./YouAreNotAuth";
import { useRouter } from "next/navigation";

const Like = ({ id, count, icon }: { id: string; count?: number; icon?: any }) => {
  const { LikeQuiz, error, isSuccess } = useLikeQuiz();
  const { unLikeQuiz, error: error2, isSuccess: isSucces2 } = useUnlikeQuiz();
  const { user } = useGetUser();
  const [isLiked, setIsLiked] = useState(user?.likedQuizzes.some((like: any) => like.quiz === id));
  const [likes, setLikes] = useState(count);
  const router = useRouter();
  const handleLikeClick = async (e: any) => {
    e.stopPropagation();
    if (isLiked) {
      unLikeQuiz(id);
      //@ts-ignore
      setLikes((l) => l - 1);
    } else {
      LikeQuiz(id);
      //@ts-ignore
      setLikes((l) => l * l + 1);
    }
    setIsLiked((prev: boolean) => !prev);
    router.refresh();
  };
  return (
    <div className="flex items-center">
      <div>
        {(error || error2) && (
          <DialogCustom btn={""} title={error?.message || error2?.message} content={<YouAreNotAuth />} isopen={true} />
        )}{" "}
        <button
          className={`${
            isLiked && "text-pink-500 "
          } flex items-center gap-1 active:text-pink-500 text-gray-400 cursor-pointer text-lg hover:text-pink-500 duration-500`}
        >
          {icon ? React.cloneElement(icon) : <IoIosHeart onClick={handleLikeClick} />}
        </button>
      </div>{" "}
      <div>{likes}</div>
    </div>
  );
};

export default Like;
