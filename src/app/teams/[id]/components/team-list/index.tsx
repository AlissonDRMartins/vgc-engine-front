"use client";

import { motion } from "framer-motion";

import { PokemonInfo, Team } from "@/types/pokemon";
import { IconItem } from "./icon-item";
import { useEffect, useState } from "react";
import { PokemonTypeItem } from "./type";

export const TeamList = ({ team }: { team: Team }) => {
  const [pokemonSelected, setPokemonSelected] = useState<PokemonInfo | null>(
    team.members[0] || null
  );

  useEffect(() => {
    setPokemonSelected(team.members[0] || null);
  }, [team.members]);

  return (
    <div className="grid grid-cols-4">
      <div className="flex flex-col gap-3 my-4">
        {team.members.map((pokemon, index) => (
          <motion.div
            key={index}
            layout
            initial={{ opacity: 0, y: 10 }}
            animate={{
              opacity: 1,
              y: 0,
              transition: { delay: index * 0.2 + 0.5 },
            }}
            exit={{ opacity: 0, y: 10 }}
          >
            <motion.div
              layout
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 30,
              }}
              whileHover={{ scale: 1.01 }}
              className={`flex items-center cursor-pointer rounded-full bg-stone-300 hover:bg-stone-400 dark:bg-stone-600 dark:hover:bg-stone-700 ${
                pokemon.name === pokemonSelected?.name
                  ? "bg-stone-400 dark:bg-stone-700 gap-4"
                  : "gap-2"
              }`}
              onClick={() => setPokemonSelected(pokemon)}
            >
              <IconItem pokemon={pokemon} pokemonSelected={pokemonSelected} />
              <div
                className={`flex ${
                  pokemon.name === pokemonSelected?.name
                    ? "flex-col"
                    : "justify-between w-[calc(100%-60px)]"
                }`}
              >
                <span
                  className={`capitalize ${
                    pokemon.name === pokemonSelected?.name
                      ? "text-xl"
                      : "text-md"
                  }`}
                >
                  {pokemon.name}
                </span>
                <PokemonTypeItem pokemonType={pokemon.types} />
              </div>
            </motion.div>
          </motion.div>
        ))}
      </div>
      <div className="col-span-3 flex items-center justify-center"></div>
    </div>
  );
};
