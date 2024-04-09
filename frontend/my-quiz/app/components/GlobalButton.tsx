import { Button } from "@/components/ui/button";
import React from "react";

const GlobalButton = ({ text }: { text: string }) => {
  return (
    <Button className=" py-5 px-10 rounded-full shadow-lg text-lg bg-pink-400 hover:bg-transparent hover:text-pink-400 duration-200 text-gray-100 ">
      {text}
    </Button>
  );
};

export default GlobalButton;
