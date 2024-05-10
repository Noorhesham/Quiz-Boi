import { useGetUser, useSubmitQuiz } from "@/utils/queryFunctions";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { FaSpinner } from "react-icons/fa";
import { useQuiz } from "../context/QuizContext";

const TimeOver = () => {
  const { answers } = useQuiz();
  const { id }: { id: string } = useParams();
  const { user, isLoading, error: error2 } = useGetUser();
  const { SubmitQuiz, isPending, error } = useSubmitQuiz();
  const { handleQuizEnd, timer, setSubmitting } = useQuiz();
  const router = useRouter();
  let data: any;
  if (user) data = { answers, userId: user._id };
  useEffect(function () {
    setSubmitting(true);
    SubmitQuiz({ values: data, quizId: id });
  },[]);
  if (error || error2) router.push("/");
  return (
    <div className="flex flex-col  items-center gap-10">
      <div className="flex flex-col items-center text-center">
        <h2 className=" text-2xl my-5 font-normal text-gray-100 text-center">Quiz Time out</h2>
        <p className=" text-gray-200 font-normal">
          Sadly time of quiz is over ! 😿🌌 But we have submitted your answers ! you can see your results !
        </p>
      </div>
      <div className="">
        {isPending || isLoading ? (
          <FaSpinner className=" text-4xl text-gray-50 animate-spin duration-200 " />
        ) : (
          <Image width={250} height={250} src={`/play2.png`} alt="remove" />
        )}
      </div>
      {(error || error2) && <p className=" font-semibold text-red-500">{error?.message}</p>}
    </div>
  );
};

export default TimeOver;
