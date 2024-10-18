import React from "react";
import "../fire.css";
import Link from "next/link";
import { FaFireAlt } from "react-icons/fa";
const FireButton = ({ id }: { id: string }) => {
  return (
    <Link href={`/multiplayer/${id}`}>
      <button className=" button fire py-1 px-3 border-2 flex items-center gap-1 rounded-3xl group hover:text-gray-100 font-semibold hover:bg-pink-500 duration-200  border-pink-500">
        ONLINE MULTIPLAYER !
        <FaFireAlt className=" text-orange-500 ml-2 group-hover:text-gray-100 duration-200" />
      </button>
    </Link>
  );
};

export default FireButton;
