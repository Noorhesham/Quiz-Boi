"use client"
import { Reorder } from "framer-motion";
import React, { ReactNode } from "react";

const Ordering = ({ items, handleReorder, children }: { items: any; handleReorder: any; children: ReactNode }) => {
  return (
    <Reorder.Group axis="y" className="flex flex-col gap-4" values={items} onReorder={handleReorder}>
      {children}
    </Reorder.Group>
  );
};

export default Ordering;
