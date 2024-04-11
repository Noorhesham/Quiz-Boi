import React, { useState } from "react";
import LazyLoad from "react-lazy-load";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { AnimatePresence,  } from "framer-motion";
import CategoreyCadHover from "./CategoreyCadHover";
const CategoreyCard = ({ tag, setCategorey, large = false }: { tag: any; setCategorey: any; large?: boolean }) => {
  const [hover, setHover] = useState(false);
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        {large ? (
          <LazyLoad key={tag?.tag}>
            <div
              onMouseEnter={() => setHover(true)}
              onMouseLeave={() => setHover(false)}
              className="h-96 relative cursor-pointer bg-gray-200 rounded-lg overflow-hidden"
            >
              <img
                onClick={() => setCategorey(tag.tag)}
                src={tag?.photo}
                alt={tag?.tag}
                className="w-full h-full rounded-lg object-cover object-top"
              />
              <AnimatePresence>{hover && <CategoreyCadHover tag={tag.tag} />}</AnimatePresence>
            </div>
          </LazyLoad>
        ) : (
          <LazyLoad key={tag.tag} height={200}>
            <div
              onMouseEnter={() => setHover(true)}
              onMouseLeave={() => setHover(false)}
              onClick={() => setCategorey(tag.tag)}
              className="h-48 cursor-pointer  relative w-48 bg-gray-200 rounded-lg "
            >
              <img src={tag.photo} alt={tag.tag} className="w-full rounded-lg h-full object-cover" />
              <AnimatePresence>{hover && <CategoreyCadHover tag={tag.tag} />}</AnimatePresence>
            </div>
          </LazyLoad>
        )}
      </HoverCardTrigger>
      <HoverCardContent className="w-80">
        <div className="flex justify-between space-x-4">
          <div className="space-y-1">
            <h4 className="text-sm font-semibold">@nextjs</h4>
            <p className="text-sm">The React Framework – created and maintained by @vercel.</p>
            <div className="flex items-center pt-2">
              <span className="text-xs text-muted-foreground">Joined December 2021</span>
            </div>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
};

export default CategoreyCard;
