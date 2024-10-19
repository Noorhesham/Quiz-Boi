import { getMyPlayedQuizzes } from "@/actions/GetPlayedQuizzes";
import MapPlay from "@/app/components/MapPlay";
import { API_URL } from "@/constants";
import React from "react";

const page = async ({ params: { id } }: { params: { id: string } }) => {
  const data = await fetch(`${API_URL}/map/${id}`, { cache: "no-store" }).then((res) => res.json());
  const myAttempts=await getMyPlayedQuizzes()
  const map = data.data.map;
  console.log(myAttempts)
  return (
    <div>
      <MapPlay myquizzes={myAttempts.attemptedQuizzes} map={map} />
    </div>
  );
};

export default page;
