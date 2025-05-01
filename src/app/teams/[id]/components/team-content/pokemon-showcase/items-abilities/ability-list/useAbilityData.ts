"use client";

import { useTeamContext } from "@/app/teams/[id]/context/team-context";
import { VgcEngineService } from "@/services/vgc-engine";
import { AbilityDetail } from "@/types/pokemon";
import { useEffect, useMemo, useState } from "react";
import { useBuilderContext } from "../../context/builder-context";

let cachedAbilities: AbilityDetail[] | null = null;

export const useAbilityData = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [data, setData] = useState<AbilityDetail[]>([]);
  const [error, setError] = useState<string | null>(null);
  const { pokemonSelected, team, updateMember } = useTeamContext();
  const { pokeData } = useBuilderContext();

  const selectedPokemonIndex = useMemo(() => {
    return team.members.findIndex(
      (member) => member.indexTeam === pokemonSelected?.indexTeam
    );
  }, [team.members, pokemonSelected?.indexTeam]);

  useEffect(() => {
    const fetchAbilities = async () => {
      if (cachedAbilities) {
        setData(cachedAbilities);
        return;
      }

      setIsLoading(true);
      try {
        const abilitiesToFetch =
          pokeData?.abilities.map((ability) => ability.ability.name) || [];
        const abilityList = await VgcEngineService.getAbilities({
          abilities: abilitiesToFetch,
        });
        const abilitiesWithHidden: AbilityDetail[] = abilityList.abilities.map(
          (detail) => {
            const match = pokeData?.abilities.find(
              (meta) => meta.ability.name === detail.name
            );
            return {
              ...detail,
              isHidden: match?.is_hidden ? "true" : undefined,
            };
          }
        );

        setData(abilitiesWithHidden);
        cachedAbilities = abilitiesWithHidden;
      } catch {
        setError("Failed to load ability data");
      } finally {
        setIsLoading(false);
      }
    };

    fetchAbilities();
  }, [pokeData?.abilities]);

  const handleAddAbility = (ability: AbilityDetail) => {
    const pokemonIndex = selectedPokemonIndex;
    if (pokemonIndex === -1) return;
    updateMember(pokemonIndex, (prevPokemon) => {
      const currentAbility = prevPokemon.ability;
      let newAbility = ability.name;
      if (currentAbility === ability.name) newAbility = "";

      return {
        ...prevPokemon,
        ability: newAbility,
      };
    });
  };

  return {
    isLoading,
    data,
    error,
    handleAddAbility,
  };
};
