import { useLikeQuiz } from "@/utils/queryFunctions";
import React from "react";
import { IoIosHeart } from "react-icons/io";

const Like = ({id}:{id:string}) => {
    const {LikeQuiz,isPending,isSuccess,error}=useLikeQuiz()
  return (
    <div>
      <IoIosHeart onClick={()=>LikeQuiz(id)} className=" text-gray-400 cursor-pointer text-lg hover:text-red-500 duration-500" />
    </div>
  );
};

export default Like;
