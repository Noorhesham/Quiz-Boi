"use client";
import React from "react";
import { motion, Variants } from "framer-motion";
import { useIsMobile } from "@/hooks/useMobile";

const MotionItem = ({
  children,
  className,
  variants,
  initial,
  animate,
  exit,
  whileInView,
  nohover,
  transition,
  onMouseEnter,
  onMouseLeave,
}: {
  nohover?: boolean;
  children: React.ReactNode;
  className?: string;
  variants?: Variants;
  initial?: any;
  animate?: any;
  exit?: any;
  whileInView?: any;
  transition?: any;
  onMouseEnter?: any;
  onMouseLeave?: any;
}) => {
  const isMobile = useIsMobile();
  if (isMobile) return <div className={className}>{children}</div>;
  return (
    <motion.div
      whileHover={nohover ? {} : { y: -10 }}
      initial={initial}
      animate={animate}
      exit={exit}
      transition={transition}
      className={className}
      onMouseLeave={onMouseLeave}
      onMouseEnter={onMouseEnter}
      whileInView={whileInView}
      variants={animate ? undefined : variants}
    >
      {children}
    </motion.div>
  );
};

export default MotionItem;
