"use client";

import { motion } from "framer-motion";

import Image from "next/image";
import pokeball from "@/assets/images/pokeball.png";

export const TeamBuilderTitle = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      className="flex gap-3"
    >
      <Image
        src={pokeball}
        height={20}
        width={40}
        alt="Pokeball icon"
        priority
      />
      <h1 className="text-4xl font-bold">Team Builder</h1>
    </motion.div>
  );
};
