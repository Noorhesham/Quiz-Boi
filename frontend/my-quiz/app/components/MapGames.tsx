import React from "react";
import Heading from "./Heading";
import { API_URL } from "@/constants";
import MaxWidthWrapper from "./MaxWidthWrapper";
import Maps from "./Maps";

const MapGames = async () => {
  const data = await fetch(`${API_URL}/map?public=true`, { next:{revalidate:3600}}).then((res) => res.json());

  const maps = data.data.map;
  return (
    <MaxWidthWrapper className=" relative pt-5">
      <div className="md:p-8 p-4 flex md:flex-row flex-col items-start justify-between">
        <Heading text="PLAY WITH LEVELS ! " paragraph="Choose a Map and play through it with your progress !  " />
      </div>
      <div>
        <Maps maps={maps} />
      </div>
    </MaxWidthWrapper>
  );
};

export default MapGames;
