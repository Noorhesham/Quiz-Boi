import { FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { IMAGE_URL } from "@/constants";
import { QuestionProps, QuizProps, UserProps } from "@/types";
import React, { use } from "react";
import { IoIosAddCircleOutline } from "react-icons/io";
import { MdModeEdit } from "react-icons/md";
import InputImage from "./InputImage";
import { useColor } from "../context/ColorContext";

const AddPhotoForm = ({
  setSelectedImage,name,
  control,
  quiz,
  selectedImage,
  question,user
}: {
  setSelectedImage: (f: any) => void;name?:string,
  control: any;
  quiz?: QuizProps;
  selectedImage: any;
  question?: QuestionProps;user?:UserProps
}) => {
  const { color } = useColor();
  const backStyles = ` relative hover:backdrop-blur-sm rounded-lg hover:bg-red-200 cursor-pointer flex items-center flex-col backdrop-blur-lg  group duration-150`;
  return (
    <FormField
      control={control}
      name={name?name:`coverImage`}
      render={({ field }: { field: any }) => (
        <FormItem>
          <FormControl>
            <>
              <label>
                {!quiz?.coverImage && !question?.coverImage && !selectedImage &&!user?.photo? (
                  <div
                    className={`flex flex-col hover:opacity-90 cursor-pointer text-gray-50 rounded-lg gap-3 py-6 px-12 items-center  ${color}`}
                  >
                    <InputImage selectedImage={selectedImage} setSelectedImage={setSelectedImage} field={field} />
                    <IoIosAddCircleOutline className="  hover:text-gray-200 duration-200 text-5xl" />
                    <h2 className="  font-normal text-2xl">Add Cover Image</h2>
                  </div>
                ) : (
                  <div className={backStyles}>
                    <InputImage selectedImage={selectedImage} setSelectedImage={setSelectedImage} field={field} />
                    <h3 className=" absolute top-[50%] z-50 text-4xl translate-y-[-50%] left-[50%] translate-x-[-50%] text-center font-semibold text-gray-50 hidden group-hover:flex items-center gap-2">
                      Edit Image{" "}
                      <MdModeEdit className=" hover:text-green-300 duration-150 text-green-300 cursor-pointer" />
                    </h3>
                    <img
                      className=" w-[20rem] group-hover:blur-sm "
                      alt={(quiz && quiz.title) || (question && question.question)}
                      src={
                        selectedImage
                        ? URL.createObjectURL(selectedImage)
                        : user
                        ? user.photo
                        : question
                        ? question.coverImage
                        : quiz?.coverImage
                      }
                    />
                  </div>
                )}
              </label>{" "}
            </>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default AddPhotoForm;
