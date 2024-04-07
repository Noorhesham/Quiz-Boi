import { Button } from "@/components/ui/button";
import { QuestionProps } from "@/types";
import React from "react";
import DialogCustom from "./DialogCustom";
import Order from "./Order";
import { MdModeEdit } from "react-icons/md";
import { FaTrash } from "react-icons/fa";
import AddQuestion from "./AddQuestion";
import Confirm from "./Confirm";

const Question = ({ question, index }: { question: QuestionProps; index: number }) => {
  return (
    <div className=" flex items-center justify-between bg-gray-100 hover:bg-gray-200 py-2 px-4 rounded-md">
      <div className="flex gap-3 items-center">
        <Order index={index} />
        <h2 className="  font-semibold text-2xl text-gray-800">{question.question} ?</h2>
      </div>
      <div className="flex  gap-3 text-xl items-center">
        <DialogCustom
          content={<Confirm questionId={question._id} />}
          btn={<FaTrash className=" hover:text-red-300 duration-150 text-red-500 cursor-pointer  " />}
        />
        <DialogCustom
          content={<AddQuestion question={question} />}
          btn={<MdModeEdit className=" hover:text-green-300 duration-150 text-green-500 cursor-pointer" />}
        />
        <DialogCustom
          content={<AddQuestion question={question} />}
          btn={
            <Button size="sm" variant="link" className="text-red-500 text-sm md:text-base" type="button">
              View Answers
            </Button>
          }
        />
      </div>
    </div>
  );
};

export default Question;
