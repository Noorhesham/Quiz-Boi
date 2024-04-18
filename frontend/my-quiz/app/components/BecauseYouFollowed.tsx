"use client";
import { useGetUser } from "@/utils/queryFunctions";
import React from "react";
import Spinner from "./Spinner";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import QuizCard from "./QuizCard";
import Autoplay from "embla-carousel-autoplay";
import Heading from "./Heading";

const BecauseYouFollowed = () => {
  const { user, isLoading } = useGetUser();
  if (isLoading) return <Spinner />;
  if (!user || !user.likedQuizzes) return;
  console.log(user);
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
      <Heading text="Suggested For You :" />
      <CarouselContent className=" mt-4">
        {user.likedQuizzes.map((quiz: any, i: number) => (
          <CarouselItem key={i} className="md:basis-1/2 lg:basis-1/4">
            <QuizCard quiz={quiz.quiz} />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className=" absolute left-0 " />
      <CarouselNext className=" absolute right-0 " />
    </Carousel>
  );
};

export default BecauseYouFollowed;
