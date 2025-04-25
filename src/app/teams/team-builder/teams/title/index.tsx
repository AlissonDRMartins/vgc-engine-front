"use client";

import { motion } from "framer-motion";

export const YourTeamsTitle = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="flex flex-col"
    >
      <span className="text-2xl">Your teams</span>
      <span className="text-sm text-gray-500">
        Create and manage your teams here.
      </span>
    </motion.div>
  );
};
