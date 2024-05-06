import { Button } from "@/components/ui/button";
import { QuestionProps } from "@/types";
import React from "react";
import DialogCustom from "./DialogCustom";
import Order from "./Order";
import { MdModeEdit } from "react-icons/md";
import { FaTrash } from "react-icons/fa";
import AddQuestion from "./AddQuestion";
import Confirm from "./Confirm";
import { Reorder, useDragControls, useMotionValue } from "framer-motion";
import { useRaisedShadow } from "@/hooks/useRaisedShadow";
import { ReorderIcon } from "./ReorderIcon";

const Question = ({ question, index }: { question: QuestionProps; index: number }) => {
  const y = useMotionValue(0);
  const boxShadow = useRaisedShadow(y);
  const dragControls = useDragControls();
  return (
    <Reorder.Item style={{ boxShadow, y }} dragListener={false} dragControls={dragControls} value={question}>
      <div className=" flex items-center flex-wrap justify-between select-none bg-gray-100 hover:bg-gray-200  py-2 px-4 rounded-md">
        <div className="flex gap-3 items-center">
          <Order index={index} />
          <h2 className="  font-semibold text-lg md:text-2xl text-gray-800">{question.question} ?</h2>
        </div>
        <div className="flex  ml-auto gap-3 text-sm md:text-xl items-center">
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
        <div className=" cursor-grab">
        <ReorderIcon dragControls={dragControls} />
        </div>
      </div>
    </Reorder.Item>
  );
};

export default Question;
