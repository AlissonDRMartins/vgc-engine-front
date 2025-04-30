"use client";

import { useTeamContext } from "@/app/teams/[id]/context/team-context";
import { VgcEngineService } from "@/services/vgc-engine";
import { ItemDetail } from "@/types/pokemon";
import { useEffect, useMemo, useState } from "react";

let cachedItems: ItemDetail[] | null = null;

export const useItemData = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [data, setData] = useState<ItemDetail[]>([]);
  const [error, setError] = useState<string | null>(null);
  const { pokemonSelected, team, updateMember } = useTeamContext();

  const selectedPokemonIndex = useMemo(() => {
    return team.members.findIndex(
      (member) => member.indexTeam === pokemonSelected?.indexTeam
    );
  }, [team.members, pokemonSelected?.indexTeam]);

  useEffect(() => {
    const fetchItems = async () => {
      if (cachedItems) {
        setData(cachedItems);
        return;
      }

      setIsLoading(true);
      try {
        const itemList = await VgcEngineService.getAllItems();
        setData(itemList.items);
        cachedItems = itemList.items;
      } catch {
        setError("Failed to load item data");
      } finally {
        setIsLoading(false);
      }
    };

    fetchItems();
  }, []);

  const handleAddItem = (item: ItemDetail) => {
    const pokemonIndex = selectedPokemonIndex;
    if (pokemonIndex === -1) return;
    updateMember(pokemonIndex, (prevPokemon) => {
      const currentItem = prevPokemon.item;
      let newItem = item.name;
      if (currentItem === item.name) newItem = "";

      return {
        ...prevPokemon,
        item: newItem,
      };
    });
  };

  return {
    isLoading,
    data,
    error,
    handleAddItem,
  };
};
