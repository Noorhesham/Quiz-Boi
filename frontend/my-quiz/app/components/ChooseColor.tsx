"use client";
import { AnimatePresence } from "framer-motion";
import React from "react";
import { IoColorFill } from "react-icons/io5";
import DropDownMenu from "./DropDownMenu";
import { motion } from "framer-motion";
import { useColor } from "../context/ColorContext";

const ChooseColor = () => {
  const { color, setColor } = useColor();
  return (
    <AnimatePresence>
      <DropDownMenu>
        <DropDownMenu.Toggle id="nav">
          <IoColorFill className=" text-2xl md:text-3xl text-gray-100 cursor-pointer hover:text-gray-200 duration-200" />
        </DropDownMenu.Toggle>
        <DropDownMenu.Menu id="nav">
          <motion.ul
            key="menu-nav"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-white z-[999999999999] duration-200 gap-4 shadow-md text-gray-800 fixed w-[20rem] rounded-lg border-[1px] border-gray-200 flex flex-col items-center py-5 px-8 top-[3.7rem] right-10"
          >
            <div className="flex gap-4 flex-wrap">
              <span
                onClick={() => setColor("orange")}
                className="orange cursor-pointer after:w-3 after:h-3 rounded-full py-3 px-3 "
              ></span>
              <span
                onClick={() => setColor("skyblue")}
                className="skyblue cursor-pointer after:w-3 after:h-3 rounded-full py-3 px-3"
              ></span>
              <span
                onClick={() => setColor("pink")}
                className="pink cursor-pointer after:w-3 after:h-3 rounded-full py-3 px-3"
              ></span>
              <span
                onClick={() => setColor("purple")}
                className="purple cursor-pointer after:w-3 after:h-3 rounded-full py-3 px-3"
              ></span>
              <span
                onClick={() => setColor("green")}
                className="green cursor-pointer after:w-3 after:h-3 rounded-full py-3 px-3"
              ></span>
            </div>
          </motion.ul>
        </DropDownMenu.Menu>
      </DropDownMenu>
    </AnimatePresence>
  );
};
export default ChooseColor;
