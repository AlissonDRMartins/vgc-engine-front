"use client";

import { useEffect, useState } from "react";
import { AddPokemon } from "./add-pokemon";
import { useTeamContext } from "../../../context/team-context";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import {
  getSelectedPokemonIndex,
  saveSelectedPokemonIndex,
} from "./helper/pokemon-selected";
import { TeamItem } from "./team-item";
import { Trash2 } from "lucide-react";
import { formatApiName } from "@/utils/format";
import { Skeleton } from "@/components/ui/skeleton";

export const TeamList = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { team, removeMember, getMember, pokemonSelected, setPokemonSelected } =
    useTeamContext();

  useEffect(() => {
    const cachedIndex = getSelectedPokemonIndex(team.id);
    const pokemon =
      cachedIndex !== null && team.members[cachedIndex]
        ? team.members[cachedIndex]
        : team.members[0] || null;
    setPokemonSelected(pokemon);
  }, [team, setPokemonSelected]);

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
    <div className="w-full md:w-[50%] lg:w-[30%] flex flex-col gap-2">
      <AddPokemon isLoading={isLoading} setIsLoading={setIsLoading} />
      <div className="flex flex-col gap-3 my-4">
        {team.members.map((pokemon, index) => (
          <ContextMenu key={index}>
            <ContextMenuTrigger asChild>
              <div>
                <TeamItem
                  team={team}
                  index={index}
                  pokemon={pokemon}
                  pokemonSelected={pokemonSelected}
                  setPokemonSelected={setPokemonSelected}
                />
              </div>
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
        ))}

        {isLoading && <Skeleton className="rounded-full w-full h-10" />}
      </div>
    </div>
  );
};
