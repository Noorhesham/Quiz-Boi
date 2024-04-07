"use client";
import { IoChevronBack } from "react-icons/io5";
import { Button } from "@/components/ui/button";

interface BackButtonProps {
  onClick: () => void;
  label: string;
}
const BackButton = ({ onClick, label }: BackButtonProps) => {
 
  return (
    <button
      onClick={(e)=>{
        e.preventDefault()
        onClick()}} 
      className="flex w-fit hover:text-red-600 hover:underline self-start justify-start ml-[-50px] mt-[-10px] items-center font-normal "
    >
      <IoChevronBack /> {label}
    </button>
  );
};
export default BackButton;
