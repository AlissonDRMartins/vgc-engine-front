"use client";

import { PropsWithChildren } from "react";
import { motion } from "framer-motion";

export const PokebuilderCard = ({ children }: PropsWithChildren) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      transition={{ delay: 1.5 }}
      className="w-full h-full border relative overflow-hidden bg-stone-100 dark:bg-stone-800 rounded-lg shadow-lg flex items-center justify-center"
    >
      <div className="w-full h-full z-10">{children}</div>
      <div
        className="absolute w-[150%] md:w-[55%] h-[370px] md:h-[320px] left-0 top-0 bg-red-900 dark:bg-red-500/30 z-0"
        style={{
          clipPath: "polygon(0 0, calc(100% - 130px) 0, 100% 100%, 0 100%)",
        }}
      />
    </motion.div>
  );
};
