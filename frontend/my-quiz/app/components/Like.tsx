import { useGetUser, useLikeQuiz, useUnlikeQuiz } from "@/utils/queryFunctions";
import React, {  useState } from "react";
import { IoIosHeart } from "react-icons/io";
import DialogCustom from "./DialogCustom";
import YouAreNotAuth from "./YouAreNotAuth";

const Like = ({ id, count }: { id: string; count: number }) => {
  const { LikeQuiz, error, isSuccess } = useLikeQuiz();
  const { unLikeQuiz, error: error2, isSuccess: isSucces2 } = useUnlikeQuiz();
  const { user } = useGetUser();
  const [isLiked, setIsLiked] = useState(user.likedQuizzes.some((like: any) => like.quiz === id));
  const [likes, setLikes] = useState(count);
  const handleLikeClick = async () => {
    if (isLiked) {
      unLikeQuiz(id);
      setLikes((l) => l - 1);
    } else {
      LikeQuiz(id);
      setLikes((l) => l + 1);
    }
    setIsLiked((prev: boolean) => !prev);
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
          <IoIosHeart onClick={handleLikeClick} />
        </button>
      </div>{" "}
      <div>{likes}</div>
    </div>
  );
};

export default Like;
