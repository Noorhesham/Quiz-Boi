"use client";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import Slide from "./Slide";
import { useColor } from "../context/ColorContext";
const Slider = () => {
  const { color } = useColor();

  return (
    <Carousel
      className={`${color}  w-[45%] bg-gray-100 `}
      opts={{ loop: true }}
      plugins={[
        Autoplay({
          delay: 3000,
        }),
      ]}
    >
      <CarouselContent>
        <CarouselItem>
          <Slide
            text="Elevate your learning experience with Quiz Boi, the ultimate destination for fun and challenging quizzes."
            image="/log2.png"
          />
        </CarouselItem>
        <CarouselItem>
          <Slide
            text="Explore a world of quizzes tailored to your interests with Quiz Boi, your go-to platform for endless learning and entertainment."
            image="/log1.png"
          />
        </CarouselItem>
        <CarouselItem>
          <Slide
            text="Embark on a journey of knowledge with Quiz Boi, where learning meets excitement in every question"
            image="/cat.png"
          />
        </CarouselItem>
      </CarouselContent>
    </Carousel>
  );
};

export default Slider;
