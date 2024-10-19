import Delete from "@/app/components/Delete";
import DialogCustom from "@/app/components/DialogCustom";
import { Empty } from "@/app/components/Empty";
import FloatingTool from "@/app/components/FloatingTool";
import GlobalButton from "@/app/components/GlobalButton";
import Heading from "@/app/components/Heading";
import MapForm from "@/app/components/MapForm";
import MyButton from "@/app/components/MyButton";
import PublishQuiz from "@/app/components/PublishQuiz";
import UploadQuizForm from "@/app/components/UploadQuizForm";
import { Button } from "@/components/ui/button";
import { API_URL } from "@/constants";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const page = async ({ params: { id } }: { params: { id: string } }) => {
  const data = await fetch(`${API_URL}/map/${id}`, { cache: "no-store" }).then((res) => res.json());
  const map = data.data.map;
  console.log(map.levels[0]);
  return (
    <main className="text-gray-50 pt-20 sm:pt-24 flex flex-col gap-3 p-5 md:px-10 pb-10">
      <FloatingTool />
      <div className="flex flex-wrap justify-between items-center">
        <Heading text={`Your ${map.name} Map is here ! Get prepared to add levels to it !`} />
        <div className="flex items-center gap-2">
          <DialogCustom title="Edit  Map" btn={<GlobalButton text="Edit Map" />} content={<MapForm map={map} />} />
          <Link href={`/map/${map._id}`}>
            <Button className=" rounded-full shadow-lg text-lg bg-pink-400 hover:bg-transparent hover:text-pink-400 duration-200 text-gray-100">
              EDIT POSITIONS
            </Button>
          </Link>

          <Delete entity="map" id={map._id} />
        </div>
      </div>

      <section className=" flex flex-col gap-5 px-10 py-5">
        {map.levels.length < 1 && <Empty text="You have not added any levels yet !" />}
        {map.levels
          .map((l) => l.quizId)
          .map((level) => (
            <Link
              href={`/quiz-upload/${level._id}`}
              className=" flex items-center gap-2 px-4 py-3 rounded-xl bg-white border border-input"
            >
              <div className=" w-16 h-16 relative">
                <Image
                  className=" object-cover rounded-xl"
                  src={`${level?.coverImage?.includes("quiz") ? "/quiz3.png" : level?.coverImage}` || "/quiz3.png"}
                  fill
                  alt="level"
                />
              </div>
              <h2 className=" text-base lg:text-lg font-semibold ml-3 text-black">{level.title}</h2>
              <div className=" ml-auto flex items-center gap-2">
                <Delete entity="quiz" id={level._id} />
              </div>
            </Link>
          ))}
      </section>
      <div className="flex gap-40 items-center fixed right-10 bottom-5">
        <DialogCustom
          title="Want to Create a New Level?"
          btn={<GlobalButton text="Create A level now" />}
          content={<UploadQuizForm map={map._id} />}
        />
        <PublishQuiz entity="map" />
      </div>
    </main>
  );
};

export default page;
