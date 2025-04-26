"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image, { StaticImageData } from "next/image";
import allAllies from "@/assets/images/all-allies.png";
import allOpponents from "@/assets/images/all-opponents.png";
import allOtherPokemon from "@/assets/images/all-other-pokemon.png";
import allPokemon from "@/assets/images/all-pokemon.png";
import ally from "@/assets/images/ally.png";
import entireField from "@/assets/images/entire-field.png";
import faintingPokemon from "@/assets/images/fainting-pokemon.png";
import opponentsField from "@/assets/images/opponents-field.png";
import randomOpponent from "@/assets/images/random-opponent.png";
import selectedPokemon from "@/assets/images/selected-pokemon.png";
import specificMove from "@/assets/images/specific-move.png";
import user from "@/assets/images/user.png";
import userAndAllies from "@/assets/images/user-and-allies.png";
import usersField from "@/assets/images/users-field.png";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { formatApiName } from "@/utils/format";

export const PokemonMoveTarget = ({ target }: { target: string }) => {
  return (
    <div className="flex items-center justify-center w-[38px] -mx-[2px]">
      <AnimatePresence mode="wait">
        <TooltipProvider key={target}>
          <Tooltip delayDuration={0}>
            <TooltipTrigger asChild>
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                whileHover={{ scale: 1.3 }}
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
  "all-allies": allAllies,
  "all-opponents": allOpponents,
  "all-other-pokemon": allOtherPokemon,
  "all-pokemon": allPokemon,
  ally: ally,
  "entire-field": entireField,
  "fainting-pokemon": faintingPokemon,
  "opponents-field": opponentsField,
  "random-opponent": randomOpponent,
  "selected-pokemon": selectedPokemon,
  "selected-pokemon-me-first": selectedPokemon,
  "specific-move": specificMove,
  user,
  "user-and-allies": userAndAllies,
  "user-or-ally": userAndAllies,
  "users-field": usersField,
};
