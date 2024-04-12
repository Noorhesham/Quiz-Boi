import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";

const Leave = ({ setOpen }: { setOpen?: any }) => {
  return (
    <div className="flex flex-col  items-center gap-10">
      <p className=" text-2xl my-5 font-normal text-gray-600 text-center">
        Are you sure you want to Leave this page ?your progress will be save in the browser unless you start a new quiz
        !🤖🤖
      </p>
      <Image width={250} height={250} src="/confused.png" alt="remove" />
      <div className=" self-end flex items-center gap-5">
        <Button onClick={() => {}} variant="destructive">
          Leave
        </Button>
        {
          <Button onClick={() => setOpen && setOpen(false)} variant="secondary">
            Cancel
          </Button>
        }
      </div>
    </div>
  );
};

export default Leave;
