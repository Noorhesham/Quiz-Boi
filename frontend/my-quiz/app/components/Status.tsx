import Image from "next/image";
import React from "react";
import MotionItem from "./MotionItem";

const Status = ({ image, text }: { image: string; text: string }) => {
  return (
    <div className=" flex mt-2 gap-2 flex-col">
      <h4 className=" text-2xl lg:text-4xl text-pink-500 font-semibold text-center">{text}</h4>
      <MotionItem
        initial={{ y: -10 }}
        animate={{ y: -50 }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
        }}
        className=" w-full h-96 relative"
      >
        <Image alt="online" className=" object-contain" fill src={image} />
      </MotionItem>
    </div>
  );
};

export default Status;
