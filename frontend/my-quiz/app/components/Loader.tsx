"use client";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { createPortal } from "react-dom";
import { IoMdExit } from "react-icons/io";

const Loader = ({ text, image }: { text?: string; image?: string }) => {
  return <AnimatePresence>
        <motion.section
          key="loader"
          initial={{ x: 0, y: -50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 100 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed shadow-lg top-0 z-50 max-h-[100vh] overflow-hidden w-full h-full bg-gray-50/40 backdrop-blur-sm  bg-gray-50 py-16 px-32 rounded-xl  flex-col flex justify-center items-center"
        >
          <motion.img
            initial={{ y: -10 }}
            animate={{ y: -100 }}
            transition={{ repeat: Infinity, duration: 1.5, repeatType: "reverse", ease: "easeInOut" }}
            alt="loading-Image"
            className="md:w-[35rem] w-[60rem] animate-pulse"
            src={image ? image : "/loading.png"}
          />
          <div className="flex items-center">
            <h3 className=" text-gray-800 font-semibold text-center text-sm w-full md:text-2xl ">
              {text ? text : "We are Loading the Page For You !"}
            </h3>
            <span>🐧😺</span>
          </div>
        </motion.section>
    </AnimatePresence>
  
};

export default Loader;
