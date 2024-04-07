"use client";
import React from "react";
import { useColor } from "../context/ColorContext";

const ColorWrapper = ({ children }: { children: React.ReactNode }) => {
  const { color } = useColor();
  return <section className={` min-h-[100vh] ${color}`}>{children}</section>;
};

export default ColorWrapper;
