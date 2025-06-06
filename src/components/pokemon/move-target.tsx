"use client";

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
import dynamic from "next/dynamic";
import { cn } from "@/lib/utils";

const MotionDiv = dynamic(
  () => import("framer-motion").then((mod) => mod.motion.div),
  { ssr: false }
);

export const PokemonMoveTarget = ({
  target,
  withAnimation = false,
  className,
}: {
  target: string;
  withAnimation?: boolean;
  className?: string | undefined;
}) => {
  return (
    <div className="flex items-center justify-center w-[38px] -mx-[2px]">
      <TooltipProvider key={target}>
        <Tooltip delayDuration={0}>
          <TooltipTrigger asChild>
            {withAnimation ? (
              <MotionDiv
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                whileHover={{ scale: 1.3 }}
              >
                <Image
                  src={moveTarget[target]}
                  alt={target}
                  className={cn("w-10 h-10 object-contain", className)}
                  width={192}
                  height={192}
                  loading="lazy"
                />
              </MotionDiv>
            ) : (
              <div>
                <Image
                  src={moveTarget[target]}
                  alt={target}
                  className={cn("w-10 h-10 object-contain", className)}
                  width={192}
                  height={192}
                  loading="lazy"
                />
              </div>
            )}
          </TooltipTrigger>
          <TooltipContent>
            <span className="capitalize">{formatApiName(target)}</span>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
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
