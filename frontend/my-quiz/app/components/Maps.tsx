"use client";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { useGetUser } from "@/utils/queryFunctions";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import YouAreNotAuth from "./YouAreNotAuth";
import DialogCustom from "./DialogCustom";

const Maps = ({ maps }: { maps: any }) => {
  const { user, isLoading } = useGetUser();
  console.log(user)
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
      className="max-w-full bg-gray-50 rounded-xl mt-5   py-5 px-10 "
    >
      <CarouselContent className=" px-4 py-2  mt-3">
        {maps &&
          maps.map((map: any, i: number) => (
            <CarouselItem key={i} className="  basis-full lg:basis-1/2">
              {user && !isLoading ? (
                <Link className="flex flex-col gap-2" href={`/map-solve/${map._id}`}>
                  <div className=" w-full h-80 relative">
                    <Image fill src={map.mapImage} alt="map" className=" object-cover rounded-xl" />
                  </div>
                  <div className=" text-gray-800 px-3 py-1.5 font-medium justify-between flex items-center">
                    <h2 className=" font-semibold">{map.name}</h2>
                    <h2>{map.levels.length} Levels</h2>
                  </div>
                </Link>
              ) : (
                <DialogCustom
                  btn={
                    <div className="flex flex-col gap-2">
                      <div className=" w-full h-80 relative">
                        <Image fill src={map.mapImage} alt="map" className=" object-cover rounded-xl" />
                      </div>
                      <div className=" text-gray-800 px-3 py-1.5 font-medium justify-between flex items-center">
                        <h2 className=" font-semibold">{map.name}</h2>
                        <h2>{map.levels.length} Levels</h2>
                      </div>
                    </div>
                  }
                  content={<YouAreNotAuth />}
                />
              )}
            </CarouselItem>
          ))}
      </CarouselContent>
      <CarouselPrevious className=" hidden md:block absolute left-4 " />
      <CarouselNext className=" hidden md:block absolute right-4 " />
    </Carousel>
  );
};

export default Maps;
