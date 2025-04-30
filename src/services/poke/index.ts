import { apiPoke } from "@/lib/ky";
import {
  AllItemsApiResponse,
  ItemApiResponse,
  MoveApiResponse,
  PokemonAbility,
  PokemonInfoApi,
} from "@/types/poke-api";

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
    return response.json<PokemonInfoApi>();
  },

  getAbility: async (name: string) => {
    const response = await apiPoke(`ability/${name.toLowerCase()}`);
    if (!response.ok) {
      throw new Error("Failed to fetch Ability data");
    }
    return response.json<PokemonAbility>();
  },

  getMove: async (name: string) => {
    const response = await apiPoke(`move/${name.toLowerCase()}`);
    if (!response.ok) throw new Error("Failed to fetch Move data");
    return response.json<MoveApiResponse>();
  },

  getItemList: async () => {
    const response = await apiPoke(`item?limit=2180`);
    if (!response.ok) throw new Error("Failed to fetch Item list");
    return response.json<AllItemsApiResponse>();
  },

  getItem: async (name: string) => {
    const response = await apiPoke(`item/${name.toLowerCase()}`);
    if (!response.ok) throw new Error("Failed to fetch Item data");
    return response.json<ItemApiResponse>();
  },
};
