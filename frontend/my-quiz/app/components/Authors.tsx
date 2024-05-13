"use client";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import Heading from "./Heading";
import Image from "next/image";
import TopAuthor from "./TopAuthor";
import DialogCustom from "./DialogCustom";
import AllCategories from "./AllCategories";
import { IoIosArrowForward } from "react-icons/io";
import AllAuthors from "./AllAuthors";

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
  return (
    <section className=" md:px-4 md:py-2">
      <div className=" px-1 md:px-0">
        <div className="friends   flex flex-col md:flex-row  justify-center md:justify-around px-2 md:pl-10  xl:pl-[17.5rem]  items-center rounded-xl relative">
          <p className=" text-gray-100   max-w-full text-base py-4 p-2 md:text-lg  lg:text-2xl md:max-w-full  lg:max-w-[26rem] text-center md:text-left md:font-semibold">
            Connect with friends, challenge them, and track their progress effortlessly. Whether you're in the same room
            or continents apart, Quiz Boi makes every quiz night unforgettable.
          </p>
          <Image
            className=" self-end floating md:ml-20 w-[16rem] md:w-[15rem] lg:w-[30rem] "
            src={"/findfriend.png"}
            height={400}
            width={400}
            alt="find"
          />
        </div>
      </div>
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
        <div className="flex w-full justify-between items-center">
          <Heading span={span} className=" py-2 px-4" dark text={text || "Suggested For You :"}>
            {img && (
              <Image
                className=" hidden md:block md:w-[10rem]"
                src={"/cause.png"}
                width={200}
                height={200}
                alt="Followed"
              />
            )}
          </Heading>
          <DialogCustom
            title="Search any user !"
            description="Find Specific User.. and browse thier profile and Follow them !"
            content={<AllAuthors />}
            btn={
              <button className=" text-lg ml-auto  md:text-3xl flex items-center gap-2 text-violet-400 underline hover:text-violet-500 cursor-pointer duration-150">
                View All <IoIosArrowForward />
              </button>
            }
          />
        </div>

        <CarouselContent className=" px-4 py-2  mt-3">
          {list &&
            list.map((user: any, i: number) => (
              <CarouselItem key={i} className=" basis-[27%] md:basis-1/4 lg:basis-1/5">
                <TopAuthor user={user} />
              </CarouselItem>
            ))}
        </CarouselContent>
        <CarouselPrevious className=" hidden md:block absolute left-0 " />
        <CarouselNext className=" hidden md:block absolute right-0 " />
      </Carousel>
    </section>
  );
};

export default Authors;
