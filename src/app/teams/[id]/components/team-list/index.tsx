"use client";

import { motion } from "framer-motion";

import { PokemonInfo, Team } from "@/types/pokemon";
import { IconItem } from "./icon-item";
import { useEffect, useState } from "react";
import { PokemonTypeItem } from "../../../../../components/pokemon/type";
import { PokemonBuilder } from "./pokemon-builder";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { Trash2 } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { formatApiName } from "@/utils/format";
import { getSelectedPokemonIndex, saveSelectedPokemonIndex } from "./helpers";

interface TeamListProps {
  team: Team;
  updateMember: (
    index: number,
    updater: (prev: PokemonInfo) => PokemonInfo
  ) => void;
  removeMember: (index: number) => void;
  getMember: (index: number) => PokemonInfo | undefined;
  isLoading?: boolean;
}

export const TeamList = ({
  team,
  updateMember,
  removeMember,
  getMember,
  isLoading,
}: TeamListProps) => {
  const [pokemonSelected, setPokemonSelected] = useState<PokemonInfo | null>(
    null
  );

  useEffect(() => {
    const cachedIndex = getSelectedPokemonIndex(team.id);
    const pokemon =
      cachedIndex !== null && team.members[cachedIndex]
        ? team.members[cachedIndex]
        : team.members[0] || null;
    setPokemonSelected(pokemon);
  }, [team]);

  const handleDeletePokemon = (index: number) => {
    removeMember(index);

    const firstPokemon = getMember(0);
    if (firstPokemon) {
      setPokemonSelected(firstPokemon);
      saveSelectedPokemonIndex(team.id, 0);
    } else {
      setPokemonSelected(null);
      saveSelectedPokemonIndex(team.id, -1);
    }
  };

  return (
    <div className="grid grid-cols-4">
      <div className="col-span-4 md:col-span-1 flex flex-col gap-3 my-4">
        {team.members.map((pokemon, index) => {
          const isSelected = pokemon.name === pokemonSelected?.name;

          return (
            <ContextMenu key={index}>
              <ContextMenuTrigger asChild>
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
                      isSelected
                        ? "bg-stone-400 dark:bg-stone-700 gap-4"
                        : "gap-2"
                    }`}
                  >
                    <IconItem
                      pokemon={pokemon}
                      pokemonSelected={pokemonSelected}
                    />
                    <PokemonInfoDisplay
                      pokemon={pokemon}
                      isSelected={pokemon.name === pokemonSelected?.name}
                    />
                  </motion.div>
                </motion.div>
              </ContextMenuTrigger>
              <ContextMenuContent className="w-64">
                <ContextMenuItem
                  className="hover:!bg-red-500 hover:!text-white group"
                  onSelect={() => handleDeletePokemon(index)}
                >
                  <Trash2 className="text-black dark:text-white group-hover:text-white" />
                  <span>Delete {formatApiName(pokemon.name)}</span>
                </ContextMenuItem>
              </ContextMenuContent>
            </ContextMenu>
          );
        })}
        {isLoading && <Skeleton className="rounded-full w-full h-10" />}
      </div>
      <div className="col-span-4 md:col-span-3 flex items-center justify-center py-4 md:p-4">
        <PokemonBuilder
          team={team}
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
