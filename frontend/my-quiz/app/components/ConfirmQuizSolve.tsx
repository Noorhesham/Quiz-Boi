import { useGetUser, useSubmitQuiz } from "@/utils/queryFunctions";
import { useParams } from "next/navigation";
import React from "react";
import { useQuiz } from "../context/QuizContext";
import { FaSpinner } from "react-icons/fa";
import Image from "next/image";
import { Button } from "@/components/ui/button";

const ConfirmQuizSolve = ({
  setOpen,
  values,
}: {
  setOpen?: any;
  values: { answers: [{ answer: number; id: string }]; username?: string };
}) => {
  const { id }: { id: string } = useParams();
  const { user, isLoading, error: error2 } = useGetUser();
  const { SubmitQuiz, isPending, error } = useSubmitQuiz();
  const { handleQuizEnd, timer, answers } = useQuiz();
  let data: any;
  if (user) data = { answers:values, userId: user._id };
  return (
    <div className="flex flex-col  items-center gap-10">
      <div className="flex flex-col items-center text-center">
        <h2 className=" text-2xl my-5 font-normal text-gray-800 text-center">
          Are you ready to submit your answers now ?
        </h2>
        <p className=" text-gray-600 font-normal">
          submit your answer,see your results,and ease the leaderboards ! 😺🚀👩‍🚀
        </p>
      </div>
      <div className="">
        {isPending || isLoading ? (
          <FaSpinner className=" text-4xl animate-spin duration-200 " />
        ) : (
          <Image width={250} height={250} src={`/quiz5.png`} alt="remove" />
        )}
      </div>
      {(error || error2) && <p className=" font-semibold text-red-500">{error?.message}</p>}
      <div className=" self-end flex items-center gap-5">
        {
          <Button onClick={() => setOpen && setOpen(false)} variant="secondary">
            Cancel
          </Button>
        }
        <Button
          onClick={() => {
            SubmitQuiz({ values: data, quizId: id });
            handleQuizEnd();
          }}
          variant="default"
        >
          Publish
        </Button>
      </div>
    </div>
  );
};

export default ConfirmQuizSolve;
