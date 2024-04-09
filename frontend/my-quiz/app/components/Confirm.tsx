"use client";
import { Button } from "@/components/ui/button";
import { useDeleteQuestion, usedeleteComment } from "@/utils/queryFunctions";
import Image from "next/image";
import { useParams } from "next/navigation";
import React from "react";
import { FaSpinner } from "react-icons/fa";

const Confirm = ({ setOpen, questionId,comment=false }: { setOpen?: (b: boolean) => void; questionId: string,comment?:boolean }) => {
  const { id }: { id: string } = useParams();
  const { isPending, error, DeleteQuestion, isSuccess } = useDeleteQuestion();
  const {RemoveCommentFromQuiz,isPending:isPending2,isSuccess:isSuccess2}=usedeleteComment()
  const handleClick=()=>{
    if(comment) RemoveCommentFromQuiz(questionId)
    else DeleteQuestion({ id, questionId })
  }
  console.log(isSuccess,isSuccess2)
  if (isSuccess||isSuccess2) setOpen && setOpen(false);
  return (
    <div className="flex flex-col  items-center gap-10">
      <p className=" text-2xl my-5 font-normal text-gray-600 text-center">Are you sure you want to delete ?</p>
      <div className="">
      {(isPending||isPending2) ? (
        <FaSpinner className=" text-4xl animate-spin duration-200 " />
      ) : (
        <Image width={250} height={250} src="/confused.png" alt="remove" />
      )}
      </div>
      {error && <p>{error?.message}</p>}
      <div className=" self-end flex items-center gap-5">
        <Button onClick={() => handleClick()} variant="destructive">
          Delete
        </Button>
        {
          <Button onClick={() => setOpen && setOpen(false)} variant="secondary">
            Cancel
          </Button>
        }
      </div>
    </div>
  );
};

export default Confirm;
