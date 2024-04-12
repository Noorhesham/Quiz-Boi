import Link from "next/link";
import React from "react";

const Topic = ({ tag, small = false }: { tag: string; small?: boolean }) => {
  return !small ? (
    <Link
      className={` hover:underline hover:text-red-600 
      py-1 px-2 text-base bg-gray-100 text-gray-900 capitalize rounded-lg shadow-sm font-semibold hover:bg-gray-200 duration-200`}
      href={`/?categorey=${tag}`}
    >
      {tag}
    </Link>
  ) : (
    <Link
      className=" hover:underline hover:text-red-600 py-1 px-2 text-sm bg-gray-100 text-gray-900 capitalize rounded-lg shadow-sm font-semibold hover:bg-gray-200 duration-200"
      href={`/?categorey=${tag}`}
    >
      {tag}
    </Link>
  );
};

export default Topic;
