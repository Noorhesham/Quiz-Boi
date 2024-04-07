import { Button } from "@/components/ui/button";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import React from "react";

const QuizForm = ({
  control,
  isAddingQuestion,
  isPending,
  inputValue,
  handleAddTag,
  tags,
  handleChange,
  setIsAddingQuestion,
}: {
  control: any;
  isAddingQuestion: boolean;
  isPending: boolean;
  inputValue: string;
  handleAddTag: () => void;
  tags: [string];
  handleChange: () => void;
  setIsAddingQuestion: (b:boolean) => void;
}) => {
  return (
    <>
      <div className=" space-y-4">
        <FormField
          control={control}
          name="title"
          render={({ field }) => (
            <FormItem className=" relative">
              <FormLabel className=" text-gray-900 font-bold text-base">
                Quiz Title <span className=" text-gray-600 font-normal">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  className=" py-6 px-3  rounded-lg text-black"
                  disabled={isPending}
                  {...field}
                  placeholder="react quiz"
                  type="text"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      <div className="flex items-end justify-between space-y-4">
        <FormField
          control={control}
          name="questionNum"
          render={({ field }) => (
            <FormItem className=" relative">
              <FormLabel className=" text-gray-900 font-bold text-base">
                Number of Questions <span className=" text-gray-600 font-normal">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  className=" py-6 px-3 w-fit  rounded-lg text-black"
                  disabled={isPending}
                  {...field}
                  placeholder="react quiz"
                  type="number"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="answerNum"
          render={({ field }) => (
            <FormItem className="  relative">
              <FormLabel className=" text-gray-900 font-bold text-base">
                Number of Answers for question <span className=" text-gray-600 font-normal">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  className=" py-6 px-3 w-fit  rounded-lg text-black"
                  disabled={isPending}
                  {...field}
                  placeholder="react quiz"
                  type="number"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      <div className="space-y-4">
        <FormField
          control={control}
          name="tags"
          render={({ field }) => (
            <FormItem className="relative">
              <FormLabel className="text-gray-900 font-bold text-base">
                Quiz Topics <span className="text-gray-600 font-normal">*</span>
              </FormLabel>
              <FormControl>
                <div>
                  <Input
                    className="py-6 px-3 rounded-lg text-black"
                    disabled={isPending}
                    value={inputValue}
                    onChange={handleChange}
                    placeholder="React-js"
                    type="text"
                  />
                  <button onClick={handleAddTag}>Add</button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div>
          {tags.map((tag, index) => (
            <div key={index}>{tag}</div>
          ))}
        </div>
      </div>
      <div className=" space-y-4">
        <FormField
          control={control}
          name="description"
          render={({ field }) => (
            <FormItem className=" relative flex flex-col">
              <FormLabel className=" text-gray-900 font-bold text-base">
                Quiz Description <span className=" text-gray-600 font-normal"></span>
              </FormLabel>
              <FormControl>
                <textarea
                  draggable={false}
                  className=" py-3 px-3 pb-6 bg-[#fcedea]  rounded-lg text-black"
                  disabled={isPending}
                  {...field}
                  placeholder="react quiz"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      <div className="space-y-4">
        <Button
          onClick={() => setIsAddingQuestion(true)}
          size="lg"
          className=" my-4 w-full py-5 background text-white"
          type="button"
        >
          Add Question
        </Button>
      </div>
    </>
  );
};

export default QuizForm;
