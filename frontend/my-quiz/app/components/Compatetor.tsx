import Image from "next/image";
import React from "react";

const Compatetor = ({ otherUser }: { otherUser: any }) => {
  return (
    <div className=" flex flex-col items-center">
      <div className=" relative rounded-full overflow-hidden w-32 h-32">
        <Image src={otherUser?.avatar ||otherUser?.photo|| "/4000_5_02.jpg"} alt={otherUser?.userName} fill className=" object-cover" />
      </div>
      <h2 className=" text-white line-clamp-1  text-center w-[120px] lg:w-[140px] text-xs  bg-pink-500 font-semibold px-3 py-2 rounded-full border border-purple-200">
        {otherUser?.userName||otherUser?.name}
      </h2>
    </div>
  );
};

export default Compatetor;
