import { Button } from "@/components/ui/button";
import Image from "next/image";

import UploadQuizForm from "./UploadQuizForm";
import DialogCustom from "./DialogCustom";
import { useColor } from "../context/ColorContext";
import YouAreNotAuth from "./YouAreNotAuth";
const WhatToDo = ({ text,logged }: { text: string,logged:boolean }) => {
  const { color } = useColor();
  return (
    <div className={`${color} flex gap-2 flex-col  backdrop-blur-xl py-4 px-8 rounded-lg shadow-md`}>
      <Image className=" self-end" width={250} height={250} src={`/${text}.png`} alt="TODO" />
      <div className="flex flex-col items-center self-start">
        <h2 className=" font-bold text-3xl text-white">{text}</h2>
        <h5 className=" text-gray-100 text-xl font-normal">Quiz</h5>
      </div>
      <DialogCustom
        title="Publish Your Quiz Now !"
        content={logged?<UploadQuizForm />:<YouAreNotAuth/>}
        btn={
          <Button className=" text-gray-800 text-sm md:text-xl hover:bg-gray-200 bg-white rounded-xl self-end">
            Start
          </Button>
        }
      />
    </div>
  );
};

export default WhatToDo;
