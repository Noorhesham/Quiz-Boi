"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import React, { useState } from "react";

const DialogueQuiz = ({
  btn,
  content,
  title,
  isopen = false,
}: {
  btn: any;
  content: any;
  title?: string;
  isopen?: boolean;
}) => {
  const [open, setOpen] = useState(isopen);
  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>{btn}</DialogTrigger>
        <DialogContent className=" max-h-[90%]  top-[60%]  min-h-fit overflow-y-scroll sm:max-w-[100%]">
          {React.cloneElement(content, { setOpen })}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DialogueQuiz;
