"use client";
import React, { useEffect, useRef, useState } from "react";
import { QuizProps } from "@/types";
import { Progress } from "@/components/ui/progress";
import { Socket } from "socket.io-client";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import Image from "next/image";
import { useMultiPlayer } from "../context/MultiPlayerContext";
import { CircularProgressbar } from "react-circular-progressbar";
import QuestionMulti from "./QuestionMulti";
import TimeOver from "./TimeOver";
import Status from "./Status";

interface QuizMultiPlayerProps {
  quiz: QuizProps;
  socket: Socket;
  userName: string;
  sessionId: string;
}

const TIMERCOUNT = 60;

const QuizMultiPlayer = ({ quiz, socket, userName, sessionId }: QuizMultiPlayerProps) => {
  const [timer, setTimer] = useState<number>(TIMERCOUNT);
  const { questionIndex, progress, handleQuizEnd, handleNext } = useMultiPlayer();
  const [isMoving, setIsMoving] = useState(false);
  const [isWaitingForOtherPlayer, setIsWaitingForOtherPlayer] = useState(false);
  const [answer, setAnswer] = useState<{ answer: number | undefined; id: string }>();
  const [attemptId, setAttemptId] = useState<string | null>(null);
  const endTimeRef = useRef<number>(0);
  const timerRef = useRef<number | null>(null);
  const [showTimer, setShowTimer] = useState(true);
  const [sendResults, setSendResults] = useState(false);
  const handleTimer = () => {
    setShowTimer(true);
    setTimer(TIMERCOUNT);
    endTimeRef.current = Date.now() + TIMERCOUNT * 1000;

    const tick = () => {
      const remaining = Math.max(0, endTimeRef.current - Date.now());
      setTimer(Math.floor(remaining / 1000));

      if (remaining > 0) {
        timerRef.current = requestAnimationFrame(tick);
      } else {
        // Trigger timeout event when time is up
        socket.emit("timeOut", { userName, sessionId });
      }
    };
    timerRef.current = requestAnimationFrame(tick);
  };

  const resetAndHideTimer = () => {
    if (timerRef.current) {
      cancelAnimationFrame(timerRef.current);
      timerRef.current = null;
    }

    setShowTimer(true);
    handleTimer();
  };
  useEffect(() => {
    handleTimer();
    return () => {
      if (timerRef.current) {
        cancelAnimationFrame(timerRef.current);
      }
    };
  }, [socket, userName, sessionId]);

  useEffect(() => {
    if (timer <= 0) {
      socket.emit("timeOut", { userName, sessionId });
    }
  }, [timer]);

  useEffect(() => {
    const setupSocketListeners = () => {
      socket.on("next-question", () => handleTimeOut());
      socket.on("done-notification", handleDoneNotification);
      socket.on("timeoutall", () => handleTimeOut());
      socket.on("end-quiz", handleQuizEnd);

      socket.on("reset-timer", handleTimer);
      socket.on("finish-quiz", ({ message }) => {
        setSendResults(true);
        toast.done(message);
      });
    };

    const cleanupSocketListeners = () => {
      socket.off("next-question", () => handleTimeOut());
      socket.off("done-notification", handleDoneNotification);
      socket.off("timeoutall", () => handleTimeOut());
      socket.off("end-quiz", handleQuizEnd);
      socket.off("reset-timer", handleTimer);
      socket.off("finish-quiz", ({ message }) => {
        setSendResults(true);
        toast.done(message);
      });
    };

    const handleDoneNotification = ({ message }: { message: string }) => {
      toast.success(message);
    };
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      event.preventDefault();
      event.returnValue = ""; // Required for Chrome to show a confirmation dialog

      // Confirmation from the user
      const userConfirmed = confirm("Are you sure you want to leave? Your progress will be lost.");

      if (userConfirmed) {
        handleQuizEnd();
        socket.emit("end-quiz", { userName, sessionId });
        toast.done("The quiz has ended because the other user disconnected.");
      } else {
        event.returnValue = false; // Prevent navigation
      }
    };

    const handleLinkClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (target.tagName === "A" || target.closest("a")) {
        const userConfirmed = confirm("Are you sure you want to leave? Your progress will be lost.");
        if (!userConfirmed) {
          event.preventDefault(); // Prevent navigation if the user cancels
        } else {
          handleQuizEnd();
          toast.done("The quiz has ended because the other user disconnected.");
          socket.emit("end-quiz", { sessionId, userName });
        }
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    document.addEventListener("click", handleLinkClick);
    setupSocketListeners();

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      document.removeEventListener("click", handleLinkClick);
      cleanupSocketListeners();
    };
  }, [socket, handleQuizEnd, userName, sessionId]);

  const handleNextEvent = () => {
    setIsWaitingForOtherPlayer(true);
    socket.emit("done", { userName, sessionId: sessionId });
  };

  const handleTimeOut = () => {
    setIsMoving(true);
    setIsWaitingForOtherPlayer(false);

    setShowTimer(false);
    setTimeout(() => {
      setIsMoving(false);
      resetAndHideTimer();
    }, 2000);
  };

  const handleSend = () => {
    socket.emit("send-results", { sessionId, userName });
  };
  const totalQuestions = quiz.questions.length;
  return (
    <div className="flex mt-4 min-h-[50vh] flex-col items-center w-full md:w-[80%]">
      {!sendResults && (
        <>
          {showTimer && timer > 0 && (
            <div className="flex items-center relative w-[100%] gap-3 px-2 md:px-5 flex-col">
              <div
                className=" text-pink-400 font-semibold fill-pink-400 text-center absolute left-[50%] translate-x-[-50%] z-10 top-[-5rem]"
                style={{ width: 70, height: 70 }}
              >
                <CircularProgressbar
                  value={timer}
                  text={`${Math.floor(timer / 60)}:${timer % 60 < 10 ? "0" : ""}${timer % 60}`}
                />
              </div>
              <Progress className="bg-gray-100 h-[1rem]" value={progress} />
              <div className="self-start flex items-center gap-2 font-semibold text-gray-200">
                Question <span className="text-pink-400">{` ${questionIndex + 1}`}</span> / {totalQuestions}
              </div>
            </div>
          )}
          {isMoving ? (
            <Status text="  MOVING TO SECOND QUESTION" image={"/fight.png"} />
          ) : isWaitingForOtherPlayer ? (
            <Status text="WAITING FOR OTHER PLAYER" image={"/rb_8026.png"} />
          ) : (
            <>
              <QuestionMulti
                answer={answer}
                setAnswer={setAnswer}
                len={totalQuestions}
                nextFn={+questionIndex === totalQuestions - 1 ? handleSend : handleNextEvent}
                question={quiz.questions[questionIndex]}
              />
            </>
          )}
        </>
      )}
      {sendResults && (
        <TimeOver
          sessionId={sessionId}
          text="Congratulations the quiz is over ! we are collecting your points ! "
          userName={userName}
          noend={true}
        />
      )}
    </div>
  );
};

export default QuizMultiPlayer;
