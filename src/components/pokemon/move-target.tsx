"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image, { StaticImageData } from "next/image";
import allOpponents from "@/assets/images/all-opponents.png";
import selectedPokemon from "@/assets/images/selected-pokemon.png";
import specificMove from "@/assets/images/specific-move.png";
import user from "@/assets/images/user.png";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { formatApiName } from "@/utils/format";

export const PokemonMoveTarget = ({ target }: { target: string }) => {
  return (
    <div className="flex items-center justify-center w-[38px] -mx-1">
      <AnimatePresence mode="wait">
        <TooltipProvider key={target}>
          <Tooltip delayDuration={0}>
            <TooltipTrigger asChild>
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
              >
                <Image
                  src={moveTarget[target]}
                  alt={target}
                  className="w-10 h-10 object-contain"
                  width={192}
                  height={192}
                />
              </motion.div>
            </TooltipTrigger>
            <TooltipContent>
              <span className="capitalize">{formatApiName(target)}</span>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </AnimatePresence>
    </div>
  );
};

const moveTarget: { [key: string]: StaticImageData } = {
  "all-opponents": allOpponents,
  "selected-pokemon": selectedPokemon,
  "specific-move": specificMove,
  user,
};
