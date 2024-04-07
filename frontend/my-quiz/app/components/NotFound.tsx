"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";
const NotFound = ({ text }: { text: string }) => {
  return (
    <section className="flex min-h-[100vh] flex-col gap-3 justify-center background items-center">
      <motion.div
        className="flex flex-col gap-2 items-center"
        initial={{ y: -10 }}
        animate={{ y: -50 }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
        }}
      >
        <Image alt="error" width={450} height={450} src="/error.png" />
        <h2 className=" text-3xl text-gray-50 font-semibold">{text}</h2>
        <Link className="underline text-red-100" href={"/"}>
          {" "}
          Return to home page ?{" "}
        </Link>
      </motion.div>
    </section>
  );
};

export default NotFound;
