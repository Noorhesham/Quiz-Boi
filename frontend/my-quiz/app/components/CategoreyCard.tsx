import React, { useState } from "react";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { AnimatePresence } from "framer-motion";
import CategoreyCadHover from "./CategoreyCadHover";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

const CategoreyCard = ({ tag, setCategorey, large = false }: { tag: any; setCategorey: any; large?: boolean }) => {
  const [hover, setHover] = useState(false);
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        {large ? (
          <div key={tag?.tag}>
            <div
              onMouseEnter={() => setHover(true)}
              onMouseLeave={() => setHover(false)}
              className="h-96 relative cursor-pointer bg-gray-200 rounded-lg overflow-hidden"
            >
              <LazyLoadImage
                effect="blur"
                onClick={() => setCategorey(tag.tag)}
                src={tag?.photo}
                alt={tag?.tag}
                className="w-full h-full rounded-lg object-cover object-top"
              />
              <AnimatePresence>{hover && <CategoreyCadHover tag={tag.tag} />}</AnimatePresence>
            </div>
          </div>
        ) : (
            <div
              onMouseEnter={() => setHover(true)}
              onMouseLeave={() => setHover(false)}
              onClick={() => setCategorey(tag.tag)}
              className="h-48 cursor-pointer  relative w-48 bg-gray-200 rounded-lg "
            >
              <LazyLoadImage
                effect="blur"
                src={tag.photo}
                alt={tag.tag}
                className="w-full rounded-lg h-full object-cover aspect-[1/1]"
              />
              <AnimatePresence>{hover && <CategoreyCadHover tag={tag.tag} />}</AnimatePresence>
            </div>
        )}
      </HoverCardTrigger>
      <HoverCardContent className="w-80">
        <div className="flex justify-between space-x-4">
          <div className="space-y-1">
            <h4 className="text-sm font-semibold">{tag.tag}</h4>
            <p className="text-sm">Filter Quizzes By your favouriate topic! {tag.tag}.</p>
            <div className="flex items-center pt-2">
              <span className="text-xs text-muted-foreground">Get Quizzes for certain topic</span>
            </div>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
};

export default CategoreyCard;
