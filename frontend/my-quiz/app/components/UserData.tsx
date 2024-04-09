"use client";
import { useGetStats } from "@/utils/queryFunctions";
import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Legend } from "recharts";
import Spinner from "./Spinner";

const UserData = () => {
  const { stats, isLoading } = useGetStats();
  if (isLoading) return <Spinner />;
  const { totalPoints, averagePercentage, totalAttempts } = stats;
  const data = [
    { name: "Total Points", value: totalPoints },
    { name: "Average Percentage", value: averagePercentage },
    { name: "Total Attempts", value: totalAttempts },
  ];
  console.log(stats);
  return (
    <BarChart className=" text-gray-800" width={730} height={250} data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis tick={{ fill: "gray" }} dataKey="name" />
      <YAxis tick={{ fill: "gray" }} domain={[0, 100]} tickCount={6} />
      <Tooltip />
      <Legend />
      <Bar dataKey="value" fill="white" />
    </BarChart>
  );
};

export default UserData;
