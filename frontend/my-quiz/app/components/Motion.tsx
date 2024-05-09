"use client";
import { motion } from "framer-motion";
import { container } from "../motion";
import { ReactNode } from "react";

const Motion = ({ children, className, animate }: { children: ReactNode; className?: string; animate?: boolean }) => {
  return animate ? (
    <motion.div className={`${className || ""}`} initial="hidden" animate="visible" variants={container}>
      {children}
    </motion.div>
  ) : (
    <motion.div className={`${className || ""}`} initial="hidden" whileInView="visible" variants={container}>
      {children}
    </motion.div>
  );
};

export default Motion;