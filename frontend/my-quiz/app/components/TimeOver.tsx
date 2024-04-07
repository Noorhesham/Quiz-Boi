import { useGetUser, useSubmitQuiz } from "@/utils/queryFunctions";
import Image from "next/image";
import { useParams } from "next/navigation";
import React, { useEffect } from "react";
import { FaSpinner } from "react-icons/fa";
import { useQuiz } from "../context/QuizContext";

const TimeOver = ({values}: {values: { answers: [{ answer: number; id: string }]; username?: string };}) => {
  const { id }: { id: string } = useParams();
  const { user, isLoading, error: error2 } = useGetUser();
  const { SubmitQuiz, isPending, error } = useSubmitQuiz();
  const {handleQuizEnd,timer}=useQuiz()
  let data: any;
  if (user) data = { answers:values, userId: user._id };
  useEffect(function(){
    if(timer<=0){
      SubmitQuiz({ values: data, quizId: id });
      handleQuizEnd();
    }
  },[])

  return (
    <div className="flex flex-col  items-center gap-10">
      <div className="flex flex-col items-center text-center">
        <h2 className=" text-2xl my-5 font-normal text-gray-800 text-center">Quiz Time out</h2>
        <p className=" text-gray-600 font-normal">
          Sadly time of quiz is over ! 😿🌌 But we have submitted your answers ! you can see your results !
        </p>
      </div>
      <div className="">
        {isPending || isLoading ? (
          <FaSpinner className=" text-4xl animate-spin duration-200 " />
        ) : (
          <Image width={250} height={250} src={`/play2.png`} alt="remove" />
        )}
      </div>
      {(error || error2) && <p className=" font-semibold text-red-500">{error?.message}</p>}         
    </div>
  );
};

export default TimeOver;
