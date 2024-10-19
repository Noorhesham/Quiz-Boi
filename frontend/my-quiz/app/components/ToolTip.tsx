"use client";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import React, { ReactNode } from "react";
import { createPortal } from "react-dom";

const ToolTip = ({ trigger, content }: { trigger: ReactNode; content: ReactNode }) => {
  const [isMounted, setIsMounted] = React.useState(false);

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>{trigger}</TooltipTrigger>
        {createPortal(<TooltipContent className="max-w-80 z-50">{content}</TooltipContent>, global?.document?.body)}
      </Tooltip>
    </TooltipProvider>
  );
};

export default ToolTip;
