import React from "react";
import MyButton from "./MyButton";
import { Button } from "@/components/ui/button";

const YouAreNotAuth = ({ setOpen }: { setOpen?: any }) => {
  return (
    <div className="flex flex-col  items-center gap-10">
      <div className="flex flex-col items-center text-center">
        <h2 className=" text-2xl my-5 font-normal text-gray-800 text-center">You are Not Authenticated !😿</h2>
        <p className=" text-gray-600 font-normal">
          To perform this action..,Please Login Or sign up a new Account to Quiz Boi ! 🚀👩‍🚀🌌
        </p>
      </div>
      <div className=" self-end flex items-center gap-5">
        <MyButton href="/login" text="Login" />
        <MyButton href="/signup" text="Signup" />
        <Button onClick={() => setOpen && setOpen(false)} variant="secondary">
          Cancel
        </Button>{" "}
      </div>
    </div>
  );
};

export default YouAreNotAuth;
