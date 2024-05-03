"use client";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import QuizCard from "./QuizCard";
import Autoplay from "embla-carousel-autoplay";
import Heading from "./Heading";
import { QuizProps } from "@/types";

const BecauseYouFollowed = ({user,suggesstions,text}:{user?:any,suggesstions?:[QuizProps],text?:string}) => {
  const list=suggesstions?suggesstions:user.likedQuizzes;
  console.log(list)
  return (
    <Carousel
      plugins={[
        Autoplay({
          delay: 2000,
        }),
      ]}
      opts={{
        align: "center",
        loop: true,
      }}
      className="max-w-full p-10 "
    >
      <Heading text={text||"Suggested For You :"} />
      <CarouselContent className=" mt-4">
        {list.map((quiz: any, i: number) =>{
          if(!quiz||!quiz.title) return null
          return  (
            <CarouselItem key={i} className="md:basis-1/2 lg:basis-1/4">
              <QuizCard quiz={quiz} />
            </CarouselItem>
          )  
        })}
      </CarouselContent>
      <CarouselPrevious className=" absolute left-0 " />
      <CarouselNext className=" absolute right-0 " />
    </Carousel>
  );
};

export default BecauseYouFollowed;
