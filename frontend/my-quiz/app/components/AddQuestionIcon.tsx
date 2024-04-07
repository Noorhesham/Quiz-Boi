import React from "react";
import DialogCustom from "./DialogCustom";
import { IoAddCircleSharp } from "react-icons/io5";
import AddQuestion from "./AddQuestion";
import { Button } from "@/components/ui/button";

const AddQuestionIcon = ({ type = "icon" }: { type: "icon" | "btn" }) => {
  return (
    <DialogCustom
      content={<AddQuestion />}
      btn={
        type === "btn" ? (
          <Button className=" text-gray-800  text-sm md:text-xl hover:bg-gray-200 bg-white rounded-xl self-end">
            Add Question
          </Button>
        ) : (
          <IoAddCircleSharp className=" text-gray-50 text-4xl cursor-pointer   hover:text-gray-200 duration-150" />
        )
      }
    />
  );
};

export default AddQuestionIcon;
