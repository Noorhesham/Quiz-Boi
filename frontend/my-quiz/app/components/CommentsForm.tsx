"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { useAddComment, useEditComment,  } from "@/utils/queryFunctions";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import MyButton from "./MyButton";
import Spinner from "./Spinner";
import { useComment } from "../context/CommentContext";

const CommentsForm = ({ id, text }: { id: string; text?: string }) => {
  const { comment, setComment, edit } = useComment();
  const form = useForm<{ content: string }>({
    defaultValues: { content: comment || "" },
  });
  const { handleSubmit, control } = form;
  console.log(comment);
  const { isPending, AddCommentToQuiz, error } = useAddComment();
  const { isPending: isPending2, EditCommentFromQuiz, error: error2 } = useEditComment();
  const onSubmit = (values: { content: string }) => {
    console.log(edit);
    if (edit !== "") EditCommentFromQuiz({ content: comment, id: edit });
    else AddCommentToQuiz({ content: comment, quizId: id });
  };
  return (
    <Form {...form}>
      {(isPending || isPending2) && <Spinner />}
      <form onSubmit={handleSubmit(onSubmit)} className=" space-y-1 md:space-y-4 md:p-16 md:pb-5 md:pt-5">
        <div className="space-y-4">
          <FormField
            control={control}
            name={"content"}
            render={({ field }) => (
              <FormItem className="relative flex flex-col">
                <FormLabel className="text-gray-900 font-bold text-sm md:text-base">
                  {text ? text : "Quiz Description"}
                </FormLabel>
                <FormControl>
                  <textarea
                    draggable={false}
                    className="py-3 px-3 resize-none pb-6 bg-[#fceafc] rounded-lg text-black"
                    disabled={isPending}
                    {...field}
                    value={comment && comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="react quiz"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        {<MyButton disabled={isPending || isPending2} text="Add" />}
      </form>
    </Form>
  );
};

export default CommentsForm;
