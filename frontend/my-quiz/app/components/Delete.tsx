"use client";
import { API_URL } from "@/constants";
import { useRouter } from "next/navigation";
import React, { useTransition } from "react";
import { toast } from "react-toastify";
import DialogCustom from "./DialogCustom";
import { FaSpinner, FaTrash } from "react-icons/fa";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { DialogClose } from "@/components/ui/dialog";
import cookies from "js-cookie";
const Delete = ({ entity, id }: { entity: string; id: string }) => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const handleClick = () => {
    startTransition(() => {
      const res = fetch(`${API_URL}/${entity}/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${cookies.get("jwt")}`,
        },
      }).then((res) => res.json());
      console.log(res);
      if (res.status === 200) {
        toast.success("Quiz deleted successfully");
        router.refresh();
      } else {
        toast.error(res.message);
      }
    });
  };
  return (
    <DialogCustom
      title={`Delete ${entity} ?`}
      content={
        <div className="flex flex-col  items-center gap-10">
          <p className=" text-2xl my-5 font-normal text-gray-600 text-center">Are you sure you want to delete ?</p>
          <div className="">
            {isPending ? (
              <FaSpinner className=" text-4xl animate-spin duration-200 " />
            ) : (
              <Image width={250} height={250} src="/confused.png" alt="remove" />
            )}
          </div>

          <div className=" self-end flex items-center gap-5">
            <Button onClick={() => handleClick()} variant="destructive">
              Delete
            </Button>
            {<DialogClose>Cancel</DialogClose>}
          </div>
        </div>
      }
      btn={
        <Button className=" text-gray-800 flex gap-3 items-center hover:bg-green-200 duration-150 text-sm md:text-xl  bg-white rounded-xl self-end">
          Delete {entity} <FaTrash className=" hover:text-red-300 duration-150 text-red-500 cursor-pointer  " />
        </Button>
      }
    />
  );
};

export default Delete;
