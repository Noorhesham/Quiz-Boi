"use client"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { ReactNode } from "react";
import { createPortal } from "react-dom";

const ToolTip = ({ trigger, content }: { trigger: ReactNode; content: ReactNode }) => {
  return<TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>{trigger}</TooltipTrigger>
        {createPortal(<TooltipContent className="max-w-80 z-50">{content}</TooltipContent>,document?.body)}
      </Tooltip>
    </TooltipProvider>
};

export default ToolTip;
