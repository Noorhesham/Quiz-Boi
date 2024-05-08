import React, { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { useColor } from "../context/ColorContext";
import Link from "next/link";
import { FaSpinner } from "react-icons/fa";

const MyButton = ({
  text,
  disabled,
  onClick,
  variant,
  href,children
}: {
  text: string;
  disabled?: boolean;
  onClick?: any;
  href?: string;
  variant?: string;children?:ReactNode
}) => {
  return (
    <Button
      size="lg"
      onClick={onClick}
      //@ts-ignore
      variant={variant && variant}
      className={` my-4 w-full flex items-center bg-red-400 hover:opacity-80 duration-200 py-5  text-white`}
      type="submit"
      disabled={disabled}
    >
      {href ? <Link href={href}>{text}</Link> : text}
      {disabled && <FaSpinner className=" animate-spin text-gray-100 " />}
      {children}
    </Button>
  );
};

export default MyButton;
