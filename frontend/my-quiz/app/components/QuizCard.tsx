import { IMAGE_URL } from "@/constants";
import { QuizProps } from "@/types";
import React, { useState } from "react";
import Author from "./Author";
import { FiEye, FiHeart } from "react-icons/fi"; // Import icons
import { AnimatePresence, motion } from "framer-motion";
const QuizCard = ({ quiz }: { quiz: QuizProps }) => {
  const [hover, setHover] = useState(false);

  return (
    <div
      className="relative md:w-[20rem] rounded-md bg-white items-start flex flex-col"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div className="relative w-full h-full">
        <img
          className="rounded-md w-full h-full"
          src={`${IMAGE_URL}quizzes/${quiz.coverImage}` || "/quiz3.png"}
          alt={quiz.title}
        />
        {hover && (
          <AnimatePresence>
            <motion.div
              key={quiz._id}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
              exit={{ opacity: 0 }}
              className="absolute bottom-0 duration-200 left-0 w-full h-16 bg-black bg-opacity-40 flex items-center justify-between px-4"
            >
              <h6 className="text-white font-semibold">{quiz.title}</h6>
              <div className="flex items-center text-white">
                <FiEye className="mr-2" />
                <FiHeart />
              </div>
            </motion.div>
          </AnimatePresence>
        )}
      </div>
      <div className="py-3 px-2 w-full">
        <div className="flex py-2 px-4 text-gray-800 justify-between items-center">
          <h6 className="font-semibold">{quiz.title}</h6>
          <div>
            <span className="self-end text-sm">Duration:{quiz.duration}</span>
          </div>
        </div>
        <Author quiz={quiz} author={quiz.author} />
      </div>
    </div>
  );
};

export default QuizCard;
