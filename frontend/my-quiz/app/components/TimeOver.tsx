import { useGetUser, useSubmitQuiz } from "@/utils/queryFunctions";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { FaSpinner } from "react-icons/fa";
import { useQuiz } from "../context/QuizContext";
import { useMultiPlayer } from "../context/MultiPlayerContext";

const TimeOver = ({
  noend,
  userName,
  text,
  sessionId,
}: {
  noend?: boolean;
  userName?: string;
  text?: string;
  sessionId?: string;
}) => {
  const { id }: { id: string } = useParams();
  const { user, isLoading, error: error2 } = useGetUser();
  const { SubmitQuiz, isPending, error } = useSubmitQuiz(noend);
  const { timer, setSubmitting, answers } = noend ? useMultiPlayer() : useQuiz();
  const router = useRouter();
  let data: any;
  if (user) data = { answers, userId: user._id };
  else if (!user) data = { answers, username: userName || global?.localStorage?.getItem("username") };
  useEffect(function () {
    setSubmitting(true);
    console.log(data);
    SubmitQuiz({ values: data, quizId: id, sessionId });
  }, []);
  // if (error || error2) router.push("/");
  return (
    <div className="flex flex-col  items-center gap-10">
      <div className="flex flex-col items-center text-center">
        {!text ? (
          <>
            <h2 className=" text-2xl my-5 font-normal text-gray-100 text-center">Quiz Time out</h2>
            <p className=" text-gray-200 font-normal">
              {text ||
                "Sadly time of quiz is over ! 😿🌌 But we have submitted your answers ! you can see your results !"}
            </p>
          </>
        ) : (
          <h1 className="text-2xl lg:text-4xl text-pink-500 font-semibold text-center">{text}</h1>
        )}
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
