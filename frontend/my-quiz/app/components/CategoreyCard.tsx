import React, { useEffect, useState } from "react";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { AnimatePresence } from "framer-motion";
import CategoreyCadHover from "./CategoreyCadHover";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { useSearchParams } from "next/navigation";

const CategoreyCard = ({ tag, setCategorey, large = false }: { tag: any; setCategorey: any; large?: boolean }) => {
  const [hover, setHover] = useState(false);
  const searchParams = useSearchParams();
  const search = searchParams.get("categorey");
  useEffect(function () {
    if (search === tag.tag) setHover(true);
    else setHover(false)
  }, [search]);
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        {large ? (
          <div key={tag?.tag}>
            <div
              onClick={() => setCategorey(tag.tag)}
              onMouseEnter={() => {
                if (search === tag.tag) return;
                else setHover(true);
              }}
              onMouseLeave={() => {
                if (search === tag.tag) return;
                else setHover(false);
              }}
              className="md:h-96 h-auto relative cursor-pointer bg-gray-200 rounded-lg overflow-hidden"
            >
              <LazyLoadImage
                effect="blur"
                threshold={100}
                style={{ display: "block" }}
                src={tag?.photo}
                alt={tag?.tag}
                className="w-full h-full rounded-lg object-cover block md:object-top"
              />
              <AnimatePresence>{hover && <CategoreyCadHover tag={tag.tag} />}</AnimatePresence>
            </div>
          </div>
        ) : (
          <div
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => {
              if (search === tag.tag) return;
              else setHover(false);
            }}
            onClick={() => setCategorey(tag.tag)}
            className="h-48 cursor-pointer  relative w-48 bg-gray-200 rounded-lg "
          >
            <LazyLoadImage
              effect="blur"
              threshold={100}
              src={tag.photo}
              alt={tag.tag}
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
