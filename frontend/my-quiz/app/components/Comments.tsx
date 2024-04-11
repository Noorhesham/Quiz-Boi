import React from "react";
import { QuizProps } from "@/types";
import { Empty } from "./Empty";
import Comment from "./Comment";

const Comments = ({ quiz ,}: { quiz: QuizProps ,}) => {
  return (
    <>
      {quiz.comments.length <= 0 ? (
        <Empty text="No comment yet 😺..be the first to comment !" />
      ) : (
        <div className="flex flex-col h-[40vh]  py-3 px-6 border-2 bg-gray-200 overflow-y-scroll rounded-lg border-gray-300 gap-2">
          {quiz.comments.map((comment) => (
          <Comment comment={comment} />
          ))}
        </div>
      )}
    </>
  );
};

export default Comments;
