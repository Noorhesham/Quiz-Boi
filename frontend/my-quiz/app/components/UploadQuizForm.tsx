"use client";
import { Form } from "@/components/ui/form";
import { QuizSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import FormError from "./FormError";
import FormSuccess from "./FormSuccess";
import { useRouter } from "next/navigation";
import QuestionNum from "./QuestionNum";
import Duration from "./Duration";
import TagsForm from "./TagsForm";
import Description from "./Description";
import { UploadQuiz } from "@/actions/UploadQuiz";
import { QuizProps } from "@/types";
import { EditQuiz } from "@/actions/EditQuiz";
import AddPhotoForm from "./AddPhotoForm";
import Loader from "./Loader";
import TextInput from "./QuestionInput";
import MyButton from "./MyButton";
import TaggingComponent from "./TaggingComponent";

const UploadQuizForm = ({ setOpen, quiz }: { setOpen?: any; quiz?: QuizProps }) => {
  const [error, setFormError] = useState<string | any>("");
  const [success, setFormSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();
  const [selectedImage, setSelectedImage] = useState();
  const router = useRouter();
  const form = useForm<z.infer<typeof QuizSchema>>({
    resolver: zodResolver(QuizSchema),
    defaultValues: {
      title: quiz?.title || "",
      questionNum: quiz?.questionNum || 10,
      tags: quiz?.tags || [],
      duration: quiz?.duration || 2,
    },
  });
  const { handleSubmit, control, reset,formState } = form;

  const onSubmit = (values: z.infer<typeof QuizSchema>) => {
    console.log(values, selectedImage);
    setFormError("");
    setFormSuccess("");
    startTransition(async () => {
      const formData = new FormData();
      formData.append("title", values.title);
      formData.append("questionNum", String(values.questionNum));
      values.tags.forEach((tag: string, index: number) => {
        formData.append(`tags[${index}]`, tag);
      });
      formData.append("duration", String(values.duration));
      formData.append("description", String(values.description));
      if (values.coverImage) {
        formData.append("coverImage", values.coverImage[0]);
      }
      if (quiz) {
        await EditQuiz(formData, quiz._id)
          .then((res) => {
            console.log(res);
            if (res.error) {
              setFormError(res.message || res.error.errors);
            } else {
              setOpen && setOpen(false);
              router.refresh();
            }
          })
          .catch(() => setFormError("something went wrong !"));
      } else
        await UploadQuiz(formData)
          .then((res) => {
            if (res.error) {
              setFormError(res.message || res.error.errors);
              reset();
            } else router.push(`/quiz-upload/${res.data.quiz._id}`);
          })
          .catch(() => setFormError("something went wrong !"));
    });
  };

  return (
    <Form {...form}>
      {isPending && <Loader text={quiz ? "Editing quiz" : "Adding quiz"} image="/loading2.png" />}
      <form onSubmit={handleSubmit(onSubmit)} className=" space-y-1 md:space-y-4 md:p-16 md:pb-5 md:pt-5">
        <AddPhotoForm selectedImage={selectedImage} quiz={quiz} control={control} setSelectedImage={setSelectedImage} />
        <TextInput
          name="title"
          required={true}
          text="Add title to your quiz"
          error={error?.quiz?.message}
          control={control}
          isPending={isPending}
        />
        <div className="flex flex-wrap items-end justify-between space-y-4">
          <QuestionNum control={control} isPending={isPending} />
          <Duration control={control} isPending={isPending} />
        </div>
        {/* <TagsForm control={control} isPending={isPending} /> */}
        {/* @ts-ignore*/}
        <TaggingComponent defaultVal={formState.defaultValues?.tags} control={control}/>
        <Description control={control} isPending={isPending} />
        <FormError message={error} />
        <FormSuccess message={success} />
        <div className="space-y-4">
          <MyButton disabled={isPending} text={quiz ? "Edit Quiz" : "Add Questions"} />
        </div>
      </form>
    </Form>
  );
};
export default UploadQuizForm;
