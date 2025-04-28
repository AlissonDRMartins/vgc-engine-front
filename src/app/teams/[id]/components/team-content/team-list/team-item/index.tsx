"use client";

import { PokemonInfo, Team } from "@/types/pokemon";
import { Dispatch, SetStateAction } from "react";
import { motion } from "framer-motion";
import { saveSelectedPokemonIndex } from "../helper/pokemon-selected";
import { PokemonIconFrame } from "./pokemon-icon-frame";
import { PokemonInfoDisplay } from "./pokemon-info-display";

interface TeamItemProps {
  team: Team;
  index: number;
  pokemon: PokemonInfo;
  pokemonSelected: PokemonInfo | null;
  setPokemonSelected: Dispatch<SetStateAction<PokemonInfo | null>>;
}

export const TeamItem = ({
  team,
  index,
  pokemon,
  pokemonSelected,
  setPokemonSelected,
}: TeamItemProps) => {
  const isSelected = pokemon.name === pokemonSelected?.name;

  return (
    <motion.div
      layout
      initial={listItemMotion.initial}
      animate={listItemMotion.animate(index)}
      exit={listItemMotion.exit}
    >
      <motion.div
        {...hoverMotion}
        onClick={() => {
          setPokemonSelected(pokemon);
          saveSelectedPokemonIndex(team.id, index);
        }}
        className={`flex items-center cursor-pointer rounded-full shadow-lg bg-stone-300 hover:bg-stone-400 dark:bg-stone-600 dark:hover:bg-stone-700 ${
          isSelected ? "bg-stone-400 dark:bg-stone-700 gap-4" : "gap-2"
        }`}
      >
        <PokemonIconFrame pokemon={pokemon} pokemonSelected={pokemonSelected} />
        <PokemonInfoDisplay
          pokemon={pokemon}
          isSelected={pokemon.name === pokemonSelected?.name}
        />
      </motion.div>
    </motion.div>
  );
};

const hoverMotion = {
  whileHover: { scale: 1.01 },
  transition: { type: "spring", stiffness: 300, damping: 30 },
};

const listItemMotion = {
  initial: { opacity: 0, y: 10 },
  animate: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.2 + 0.5 },
  }),
  exit: { opacity: 0, y: 10 },
};
