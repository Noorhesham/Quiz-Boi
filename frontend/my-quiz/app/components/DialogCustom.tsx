"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import React, { useState, forwardRef } from "react";

// Ensure btn can accept refs using forwardRef
const ButtonWithRef = forwardRef<HTMLButtonElement, any>((props, ref) => (
  <div ref={ref} {...props}>
    {props.children}
  </div>
));

ButtonWithRef.displayName = "ButtonWithRef";

const DialogCustom = ({
  btn,
  content,
  title,
  isopen = false,
  description,
}: {
  btn: any;
  content: any;
  title?: string;
  isopen?: boolean;
  description?: string;
}) => {
  const [open, setOpen] = useState(isopen);

  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <ButtonWithRef>{btn}</ButtonWithRef>
        </DialogTrigger>
        <DialogContent className="z-50 max-h-full min-h-fit overflow-y-scroll sm:max-w-[825px]">
          <DialogHeader>
            <DialogTitle>{title ? title : "Add a Question"}</DialogTitle>
            <DialogDescription>
              {description ? description : "Add your Quiz Info here 😺. Click save when you're done."}
            </DialogDescription>
          </DialogHeader>
          {React.cloneElement(content, { setOpen })}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DialogCustom;
