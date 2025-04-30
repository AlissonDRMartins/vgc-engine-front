"use client";

import { motion } from "framer-motion";
import { EvSection } from "./ev-section";
import { IvsSection } from "./iv-section";
import { Nature } from "./nature";

export const StatsModifier = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 5 }}
      whileInView={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 5 }}
      transition={{ delay: 0.4, duration: 0.2 }}
      className="-mt-6 mb-2 mx-2 md:mt-0 border rounded-md border-stone-200 dark:border-stone-900"
    >
      <div className="w-full flex items-center justify-between bg-stone-200 dark:bg-stone-900 text-black dark:text-white p-2 rounded-md">
        <span>Training place</span>
        <Nature />
      </div>
      <div className="flex w-full flex-col md:flex-row">
        <EvSection />
        <IvsSection />
      </div>
    </motion.div>
  );
};
