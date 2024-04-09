"use client";
import { createContext, useContext, useEffect, useState } from "react";

type ColorContextType = {
  color: string;
  setColor: (color: string) => void;
};
const colorContext = createContext<ColorContextType | undefined>(undefined);

function ColorProvider({ children }: { children: React.ReactNode }) {
  const [color, setColor] = useState(function () {
    const storedValue = global?.localStorage?.getItem("color");
    return storedValue ? JSON.parse(storedValue) : "purple";
  });
  useEffect(
    function () {
      localStorage.setItem("color", JSON.stringify(color));
    },
    [color]
  );
  const contextValue: ColorContextType = {
    color,
    setColor,
  };
  return <colorContext.Provider value={contextValue}>{children}</colorContext.Provider>;
}

function useColor() {
  const context = useContext(colorContext);
  if (!context) throw new Error("useColor must be used within a ColorProvider");
  return context;
}

export { ColorProvider, useColor };
