"use client";
import { formatCreatedAt } from "@/utils/date";
import React from "react";
import { AreaChart, Area, ResponsiveContainer, YAxis, XAxis, CartesianGrid, Legend, Tooltip } from "recharts";
import Heading from "./Heading";

const AreaChartCustom = ({ userAttempts }: { userAttempts: any }) => {
  userAttempts = userAttempts.sort(
    (a: any, b: any) => new Date(a.attemptedAt).getTime() - new Date(b.attemptedAt).getTime()
  );
  const chartData = userAttempts.map((attempt: any) => ({
    attemptedAt: formatCreatedAt(attempt.attemptedAt),
    percentage: `${Math.round(attempt.percentage * 10) / 10} %` || 0,
    points: attempt.points,
    totalPoints: attempt.totalPoints,
    quizName: attempt.quizId?.title,
  }));
  return (
    //@ts-ignore

    <ResponsiveContainer className={"px-5 mt-14 md:mt-2 md:px-0"} width={"100%"} height={380}>
      <Heading
        text="User Plays !"
        paragraph="Here you can find a brief summary anout your scores in the quizzes you played !"
      />
      <AreaChart className=" bg-white/90 rounded-xl py-3 px-6" width={500} height={400} data={chartData}>
        <YAxis dataKey={"totalPoints"} />
        <XAxis dataKey="attemptedAt" />
        <CartesianGrid strokeDasharray="5 5" />
        <Tooltip content={<CustomeToolTip />} />
        <Legend />
        {/* <Area stackId={1} type="monotone" fill="#3b82f6" dataKey="totalPoints" name="Total Points" /> */}
        <Area stackId={1} type="monotone" fill="#82ca9d" dataKey="percentage" name="Percentage" />
        <Area stackId={1} type="monotone" fill="#ffc658" dataKey="points" name="Points" />
      </AreaChart>
    </ResponsiveContainer>
  );
};
const CustomeToolTip = ({ active, payload, label }: { active?: any; payload?: any; label?: any }) => {
  if (active && payload.length && label) {
    const quizName = payload[0]?.payload?.quizName || "Unknown Quiz";
    return (
      <div className=" p-4 bg-slate-100/40 flex flex-col gap-4 rounded-md">
        <p className=" text-gray-800 text-lg">{label}</p>
        <p className="flex items-center gap-1">
          Quiz: <div>{quizName}</div>
        </p>
        <p className="flex items-center gap-1">
          {payload[0].name}: <div>{payload[0].value}</div>
        </p>
        <p className="flex items-center gap-1">
          {payload[1].name}: <div>{payload[1].value}</div>
        </p>
      </div>
    );
  }
};
export default AreaChartCustom;
