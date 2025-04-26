"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image, { StaticImageData } from "next/image";
import bug from "@/assets/images/bug.png";
import dark from "@/assets/images/dark.png";
import dragon from "@/assets/images/dragon.png";
import electric from "@/assets/images/electric.png";
import fairy from "@/assets/images/fairy.png";
import fighting from "@/assets/images/fighting.png";
import fire from "@/assets/images/fire.png";
import flying from "@/assets/images/flying.png";
import ghost from "@/assets/images/ghost.png";
import grass from "@/assets/images/grass.png";
import ground from "@/assets/images/ground.png";
import ice from "@/assets/images/ice.png";
import normal from "@/assets/images/normal.png";
import poison from "@/assets/images/poison.png";
import psychic from "@/assets/images/psychic.png";
import rock from "@/assets/images/rock.png";
import steel from "@/assets/images/steel.png";
import stellar from "@/assets/images/stellar.png";
import water from "@/assets/images/water.png";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export const PokemonTypeItem = ({
  pokemonType,
  arceusIcon,
}: {
  pokemonType: string[];
  arceusIcon?: boolean;
}) => {
  const url = (type: number) => {
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/types/generation-viii/sword-shield/${type}.png`;
  };

  return (
    <div className={`flex items-center ${arceusIcon ? "w-full" : ""}`}>
      <AnimatePresence mode="wait">
        {pokemonType.map((type) => {
          return (
            <TooltipProvider key={type}>
              <Tooltip delayDuration={0}>
                <TooltipTrigger asChild>
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    whileHover={{ scale: arceusIcon ? 1.1 : 1.3 }}
                    key={type}
                  >
                    <Image
                      src={
                        arceusIcon
                          ? url(typeIndex[type.toLowerCase()])
                          : typeIcons[type.toLowerCase()]
                      }
                      alt="Pokemon Type"
                      className={
                        arceusIcon
                          ? "max-h-10 rounded-sm"
                          : "w-8 h-8 object-contain"
                      }
                      width={100}
                      height={100}
                    />
                  </motion.div>
                </TooltipTrigger>
                <TooltipContent>
                  <span className="capitalize">{type}</span>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          );
        })}
      </AnimatePresence>
    </div>
  );
};

const typeIcons: { [key: string]: StaticImageData } = {
  bug,
  dark,
  dragon,
  electric,
  fairy,
  fighting,
  fire,
  flying,
  ghost,
  grass,
  ground,
  ice,
  normal,
  poison,
  psychic,
  rock,
  steel,
  stellar,
  water,
};

const typeIndex: { [key: string]: number } = {
  normal: 1,
  fighting: 2,
  flying: 3,
  poison: 4,
  ground: 5,
  rock: 6,
  bug: 7,
  ghost: 8,
  steel: 9,
  fire: 10,
  water: 11,
  grass: 12,
  electric: 13,
  psychic: 14,
  ice: 15,
  dragon: 16,
  dark: 17,
  fairy: 18,
  stellar: 19,
  unknown: 10001,
};
