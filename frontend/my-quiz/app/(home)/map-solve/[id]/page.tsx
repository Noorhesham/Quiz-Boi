import MapPlay from "@/app/components/MapPlay";
import { API_URL } from "@/constants";
import React from "react";

const page = async ({ params: { id } }: { params: { id: string } }) => {
  const data = await fetch(`${API_URL}/map/${id}`, { cache: "no-store" }).then((res) => res.json());
  const map = data.data.map;
  return (
    <div>
      <MapPlay map={map} />
    </div>
  );
};

export default page;
