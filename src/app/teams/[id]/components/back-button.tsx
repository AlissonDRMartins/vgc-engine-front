"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export const BackButton = () => {
  const router = useRouter();

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
    >
      <Button
        className="mb-6 flex gap-2 items-center cursor-pointer"
        variant="outline"
        onClick={() => router.push("/teams")}
      >
        <ChevronLeft />
        <span>My teams</span>
      </Button>
    </motion.div>
  );
};
