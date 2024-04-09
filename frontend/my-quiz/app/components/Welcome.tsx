"use client";
import { useGetUser } from "@/utils/queryFunctions";
import React from "react";
import Loader from "./Loader";
import WhatToDo from "./WhatToDo";
import { useColor } from "../context/ColorContext";

const Welcome = () => {
  const { user, isLoading, error } = useGetUser();
  const { color } = useColor();
  if (isLoading) return <Loader />;
  return (
    <div className={`flex bg-white flex-col px-5 md:px-0 py-10 items-center gap-3`}>
      <span className=" text-5xl font-semibold  text-gray-800">Weclome {user ? user.name : "Boi !"} </span>
      <p className=" text-lg md:text-2xl p-2 text-gray-800">
        We wish you a great day ! What are you planning to do today !
      </p>
      <div className="flex flex-col md:flex-row items-center gap-5">
        <WhatToDo logged={user!!} text={"/create.png"} />
        <WhatToDo logged={user!!} text={"/play.png"} />
      </div>
    </div>
  );
};

export default Welcome;
