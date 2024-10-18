"use client";
import Heading2 from "@/app/components/Heading2";
import Loader from "@/app/components/Loader";
import MaxWidthWrapper from "@/app/components/MaxWidthWrapper";
import Spinner from "@/app/components/Spinner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useGetUser, useStartQuiz } from "@/utils/queryFunctions";
import Image from "next/image";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import { motion } from "framer-motion";
import Date from "@/app/components/Date";
import QuizMultiPlayer from "@/app/components/QuizMultiPlayer";
import { MultiPlayerProvider } from "@/app/context/MultiPlayerContext";
import { toast } from "react-toastify";
import { API_URL } from "@/constants";
/*
create a room with quiz id then 2 users join it 
start the quiz for both  when the users join 1.show the quiz in the frontend after an event emited in the backend 
diide the duration of the quiz by the whole number of question to calc the question time 
if a user finished the question we send a boolean to the other user indicating that he finished befeore him 
if time out the second question is gonna come after an indicator (2 seconds between each question)


*/
const QuizPage = () => {
  const { id }: { id: string } = useParams();
  const { user, isLoading: isLoading2 } = useGetUser();
  const { quiz: data, isLoading, error } = useStartQuiz(id);
  console.log(user);
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isQuizStarted, setIsQuizStarted] = useState(false);
  const [userName, setUserName] = useState<string>("");
  const [sessionId, setSessionId] = useState<string>("");
  const [err, setError] = useState("");
  const [waitingForOpponent, setWaitingForOpponent] = useState(false);
  const [clicked, setClicked] = useState(false);
  useEffect(() => {
    const socketInstance = io("http://127.0.0.1:3000");
    setSocket(socketInstance);

    socketInstance.on("connect", () => {
      console.log(`Connected to Socket.IO server with id: ${socketInstance.id}`);
    });

    socketInstance.on("start-quiz", async ({ id }) => {
      setIsQuizStarted(true);
      setWaitingForOpponent(false);
      setSessionId(id);
    });

    socketInstance.on("quiz-ended", () => {
      console.log("Quiz ended");
      toast.done("The quiz has ended because the other user disconnected.");
      setIsQuizStarted(false);
    });
    socketInstance.on("opponent-joined", ({ userName }) => {
      toast.done(`${userName} joined the quiz. Get ready!`);
      setIsQuizStarted(false);
    });

    return () => {
      socketInstance.disconnect();
    };
  }, []);

  const joinQuiz = () => {
    if (userName.length < 3) return setError("username must be at least 3 characters");
    else {
      setClicked(true);
      // i emmit this and wait and listen to the start from backend when 2 players join room
      socket?.emit("join-quiz", { quizId: id, userName });
      setWaitingForOpponent(true);
    }
  };
  useEffect(() => {
    if (user) setUserName(user.name);
  }, [user]);
  if (isLoading || isLoading2) return <Loader />;
  console.log(data);
  const questionTime = Math.floor(+data.duration / +data.questions.length);
  console.log(questionTime);
  return (
    <section className=" pt-32 quizbg flex items-center justify-center px-20 bg-gray-100 rounded-md min-h-[100vh] ">
      {!isQuizStarted && (
        <MaxWidthWrapper className=" w-full grid grid-cols-2 bg-gray-100 py-4 px-8 rounded-2xl border border-input">
          <div>
            {
              <>
                <Heading2
                  text="MULTIPLAYER IN QUIZ BOI IS A WHOLE NEW EXPERIENCE"
                  className=" text-center font-bold text-rose-400 lg:text-4xl text-3xl"
                  title="PLAY AGAINST PLAYER ALL AROUND THE WORLD "
                />
                {!isQuizStarted && (
                  <div className=" flex flex-col py-4 px-8 gap-5 text-3xl">
                    {!user && (
                      <Input
                        type="text"
                        placeholder="Enter your username"
                        onChange={(e) => setUserName(e.target.value)}
                        value={userName}
                      />
                    )}
                    {!clicked && (
                      <Button
                        className="px-12 py-6  rounded-3xl text-2xl bg-red-400 hover:bg-transparent duration-200 text-white"
                        onClick={joinQuiz}
                      >
                        Join Quiz
                      </Button>
                    )}
                  </div>
                )}{" "}
                {!isQuizStarted && waitingForOpponent && (
                  <p
                    className=" font-semibold text-black capitalize
           lg:text-xl text-balance flex items-center gap-2"
                  >
                    waiting for an oponenet to join the game <Spinner />
                  </p>
                )}
              </>
            }
          </div>
          <motion.div
            initial={{ y: -10 }}
            animate={{ y: -50 }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
            }}
            className=" w-full h-96 relative"
          >
            <Image
              alt="online"
              className=" object-contain"
              fill
              src={
                "/cute-astronaut-ninja-slash-moon-with-sword-cartoon-vector-icon-illustration-science-technology-icon.png"
              }
            />
          </motion.div>
          <div className=" col-span-full w-full flex flex-col gap-2">
            <div
              className={`relative w-full md:h-[22rem] text-nowrap  flex text-center justify-center  items-center  `}
            >
              <div className=" absolute right-2 font-normal py-1 px-2 text-sm text-gray-100 rounded-xl bg-violet-600 bottom-2 z-10">
                {data.questionNum} Qs
              </div>
              <div className=" w-full aspect-square h-72 relative">
                <Image
                  src={`${data?.coverImage?.includes("quiz") ? "/quiz3.png" : data?.coverImage}` || "/quiz3.png"}
                  alt={data?.title}
                  fill
                  className="rounded-t-2xl  h-full block mt-0 pt-0    object-contain w-full"
                />
              </div>
            </div>{" "}
            <div className="flex items-center mt-2 mb-auto justify-between flex-wrap">
              <h5 className="font-bold capitalize  text-gray-900 ">{data?.title}</h5>
              <Date date={data.createdAt} />
            </div>
          </div>
        </MaxWidthWrapper>
      )}
      {isQuizStarted && (
        <MultiPlayerProvider>
          {(user || userName) && (
            <QuizMultiPlayer sessionId={sessionId} userName={userName} socket={socket} quiz={data} />
          )}
        </MultiPlayerProvider>
      )}
    </section>
  );
};

export default QuizPage;
