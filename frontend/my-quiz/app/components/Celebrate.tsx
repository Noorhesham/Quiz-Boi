"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Heading from "./Heading";
import Confetti from "react-confetti";
import BlobBackground from "./BlobBackground ";

const Celebrate = ({ img, text }: { img?: string; text?: string }) => {
  const [isRunning, setIsRunning] = useState(false);

  useEffect(function () {
    setIsRunning(true);
    setTimeout(() => {
      setIsRunning(false);
    }, 5000);
  }, []);
  return (
    <div className=" pt-20 z-10 relative overflow-hidden rounded-lg py-3 px-6 flex flex-col items-center justify-center">
      {isRunning && <Confetti numberOfPieces={100} width={1000} height={600} />}
      {img&&<Image className="z-10" alt="result" width={400} height={400} src={`/${img}.png`} />}
      {text&&<Heading text={`${text} points !`} />}
      <BlobBackground />
    </div>
  );
};

export default Celebrate;
