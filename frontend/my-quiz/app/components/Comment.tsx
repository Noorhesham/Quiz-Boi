import React from "react";
import User from "./User";
import { useGetUser } from "@/utils/queryFunctions";
import Menu from "./Menu";

const Comment = ({ comment }: { comment: any }) => {
  const { user } = useGetUser();
  return (
    <div className="flex items-center bg-gray-50  p-1 rounded-md w-full gap-2">
      <div className="flex items-center gap-2">
        <User author={comment.user} />
        <p className=" border-l-2  pl-1 border-gray-300 text-gray-700 text-base">{comment.content}</p>
      </div>
      {(user && user._id) === comment.user.id && <Menu comment={comment} />}
    </div>
  );
};

export default Comment;
