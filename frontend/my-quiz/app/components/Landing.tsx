"use client";
import { useColor } from "../context/ColorContext";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { motion } from "framer-motion";
import Wave from "./Wave";
const Landing = () => {
  const { color } = useColor();
  return (
    <section className="flex space  flex-wrap items-center relative overflow-hidden pt-32 justify-between gap-20 p-20">
      <Image src="/sun1.png" width={250} height={250} alt="effect" className="absolute z-[1] top-14 left-1" />
      <div className="flex flex-col gap-10 flex-[20%] z-10">
        <h1 className=" text-gray-50 text-[5rem] font-bold ">
          The Best Plattform <div className={` text-red-400`}>Quiz Web-App</div>
        </h1>
        <p className=" text-gray-100 text-2xl font-[400]">
          Compete with your friends and solve quizzes. Publish your quizzes. Explore the world of Quiz boi
        </p>
        <div className="flex gap-5 items-center mt-auto ">
          <Button className="px-12 py-6  rounded-3xl text-2xl bg-red-400 hover:bg-transparent duration-200 text-white">
            Tech Stack
          </Button>
          <Button className="px-12 py-6  rounded-3xl text-2xl bg-transparent  hover:text-white hover:bg-red-400   duration-200 text-red-400 border-2 border-red-400 ">
            About Me
          </Button>
        </div>
      </div>
      <motion.div
        className=" relative mb-4 flex-1 text-center"
        initial={{ y: -10 }}
        animate={{ y: -50 }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
        }}
      >
        <Image src="/landing.png" width={500} height={500} alt="landing" />
        <Image className=" absolute top-10  right-96" src="/sunn.png" width={500} height={500} alt="landing" />
      </motion.div>
      <Wave />
    </section>
  );
};

export default Landing;
