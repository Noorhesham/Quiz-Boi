"use client";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import Heading from "./Heading";
import Image from "next/image";
import TopAuthor from "./TopAuthor";

const Authors = ({
  user,
  img,
  suggesstions,
  text,
  span,
  DELAY = 2000,
}: {
  user?: any;
  suggesstions?: [any];
  text?: string;
  span?: string;
  img?: string;
  DELAY?: number;
}) => {
  const list = suggesstions;
  console.log(list)
  return (
    <Carousel 
      plugins={[
        Autoplay({
          delay: DELAY,
        }),
      ]}
      opts={{
        align: "center",
        loop: true,
      }}
      className="max-w-full bg-gray-50/80 md:p-10 "
    >
      <Heading span={span} className=" py-2 px-4" dark text={text || "Suggested For You :"}>
        {img && (
          <Image className=" hidden md:block md:w-[10rem]" src={"/cause.png"} width={200} height={200} alt="Followed" />
        )}
      </Heading>
      <CarouselContent className=" py-2 mt-4">
        {list &&
          list.map((user: any, i: number) => (
            <CarouselItem key={i} className=" basis-1/4 md:basis-1/4 lg:basis-1/4">
              <TopAuthor user={user} />
            </CarouselItem>
          ))}
      </CarouselContent>
      <CarouselPrevious className=" hidden md:block absolute left-0 " />
      <CarouselNext className=" hidden md:block absolute right-0 " />
    </Carousel>
  );
};

export default Authors;
