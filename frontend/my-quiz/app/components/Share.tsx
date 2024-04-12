import React, { useState } from "react";
import { BiSolidCopy } from "react-icons/bi";
import { IoMdShare } from "react-icons/io";
import { toast } from "react-toastify";

const Share = ({ link }: { link: string }) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(link);
    setCopied(true);
    toast.success("Link copied to clipboard ! 😺🚀");
  };

  return (
    <button className="rounded-full  p-1 bg-white hover:text-opacity-90 duration-150 text-gray-900 font-semibold text-center" disabled={copied} onClick={copyToClipboard}>
      {!copied ? (
        <BiSolidCopy className=" text-gray-300 hover:text-green-400 duration-200 " />
      ) : (
        <IoMdShare className=" text-red-500 hover:text-red-400 duration-200 " />
      )}
    </button>
  );
};

export default Share;
