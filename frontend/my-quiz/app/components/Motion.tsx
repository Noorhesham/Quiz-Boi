"use client";
import { motion } from "framer-motion";
import { container } from "../motion";
import { ReactNode } from "react";

const Motion = ({
  children,
  className,
  animate,
  id,
}: {
  children: ReactNode;
  className?: string;
  animate?: boolean;
  id?: string;
}) => {
  return animate ? (
    <motion.div id={id} className={`${className || ""}`} viewport={{ once: true }} initial="hidden" animate="visible" variants={container}>
      {children}
    </motion.div>
  ) : (
    <motion.div id={id} className={`${className || ""}`} viewport={{ once: true }} initial="hidden" whileInView="visible" variants={container}>
      {children}
    </motion.div>
  );
};

export default Motion;
