"use client";

import { motion } from "framer-motion";

import { PokemonInfo, Team } from "@/types/pokemon";
import { IconItem } from "./icon-item";
import { useEffect, useState } from "react";
import { PokemonTypeItem } from "./type";
import { PokemonBuilder } from "./pokemon-builder";

interface TeamListProps {
  team: Team;
  updateMember: (index: number, pokemon: PokemonInfo) => void;
}

export const TeamList = ({ team, updateMember }: TeamListProps) => {
  const [pokemonSelected, setPokemonSelected] = useState<PokemonInfo | null>(
    team.members[0] || null
  );

  useEffect(() => {
    setPokemonSelected(team.members[0] || null);
  }, [team.members]);

  return (
    <div className="grid grid-cols-4">
      <div className="col-span-4 md:col-span-1 flex flex-col gap-3 my-4">
        {team.members.map((pokemon, index) => {
          const isSelected = pokemon.name === pokemonSelected?.name;

          return (
            <motion.div
              key={index}
              layout
              initial={listItemMotion.initial}
              animate={listItemMotion.animate(index)}
              exit={listItemMotion.exit}
            >
              <motion.div
                {...hoverMotion}
                onClick={() => setPokemonSelected(pokemon)}
                className={`flex items-center cursor-pointer rounded-full shadow-lg bg-stone-300 hover:bg-stone-400 dark:bg-stone-600 dark:hover:bg-stone-700 ${
                  isSelected ? "bg-stone-400 dark:bg-stone-700 gap-4" : "gap-2"
                }`}
              >
                <IconItem pokemon={pokemon} pokemonSelected={pokemonSelected} />
                <PokemonInfoDisplay
                  pokemon={pokemon}
                  isSelected={pokemon.name === pokemonSelected?.name}
                />
              </motion.div>
            </motion.div>
          );
        })}
      </div>
      <div className="col-span-4 md:col-span-3 flex items-center justify-center p-4">
        <PokemonBuilder
          updateMember={updateMember}
          pokemonSelected={pokemonSelected}
        />
      </div>
    </div>
  );
};

const PokemonInfoDisplay = ({
  pokemon,
  isSelected,
}: {
  pokemon: PokemonInfo;
  isSelected: boolean;
}) => (
  <div
    className={`flex ${
      isSelected ? "flex-col" : "justify-between items-center flex-1 ml-2"
    }`}
  >
    <span className={`capitalize ${isSelected ? "text-xl" : "text-md"}`}>
      {pokemon.name}
    </span>
    <PokemonTypeItem pokemonType={pokemon.types} />
  </div>
);

const listItemMotion = {
  initial: { opacity: 0, y: 10 },
  animate: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.2 + 0.5 },
  }),
  exit: { opacity: 0, y: 10 },
};

const hoverMotion = {
  whileHover: { scale: 1.01 },
  transition: { type: "spring", stiffness: 300, damping: 30 },
};
