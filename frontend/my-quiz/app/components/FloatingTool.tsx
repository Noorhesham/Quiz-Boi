"use client";
import React, { useState } from "react";
import { BsFillInfoSquareFill } from "react-icons/bs";
import { FaSearch } from "react-icons/fa";
import { IoHome } from "react-icons/io5";
import { MdAssignmentAdd } from "react-icons/md";
import { ScrollParallax } from "react-just-parallax";
import { motion, AnimatePresence } from "framer-motion";
import { createPortal } from "react-dom";
import AllAuthors from "./AllAuthors";
import DialogCustom from "./DialogCustom";
import { UploadQuiz } from "@/actions/UploadQuiz";
import UploadQuizForm from "./UploadQuizForm";
import Link from "next/link";

const heroIcons = [
  <Link href={"/"}>
    <IoHome />
  </Link>,
  <DialogCustom
    title="Search any user !"
    description="Find Specific User.. and browse thier profile and Follow them !"
    content={<AllAuthors />}
    btn={<FaSearch />}
  />,
  <DialogCustom
    title="Upload Your Quiz"
    description="Upload your prefered quiz now and publish it to the world !"
    content={<UploadQuizForm />}
    btn={<MdAssignmentAdd />}
  />,
  <BsFillInfoSquareFill />,
];

const FloatingTool = () => {
  const [isVisible, setIsVisible] = useState(true);
  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  return createPortal(
    <>
      <AnimatePresence>
        {isVisible && (
          <motion.ul
            className=" fixed z-50 left-1/3 xl:left-1/2 top-32 px-1 py-1     bg-gray-900/40 backdrop-blur border border-n-1/10 rounded-2xl flex"
            drag
            dragElastic={0.5}
            dragConstraints={{
              top: 20,
              left: -global?.window?.innerWidth / 3,
              right: global?.window?.innerWidth / 3,
              bottom: global?.window?.innerHeight - 100,
            }}
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
          >
            {heroIcons.map((icon, i) => (
              <motion.li
                key={i}
                className=" p-3 xl:p-4 hover:bg-gray-500/40 text-gray-100 rounded-3xl text-sm xl:text-3xl cursor-pointer duration-150 "
                whileHover={{ scale: 1.1 }}
              >
                {icon}
              </motion.li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
      <button
        className="fixed z-50 top-20 right-4 text-sm xl:text-base  bg-gray-900/80 text-white px-3 py-1 rounded-lg"
        onClick={toggleVisibility}
      >
        {isVisible ? "Hide Menu" : "Show Menu"}
      </button>
    </>,
    global?.document?.body
  );
};

export default FloatingTool;
