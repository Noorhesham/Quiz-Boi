"use client";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import QuizCard from "./QuizCard";
import Autoplay from "embla-carousel-autoplay";
import Heading from "./Heading";
import { QuizProps } from "@/types";
import Image from "next/image";

const BecauseYouFollowed = ({
  user,
  img,
  suggesstions,
  text,
  span,
  DELAY = 2000,
}: {
  user?: any;
  suggesstions?: [QuizProps];
  text?: string;
  span?: string;
  img?: string;
  DELAY?: number;
}) => {
  const list = suggesstions ? suggesstions : user.likedQuizzes;
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
      className="max-w-full p-10 "
    >
      <Heading span={span} text={text || "Suggested For You :"}>
        {img && (
          <Image className=" hidden md:block md:w-[10rem]" src={"/cause.png"} width={200} height={200} alt="Followed" />
        )}
      </Heading>
      <CarouselContent className=" mt-4">
        {list.map((quiz: any, i: number) => {
          if (!quiz || !quiz.title) return null;
          return (
            <CarouselItem key={i} className="md:basis-1/2 lg:basis-1/4">
              <QuizCard  quiz={quiz} />
            </CarouselItem>
          );
        })}
      </CarouselContent>
      <CarouselPrevious className=" absolute left-0 " />
      <CarouselNext className=" absolute right-0 " />
    </Carousel>
  );
};

export default BecauseYouFollowed;
