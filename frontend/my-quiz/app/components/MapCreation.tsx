"use client";
import React, { useState, useTransition } from "react";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import Image from "next/image";
import MaxWidthWrapper from "@/app/components/MaxWidthWrapper";
import { TrashIcon } from "@radix-ui/react-icons";
import { toast } from "react-toastify";
import GlobalButton from "./GlobalButton";
import MotionItem from "./MotionItem";
import { AnimatePresence } from "framer-motion";
import { EditMap, editMapPositions } from "@/actions/EditQuiz";
// everytime i click the map i check whether i have a selected level or not if i have
// i track the clicked area in the map to get the positions
// then i make a new dot and it has the id of the selceted level .. if the dots already have a dot with the smae id i replace it
// then i render all the dots as x y that i chose are the styles
interface Level {
  id: string;
  position: { x: number; y: number };
  difficulty: string;
}

const MapCreation = ({ map }: { map: any }) => {
  const [dots, setDots] = useState<Level[]>(
    //@ts-ignore
    [
      ...map.levels.map((level: any) => {
        return {
          id: level.quizId.id,
          position: level.position,
          difficulty: level.difficulty,
        };
      }),
    ] || []
  );
  const [activeLevel, setActiveLevel] = useState<Level | null>(null);
  const [levels, setLevels] = useState(map.levels.map((level: any) => level.quizId) || []);
  const [hoveredDot, setHoveredDot] = useState<Level | null>(null);
  const [isPending, startTransition] = useTransition();
  const handleMapClick = (event: React.MouseEvent) => {
    if (!activeLevel) return toast.warn("Select a level first");
    const mapContainer = event.currentTarget;
    const rect = mapContainer.getBoundingClientRect();

    const x = ((event.clientX - rect.left) / rect.width) * 100; // Convert to percentage
    const y = ((event.clientY - rect.top) / rect.height) * 100; // Convert to percentage

    // Add or adjust the dot only for the selected level
    const newDot = {
      id: activeLevel.id,
      position: { x, y },
      difficulty: activeLevel.difficulty,
    };

    // Replace existing dot for the active level or add a new one
    setDots((prevDots) => {
      const index = prevDots.findIndex((dot) => dot.id === newDot.id);
      if (index >= 0) {
        // Replace the existing dot position
        const updatedDots = [...prevDots];
        updatedDots[index] = newDot;
        return updatedDots;
      } else {
        return [...prevDots, newDot];
      }
    });
  };

  const handleDotClick = (dot: Level) => {
    if (activeLevel && activeLevel.id === dot.id) {
      // Deselect the active level if clicked again
      setActiveLevel(null);
    } else {
      setActiveLevel(dot); // Select dot to adjust level
    }
  };

  const handleDeleteDot = (dotId: string) => {
    setDots((prevDots) => prevDots.filter((dot) => dot.id !== dotId));
    // Reset active level if it was the one being deleted
    if (activeLevel && activeLevel.id === dotId) {
      setActiveLevel(null);
    }
  };

  const handleLevelSelect = (level: any) => {
    setActiveLevel(level);
  };
  const handleSubmit = () => {
    if (dots.length < 1) return toast.warn("Add at least one dot to the map");
    const newLevels = dots.map((dot) => ({
      quizId: dot.id,
      position: dot.position,
      difficulty: dot.difficulty,
    }));
    console.log(newLevels);
    startTransition(async () => {
      await editMapPositions(newLevels, map._id).then((res) => {
        console.log(res);
        if (res.error) {
          toast.error(res.message);
        } else {
          toast.success("Map updated successfully");
        }
      });
    });
  };
  console.log(map);
  return (
    <MaxWidthWrapper className="grid bg-gray-100 border border-input mt-5 rounded-2xl grid-cols-1 lg:grid-cols-3">
      <div className="col-span-2 w-full relative h-[30rem] overflow-hidden">
        <TransformWrapper smooth>
          <TransformComponent wrapperStyle={{ width: "100%", height: "100%" }}>
            <div onClick={handleMapClick} className="relative w-full h-full cursor-pointer">
              <Image src={map.mapImage} className="object-contain" alt="map" fill />
              {dots.map((dot, i) => (
                <div
                  onMouseEnter={() => setHoveredDot(dot)}
                  onMouseLeave={() => setHoveredDot(null)}
                  key={dot.id}
                  onClick={() => handleDotClick(dot)}
                  className="absolute bg-red-400 rounded-full text-white flex items-center justify-center"
                  style={{
                    left: `${dot.position.x}%`,
                    top: `${dot.position.y}%`,
                    width: "20px",
                    height: "20px",
                    transform: "translate(-50%, -50%)",
                  }}
                  title={dot.difficulty}
                >
                  <AnimatePresence>
                    {hoveredDot && hoveredDot.id === dot.id && (
                      <MotionItem
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className=" absolute text-[6px] rounded-2xl  text-black font-semibold border border-input  -top-6
                     bg-white p-2"
                      >
                        <h1 className=" text-nowrap z-10">{levels[i].title}</h1>
                        <p>{levels[i].difficulty}</p>
                      </MotionItem>
                    )}
                  </AnimatePresence>
                  <Image alt="dot" src={"/dot.svg"} fill />
                  <p className=" absolute p-1 text-xs text-white ml-1 font-semibold"> {i + 1}</p>
                </div>
              ))}
            </div>
          </TransformComponent>
        </TransformWrapper>
      </div>
      <div className="flex flex-col items-start gap-4 p-4">
        <h2 className="text-lg font-bold">Select Level</h2>
        {map.levels
          .map((level: any) => level.quizId)
          .map((level: any) => (
            <button
              onClick={() => handleLevelSelect(level)}
              key={level._id}
              className={`flex ${
                activeLevel && activeLevel.id === level._id ? "bg-blue-200" : "bg-white"
              } items-center w-full gap-2 px-4 py-3 rounded-xl border border-input`}
            >
              <div className="w-16 h-16 relative">
                <Image
                  className="object-cover rounded-xl"
                  src={`${level?.coverImage?.includes("quiz") ? "/quiz3.png" : level?.coverImage}` || "/quiz3.png"}
                  fill
                  alt="level"
                />
              </div>
              <h2 className="text-base lg:text-lg font-semibold ml-3 text-black">{level.title}</h2>
              {activeLevel && activeLevel.id === level._id && (
                <TrashIcon
                  fontSize={20}
                  onClick={() => handleDeleteDot(level._id)}
                  className="ml-auto w-6 h-6 text-red-400"
                />
              )}
            </button>
          ))}
        <GlobalButton
          isPending={isPending}
          onClick={handleSubmit}
          className=" ml-auto self-end mt-4"
          text="UPDATE Map"
        />
      </div>
    </MaxWidthWrapper>
  );
};

export default MapCreation;
