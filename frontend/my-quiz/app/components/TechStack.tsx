import React from "react";
import { SiNextdotjs } from "react-icons/si";
import { RiReactjsFill } from "react-icons/ri";
import { SiTypescript } from "react-icons/si";
import { DiNodejs } from "react-icons/di";
import { SiExpress } from "react-icons/si";
import { BiLogoMongodb } from "react-icons/bi";
import { SiReactquery } from "react-icons/si";
import { SiTailwindcss } from "react-icons/si";

const TechStack = () => {
  return (
    <div className=" grid grid-cols-1 gap-5 sm:grid-cols-2 ">
      <div className=" py-8 min-h-[10vh] flex flex-col items-center px-4 text-center rounded-lg border-gray-400 shadow-md hover:bg-gray-200 bg-gray-100">
        <SiNextdotjs className=" text-5xl" />
        <span>Next js</span>
      </div>
      <div className=" py-8 flex flex-col items-center px-4 text-center rounded-lg border-gray-400 shadow-md hover:bg-gray-200 bg-gray-100">
        <RiReactjsFill className=" text-5xl" />
        <span>React js</span>
      </div>
      <div className=" py-8 flex flex-col items-center px-4 text-center rounded-lg border-gray-400 shadow-md hover:bg-gray-200 bg-gray-100">
        <SiReactquery className=" text-5xl" />
        <span>React query</span>
      </div>
      <div className=" py-8 flex flex-col items-center px-4 text-center rounded-lg border-gray-400 shadow-md hover:bg-gray-200 bg-gray-100">
        <SiTypescript className=" text-5xl" />
        <span>Typescript</span>
      </div>
      <div className=" py-8 flex flex-col items-center px-4 text-center rounded-lg border-gray-400 shadow-md hover:bg-gray-200 bg-gray-100">
        <DiNodejs className=" text-5xl" />
        <span>Node js</span>
      </div>
      <div className=" py-8 flex flex-col items-center px-4 text-center rounded-lg border-gray-400 shadow-md hover:bg-gray-200 bg-gray-100">
        <SiExpress className=" text-5xl" />
        <span>Express js</span>
      </div>
      <div className=" py-8 flex flex-col items-center px-4 text-center rounded-lg border-gray-400 shadow-md hover:bg-gray-200 bg-gray-100">
        <BiLogoMongodb className=" text-5xl" />
        <span>MongoDb</span>
      </div>
      <div className=" py-8 flex flex-col items-center px-4 text-center rounded-lg border-gray-400 shadow-md hover:bg-gray-200 bg-gray-100">
        <SiTailwindcss className=" text-5xl" />
        <span>Tailwindcss</span>
      </div>
    </div>
  );
};

export default TechStack;
