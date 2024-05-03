"use client";
import { useGetUser } from "@/utils/queryFunctions";
import React from "react";
import WhatToDo from "./WhatToDo";

const Welcome = () => {
  const { user, isLoading } = useGetUser();
  return (
    <div className={`flex   max-w-full  bg-white flex-col px-5 md:px-0 py-10 items-center gap-3`}>
      <h4 className=" text-stroke-3 z-10 text-5xl font-semibold  text-gray-50">
        Weclome {user ? user.name : "Boi !"}{" "}
      </h4>
      <p className=" z-10 text-lg md:text-2xl p-2 text-gray-800">
        We wish you a great day ! What are you planning to do today !
      </p>
      <div className="flex relative z-[10] flex-col md:flex-row items-center gap-5">
        <WhatToDo img="Play" logged={user!!} text={"/play.png"} />
        <WhatToDo img="Create" logged={user!!} text={"/create.png"} />
      </div>
    </div>
  );
};

export default Welcome;
