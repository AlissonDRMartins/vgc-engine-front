import { apiPoke } from "@/lib/ky";
import { PokemonAbility, PokemonType } from "@/types/pokemon";

export const PokeService = {
  getPokemonList: async (offset: number, limit: number) => {
    const response = await apiPoke(`pokemon?offset=${offset}&limit=${limit}`);
    if (!response.ok) {
      throw new Error("Failed to fetch Pokemon list");
    }
    return response.json<{
      count: number;
      next: string | null;
      previous: string | null;
      results: { name: string; url: string }[];
    }>();
  },

  getPokemon: async (name: string) => {
    const response = await apiPoke(`pokemon/${name.toLowerCase()}`);
    if (!response.ok) {
      throw new Error("Failed to fetch Pokemon data");
    }
    return response.json<PokemonType>();
  },

  getAbility: async (name: string) => {
    const response = await apiPoke(`/ability/${name.toLowerCase()}`);
    if (!response.ok) {
      throw new Error("Failed to fetch Ability data");
    }
    return response.json<PokemonAbility>();
  },
};
