import React from "react";
import { Button } from "@/components/ui/button";
import { useColor } from "../context/ColorContext";
import Link from "next/link";

const MyButton = ({
  text,
  disabled,
  onClick,variant,
  href,
}: {
  text: string;
  disabled?: boolean;
  onClick?: any;
  href?: string;variant?:string
}) => {
  const { color } = useColor();
  return (
    <Button
      size="lg"
      //@ts-ignore
      onClick={onClick} variant={variant&&variant}
      className={` my-4 w-full py-5 ${color} text-white`}
      type="submit"
      disabled={disabled}
    >
      {href ? <Link href={href}>{text}</Link> : text}
    </Button>
  );
};

export default MyButton;
