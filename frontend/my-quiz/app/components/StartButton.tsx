import Link from 'next/link'
import React from 'react'
import { FaPlay } from 'react-icons/fa'

const StartButton = ({id}:{id:string}) => {
  return (
    <Link
    className=" py-1 px-6 border-2 flex items-center gap-1 rounded-3xl group hover:text-gray-100 font-semibold hover:bg-pink-500 duration-200  border-pink-500"
    href={`https://quiz-boi.vercel.app/quiz/${id}`}
  >
    Start!
    <FaPlay className=" text-pink-500 ml-2 group-hover:text-gray-100 duration-200" />
  </Link>
  )
}

export default StartButton
