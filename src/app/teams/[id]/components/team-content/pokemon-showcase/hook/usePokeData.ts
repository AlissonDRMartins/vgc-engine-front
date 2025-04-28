import { useTeamContext } from "@/app/teams/[id]/context/team-context";
import { PokeService } from "@/services/poke";
import { PokemonInfoApi } from "@/types/poke-api";
import { useEffect, useState } from "react";

export const usePokeData = () => {
  const [pokeData, setPokeData] = useState<PokemonInfoApi | null>(null);
  const { pokemonSelected } = useTeamContext();

  useEffect(() => {
    const fetchPokemonData = async () => {
      if (pokemonSelected) {
        const data = await PokeService.getPokemon(pokemonSelected.name);
        setPokeData(data);
      }
    };

    fetchPokemonData();
  }, [pokemonSelected]);

  return {
    pokeData,
    setPokeData,
  };
};
