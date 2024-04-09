"use client";
import { Form } from "@/components/ui/form";
import React, { useEffect, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { QuestionSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { IoAddCircleOutline } from "react-icons/io5";
import AnswerBox from "./AnswerBox";
import { Button } from "@/components/ui/button";
import { UploadQuestion } from "@/actions/AddQuestion";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { QuestionProps } from "@/types";
import { EditQuestion } from "@/actions/EditQuestion";
import AddPhotoForm from "./AddPhotoForm";
import { useColor } from "../context/ColorContext";
import TextInput from "./QuestionInput";
import Spinner from "./Spinner";

const AddQuestion = ({ setOpen, question }: { setOpen?: (b: boolean) => void; question?: QuestionProps }) => {
  const [error, setFormError] = useState<string | any>("");
  const [forceUpdateFlag, setForceUpdateFlag] = useState(false);
  const { id }: { id: string } = useParams();
  const [isPending, startTransition] = useTransition();
  const [selectedImage, setSelectedImage] = useState();
  const [explain, setExplain] = useState(false);
  const { color } = useColor();
  const router = useRouter();

  //form and validation
  const form = useForm<z.infer<typeof QuestionSchema>>({
    resolver: zodResolver(QuestionSchema),
    defaultValues: {
      question: question?.question || "",
      answers: question?.answers || ["", ""],
      correctAnswerIndex: question?.correctAnswerIndex || 0,
      explain: question?.explain || "",
    },
  });
  const { handleSubmit, control, reset, getValues, setValue, register, formState } = form;

  //handling answers and correct answer states
  const handleAddAnswer = () => {
    const currentAnswers = getValues("answers");
    setValue("answers", [...currentAnswers, ""]);
  };
  const handleDeleteAnswer = (index: number) => {
    if (getValues("answers").length < 2) return; // Ensure at least one answer remains
    const newAnswers = getValues("answers").filter((_, i) => i !== index);
    reset(); // Reset the form to unregister all inputs
    newAnswers.forEach((_, index) => {
      register(`answers.${index}`); // Register each new answer input
    });
    setValue("answers", newAnswers); // Update the form state with new answers
  };
  const setCorrect = (index: number) => {
    register("correctAnswerIndex");
    setValue("correctAnswerIndex", index);
    console.log(index, getValues("correctAnswerIndex"));
    setForceUpdateFlag((prevFlag) => !prevFlag);
  };

  useEffect(() => {}, [forceUpdateFlag]); //force update on check radio

  const onSubmit = (values: z.infer<typeof QuestionSchema>) => {
    setFormError("");
    startTransition(async () => {
      const formData = new FormData();
      formData.append("question", values.question);
      values.explain && formData.append("explain", values.explain);
      formData.append("correctAnswerIndex", String(values.correctAnswerIndex));
      values.answers.forEach((answer: string, index: number) => {
        formData.append(`answers[${index}]`, answer);
      });
      if (values.coverImage) {
        formData.append("coverImage", values.coverImage[0]);
      }
      console.log(values);
      if (question) {
        await EditQuestion(formData, id, question._id)
          .then((res) => {
            console.log(res);
            if (res.error) {
              setFormError(res.message || res.error.errors);
              reset();
            } else {
              router.refresh();
              setOpen && setOpen(false);
            }
          })
          .catch(() => setFormError("something went wrong !"));
      } else {
        await UploadQuestion(formData, id)
          .then((res) => {
            console.log(res);
            if (res.error) {
              setFormError(res.message || res.error.errors);
              reset();
            } else {
              router.refresh();
              setOpen && setOpen(false);
            }
          })
          .catch(() => setFormError("something went wrong !"));
      }
    });
  };

  return (
    <Form {...form}>
      {isPending && <Spinner/>}
      <form onSubmit={handleSubmit(onSubmit)} className=" space-y-1 md:space-y-4 md:p-16 md:pb-5 md:pt-5">
        <AddPhotoForm
          selectedImage={selectedImage}
          question={question}
          control={control}
          setSelectedImage={setSelectedImage}
        />
        <TextInput
          required={true}
          text="Add your question here"
          name="question"
          control={control}
          isPending={isPending}
          error={error?.question?.message}
        />
        <div className="grid gap-2 grid-cols-2 items-center">
          {getValues("answers").map((val: any, i: number) => (
            <AnswerBox
              key={i}
              error={
                formState.errors.answers?.[i]?.message || error?.answers?.message || error?.correctAnswerIndex?.message
              }
              setCorrect={setCorrect}
              correct={+getValues("correctAnswerIndex") === +i}
              handleDeleteAnswer={handleDeleteAnswer}
              register={register}
              answers={getValues("answers")}
              index={i}
            />
          ))}
        </div>
        {(explain || question?.explain) && (
          <TextInput
            error=""
            name="explain"
            control={control}
            isPending={isPending}
            required={false}
            text={`Add Explaination for the answer to make it more benefit for the people 😺😺`}
          />
        )}
        <div className=" mt-2 flex items-center gap-5">
          <button
            onClick={(e) => {
              e.preventDefault();
              setForceUpdateFlag((prevFlag) => !prevFlag);
              handleAddAnswer();
            }}
            className={` text-[#fa989f] border-[#f6aaaf] hover:bg-gray-100 duration-200 py-2 px-4 flex items-center gap-2 font-semibold text-sm md:text-base cursor-pointer border-2  rounded-lg`}
          >
            <IoAddCircleOutline /> <span>Add Answer</span>
          </button>
         {!question?.explain&&<button
            onClick={(e) => {
              e.preventDefault();
              setExplain((e) => !e);
              if (explain === false) setValue("explain", "");
            }}
            className={` text-[#fa989f] border-[#f6aaaf] hover:bg-gray-100 duration-200 py-2 px-4 flex items-center gap-2 font-semibold text-sm md:text-base cursor-pointer border-2  rounded-lg`}
          >
            <IoAddCircleOutline /> <span>{explain ? "Remove Explaination" : "Add Explaination"}</span>
          </button>}
        </div>
        <div className="space-y-4">
          <Button size="lg" className={` my-4 w-full py-5 ${color} text-white`} type="submit" disabled={isPending}>
            {question ? "Edit Question" : "Add Question"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default AddQuestion;
