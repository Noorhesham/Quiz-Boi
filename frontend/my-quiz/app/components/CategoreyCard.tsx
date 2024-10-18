import React, { useEffect, useState } from "react";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { AnimatePresence, motion } from "framer-motion";
import CategoreyCadHover from "./CategoreyCadHover";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import { useIsMobile } from "@/hooks/useMobile";
import { item } from "../motion"; // assuming motion variants are defined in "../motion"

const CategoreyCard = ({ tag, setCategorey, large = false }: { tag: any; setCategorey: any; large?: boolean }) => {
  const [hover, setHover] = useState(false);
  const searchParams = useSearchParams();
  const search = searchParams.get("categorey");

  // Check if the search param matches the current tag to set hover state
  useEffect(() => {
    if (search === tag.tag) setHover(true);
    else setHover(false);
  }, [search, tag.tag]);

  const isMobile = useIsMobile();

  // Use `div` for mobile, and `motion.div` for larger screens
  const Container = isMobile ? "div" : motion.div;

  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        {large ? (
          <Container
            {...(!isMobile && { variants: item })} // Only add motion variants if not mobile
            key={tag?.tag}
          >
            <div
              onClick={() => setCategorey(tag.tag)}
              onMouseEnter={() => {
                if (search !== tag.tag) setHover(true);
              }}
              onMouseLeave={() => {
                if (search !== tag.tag) setHover(false);
              }}
              className="md:h-96 w-full h-auto relative cursor-pointer bg-gray-200 rounded-lg overflow-hidden"
            >
              <Image
                fill
                src={tag?.photo}
                alt={tag?.tag}
                className="w-full h-full rounded-lg object-cover block md:object-top"
              />
              <AnimatePresence>{hover && <CategoreyCadHover tag={tag.tag} />}</AnimatePresence>
            </div>
          </Container>
        ) : (
          <div
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => {
              if (search !== tag.tag) setHover(false);
            }}
            onClick={() => setCategorey(tag.tag)}
            className="md:h-48 h-36 cursor-pointer relative w-36 md:w-48 bg-gray-200 rounded-lg"
          >
            <Image
              fill
              src={tag?.photo}
              alt={tag?.tag}
              className="w-full block rounded-lg h-full object-cover aspect-[1/1]"
            />
            <AnimatePresence>{hover && <CategoreyCadHover tag={tag.tag} />}</AnimatePresence>
          </div>
        )}
      </HoverCardTrigger>

      <HoverCardContent className="w-80">
        <div className="flex justify-between space-x-4">
          <div className="space-y-1">
            <h4 className="text-sm font-semibold">{tag.tag}</h4>
            <p className="text-sm">Filter Quizzes by your favorite topic! {tag.tag}.</p>
            <div className="flex items-center pt-2">
              <span className="text-xs text-muted-foreground">Get Quizzes for this topic</span>
            </div>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
};

export default CategoreyCard;
