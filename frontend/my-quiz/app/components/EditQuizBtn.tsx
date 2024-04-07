import { Button } from "@/components/ui/button";
import React from "react";
import { MdModeEdit } from "react-icons/md";
import DialogCustom from "./DialogCustom";
import UploadQuizForm from "./UploadQuizForm";
import { QuizProps } from "@/types";

const EditQuizBtn = ({quiz}:{quiz:QuizProps}) => {
  return (
    <DialogCustom
      title="Edit Your Quiz"
      content={<UploadQuizForm quiz={quiz} />}
      btn={
        <Button className=" text-gray-800 flex gap-3 items-center hover:bg-green-200 duration-150 text-sm md:text-xl  bg-white rounded-xl self-end">
          Edit Quiz <MdModeEdit className=" hover:text-green-300 duration-150 text-green-500 cursor-pointer" />
        </Button>
      }
    />
  );
};

export default EditQuizBtn;
