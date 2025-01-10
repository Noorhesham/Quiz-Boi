"use client";
import Image from "next/image";
import React from "react";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import DialogCustom from "./DialogCustom";
import QuizCard from "./QuizCard";
import MyButton from "./MyButton";
import Date from "./Date";
import Time from "./Time";
import { Empty } from "./Empty";
const MapPlay = ({ map, myquizzes }: { map: any; myquizzes: any }) => {
  const dots = map.levels;
  console.log(map);
  if (map.public === false)
    return (
      <div className=" h-screen flex justify-center items-center">
        <Empty text="This map is private." />
      </div>
    );
  return (
    <div className="col-span-2 w-full relative h-screen overflow-hidden">
      <TransformWrapper initialScale={1.3}>
        <TransformComponent wrapperStyle={{ width: "100%", height: "100%" }}>
          <div
            className="relative w-full h-full cursor-pointer"
            style={{
              backgroundImage: `url(${map.mapImage})`,
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
            }}
          >
            {dots.map((dot, i) => {
              const quiz = dot.quizId;
              const target = myquizzes.find((q) => q.quizId?._id === dots[i-1]?._id);
              const isDisabled = i === 0 || (target && target.percentage >= 50) ? false : true;
                    console.log(target)
              return (
                <DialogCustom
                  title="Play Now"
                  description="."
                  btn={
                    <div
                      key={i}
                      className="absolute bg-red-400 rounded-full text-white flex items-center justify-center"
                      style={{
                        left: `${dot.position.x}%`,
                        top: `${dot.position.y}%`,
                        width: "50px",
                        height: "50px",
                        transform: "translate(-50%, -50%)",
                      }}
                      title={dot.difficulty}
                    >
                      <Image alt="dot" src={"/dot.svg"} fill />
                      <p className="absolute p-1 text-xs text-white ml-1 font-semibold">{i + 1}</p>
                    </div>
                  }
                  content={
                    <div className="relative  h-full cursor-pointer rounded-2xl bg-white/60 shadow-md items-start flex flex-col">
                      <div className={`relative   text-nowrap  flex text-center justify-center  items-center w-full `}>
                        <div className=" absolute right-2 font-normal py-1 px-2 text-sm text-gray-100 rounded-xl bg-violet-600 bottom-2 z-10">
                          {quiz.questionNum} Qs
                        </div>
                        {
                          <div className=" aspect-[1/1] w-full h-72 relative">
                            <Image
                              src={
                                `${quiz?.coverImage?.includes("quiz") ? "/quiz3.png" : quiz?.coverImage}` ||
                                "/quiz3.png"
                              }
                              alt={quiz?.title}
                              fill
                              className="rounded-t-2xl  h-full block mt-0 pt-0    object-contain w-full"
                            />
                          </div>
                        }
                      </div>
                      <div className="py-2  glass-white-1 rounded-b-xl flex self-stretch flex-col relative h-full px-2 w-full">
                        <div className="flex items-center mt-2 mb-auto justify-between flex-wrap">
                          <h5 className="font-bold capitalize  text-gray-900 ">{quiz?.title}</h5>
                          <Date date={quiz.createdAt} />
                        </div>
                        <div className="flex mb-2 flex-1 py-1  border-b-2 border-gray-200  text-gray-800 flex-col justify-between items-center">
                          <div className={`  w-full flex flex-wrap items-center justify-between flex-1`}>
                            <div className=" flex  justify-between items-start lg:items-center gap-2">
                              <MyButton
                                text={
                                  !target && i !== 0
                                    ? "Complete the previous level first"
                                    : target?.percentage < 50 && i !== 0
                                    ? "You need to score at least 50% to unlock the next level"
                                    : "Start Level"
                                }
                                disabled={isDisabled}
                                href={`/quiz/${quiz._id}`}
                              />
                            </div>
                          </div>
                          <Time duration={quiz.duration} />
                        </div>
                      </div>
                    </div>
                  }
                />
              );
            })}
          </div>
        </TransformComponent>
      </TransformWrapper>
    </div>
  );
};

export default MapPlay;
