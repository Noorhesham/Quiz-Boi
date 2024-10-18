import { Button } from "@/components/ui/button";
import React, { ReactNode } from "react";

const GlobalButton = ({
  text,
  icon,
  onClick,
  className,
  children,
  padding,
  isPending,
}: {
  text: string;
  icon?: any;
  onClick?: any;
  className?: string;
  children?: ReactNode;
  padding?: string;
  isPending?: boolean;
}) => {
  return (
    <Button
      disabled={isPending}
      onClick={onClick}
      className={`flex items-center gap-2 ${
        padding ? padding : "py-5 px-10"
      } rounded-full shadow-lg text-lg bg-pink-400 hover:bg-transparent hover:text-pink-400 duration-200 text-gray-100 ${
        className || ""
      }`}
    >
      {text}
      {icon}
      {children}
    </Button>
  );
};

export default GlobalButton;
