"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image, { StaticImageData } from "next/image";
import status from "@/assets/images/status.png";
import special from "@/assets/images/special.png";
import physical from "@/assets/images/physical.png";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export const PokemonDamageClasses = ({ dc }: { dc: string }) => {
  return (
    <div className="flex items-center justify-center w-[36px]">
      <AnimatePresence mode="wait">
        <TooltipProvider key={dc}>
          <Tooltip delayDuration={0}>
            <TooltipTrigger asChild>
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
              >
                <Image
                  src={damageClass[dc]}
                  alt={dc}
                  className="w-10 h-10 object-contain"
                  width={192}
                  height={192}
                />
              </motion.div>
            </TooltipTrigger>
            <TooltipContent>
              <span className="capitalize">{dc}</span>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </AnimatePresence>
    </div>
  );
};

const damageClass: { [key: string]: StaticImageData } = {
  status,
  special,
  physical,
};
