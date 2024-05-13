"use client";
import { useGetAttempts } from "@/utils/queryFunctions";
import React, { useEffect, useState } from "react";
import User from "./User";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Empty } from "./Empty";
import { useInView } from "react-intersection-observer";
import AuthorSkeleton from "./AuthorSkeleton";
import { LazyLoadImage } from "react-lazy-load-image-component";
import Confetti from "react-confetti";
const LeaderBoard = ({ id, me }: { id: string; me?: string }) => {
  const { attemptedUsers, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } = useGetAttempts(id);
  console.log(attemptedUsers);
  const { ref, inView } = useInView();
  const [isRunning, setIsRunning] = useState(false);

  useEffect(function () {
    setIsRunning(true);
    setTimeout(() => {
      setIsRunning(false);
    }, 25000);
  }, []);
  useEffect(
    function () {
      if (inView && hasNextPage) fetchNextPage();
    },
    [inView, hasNextPage, fetchNextPage]
  );
  return (
    <section className=" mb-10 max-h-[85vh] min-w-[80%] overflow-y-scroll   min-h-full w-full flex items-center flex-col  relative ">
      <Card className="rounded-lg relative w-full">
        {isLoading ? (
          <div ref={ref} className=" w-full">
            <div className="w-8 h-8 left-1/2  bottom-0  absolute mx-auto mt-auto">
              <img src="/loading3.png" className=" animate-spin" alt="" />
            </div>
          </div>
        ) : (
          <div className="flex items-center border-b-2 h-full min-h-[20rem]  border-b-gray-500   flex-col bg-[#01182a] ">
            {isRunning && <Confetti className="z-50" numberOfPieces={400} width={1000} height={1000} />}
            <div className="flex overflow-hidden w-full mt-20   justify-center ">
              {attemptedUsers?.pages.flat(1)[2] && (
                <div className=" relative ">
                  <div className={`  flex flex-col items-center`}>
                    <User
                      small={true}
                      size="md:w-[5rem] md:h-[5rem] w-[4rem] h-[4rem]"
                      className="flex-col  relative z-30 translate-y-10 translate-x-4 md:translate-y-20 text-base text-gray-100"
                      isLogged={!!attemptedUsers?.pages[0]?.userId}
                      author={attemptedUsers?.pages.flat(1)[2]?.userId || attemptedUsers?.pages.flat(1)[2]}
                    />
                    <img
                      src="/cube.png"
                      className=" h-[11rem] md:h-[19rem]  translate-x-[43px] translate-y-[37px] skew-x-[8deg]"
                      alt=""
                    />
                  </div>
                  <LazyLoadImage
                    className=" absolute bottom-[1.6rem] left-[1.3rem] md:left-[3rem] z-20 w-[12rem] md:w-[13rem]"
                    src="/winner3.png"
                    alt=""
                  />
                  <h1 className=" text-xl md:text-4xl absolute bottom-0 left-[70%] md:left-[60%] font-bold text-gray-50 z-30">
                    3
                  </h1>
                </div>
              )}
              <div className=" relative flex flex-col items-center">
                <div className={` relative z-30 mx-auto `}>
                  <User
                    small={true}
                    size=" w-[4rem] h-[4rem] md:w-[5rem] md:h-[5rem]"
                    className="flex-col  text-base text-gray-100"
                    isLogged={!!attemptedUsers?.pages[0]?.userId}
                    author={attemptedUsers?.pages.flat(1)[0]?.userId || attemptedUsers?.pages.flat(1)[0]}
                  />
                </div>
                <LazyLoadImage
                  className=" absolute bottom-[1.6rem] left-0 z-20 w-[10rem] md:w-[15rem]"
                  src="/winner1.png"
                  alt=""
                />
                <h1 className=" text-xl md:text-4xl absolute bottom-1 left-1/2 font-bold text-gray-50 z-30">1</h1>
                <img src="/cube.png" className=" h-[11rem] md:h-[19rem] scale-125 relative z-10" alt="" />
              </div>
              {attemptedUsers?.pages.flat(1)[1] && (
                <div className=" relative ">
                  <div className={` flex flex-col items-center `}>
                    <User
                      small={true}
                      size=" w-[4rem] h-[4rem] md:w-[5rem] md:h-[5rem]"
                      className="flex-col z-40 relative   md:-translate-x-3 md:translate-y-3 translate-y-4 -translate-x-2 text-xs md:text-base text-gray-100"
                      isLogged={!!attemptedUsers?.pages[0]?.userId}
                      author={attemptedUsers?.pages.flat(1)[1]?.userId || attemptedUsers?.pages.flat(1)[1]}
                    />
                    <img
                      src="/cube.png"
                      className=" h-[11rem] md:h-[19rem] translate-x-[-43px] translate-y-[37px] scale-125 skew-x-[-14deg]"
                      alt=""
                    />
                  </div>
                  <h1 className=" text-xl md:text-4xl absolute bottom-0 left-[19%] md:left-[32%] font-bold text-gray-50 z-30">
                    2
                  </h1>
                  <LazyLoadImage
                    className=" absolute bottom-[1.6rem] left-[-1.3rem] md:left-[-3rem] z-20 w-[9rem] md:w-[14rem]"
                    src="/winner2.png"
                    alt=""
                  />
                </div>
              )}
            </div>
          </div>
        )}
        <CardHeader>
          <CardTitle>Final ScoreBoard </CardTitle>
        </CardHeader>
        <CardContent className=" bg-gray-100 h-full  relative  py-4 px-8  grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 items-stretch gap-5">
          {attemptedUsers?.pages?.flat(1)?.map((user: any, i: number) => (
            <div className="flex items-center w-full">
              <h2 className=" self-start font-semibold text-gray-700 mr-4">{i + 1}</h2>
              <div className=" w-full flex flex-wrap items-center">
                <User isLogged={!!user.userId} author={user.userId || user} />
                <div className=" ml-auto rounded-lg self-end sm:text-base text-xs bg-purple-400 text-gray-100 py-1 px-2 md:px-3">
                  {user.points} xp
                </div>
              </div>
            </div>
          ))}
          {(hasNextPage && isFetchingNextPage) || (isLoading && <AuthorSkeleton />)}
          {(hasNextPage || isFetchingNextPage) && (
            <div ref={ref} className=" w-full">
              <div className="w-8 h-8 left-1/2  bottom-0  absolute mx-auto mt-auto">
                <img src="/loading3.png" className=" animate-spin" alt="" />
              </div>
            </div>
          )}
          {attemptedUsers?.pages?.flat(1).length === 0 && (
            <Empty
              link={`/quiz/${id}`}
              linkText="Play it ?"
              text="this quiz has not been played yet ! "
            />
          )}
        </CardContent>
      </Card>
    </section>
  );
};

export default LeaderBoard;
