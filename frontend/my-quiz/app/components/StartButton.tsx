import Link from "next/link";
import React from "react";
import { BsSnow } from "react-icons/bs";
import { FaPlay } from "react-icons/fa";
import "../fire.css";

const StartButton = ({ id }: { id: string }) => {
  return (
    <Link href={`/quiz/${id}`}>
      <button className=" button ice py-1 px-3 border-2 flex items-center gap-1 rounded-3xl group hover:text-gray-100 font-semibold">
        Start !
        <BsSnow className=" text-blue-200 animate-spin ml-2 group-hover:text-gray-100 duration-200" />
      </button>
    </Link>
  );
};

export default StartButton;
