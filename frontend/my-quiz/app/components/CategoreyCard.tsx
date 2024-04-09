import React from "react";
import LazyLoad from "react-lazy-load";
  import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
  } from "@/components/ui/hover-card"
const CategoreyCard = ({ tag, setCategorey, large = false }: { tag: any; setCategorey: any; large?: boolean }) => {
  return <HoverCard>
  <HoverCardTrigger asChild>
  {large ? (
      <LazyLoad key={tag.tag} >
        <div className="h-96 bg-gray-200 rounded-lg overflow-hidden">
          <img
            onClick={() => setCategorey(tag.tag)}
            src={tag?.photo}
            alt={tag?.tag}
            className="w-full h-full object-cover object-top"
          />
        </div>
      </LazyLoad>
    ) : (
      <LazyLoad key={tag.tag} height={200}>
        <div
          onClick={() => setCategorey(tag.tag)}
          key={tag.tag}
          className="h-48  relative w-48 bg-gray-200 rounded-lg overflow-hidden"
        >
          <img src={tag.photo} alt={tag.tag} className="w-full h-full object-cover" />
        </div>
      </LazyLoad>
    )}
  </HoverCardTrigger>
  <HoverCardContent className="w-80">
    <div className="flex justify-between space-x-4">
      <div className="space-y-1">
        <h4 className="text-sm font-semibold">@nextjs</h4>
        <p className="text-sm">
          The React Framework – created and maintained by @vercel.
        </p>
        <div className="flex items-center pt-2">
          <span className="text-xs text-muted-foreground">
            Joined December 2021
          </span>
        </div>
      </div>
    </div>
  </HoverCardContent>
  </HoverCard>
};

export default CategoreyCard;
