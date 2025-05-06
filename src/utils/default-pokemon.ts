import { PokemonInfoApi } from "@/types/poke-api";
import { PokemonInfo, PokemonNatureEnum, Team } from "@/types/pokemon";

interface DefaultPokemonProps {
  pokeInfo: PokemonInfoApi;
  team: Team;
}

export const DefaultPokemon = ({
  pokeInfo,
  team,
}: DefaultPokemonProps): PokemonInfo => {
  return {
    name: pokeInfo.name,
    types: pokeInfo.types.map((type) => type.type.name),
    ability: "",
    moves: [],
    sprite: pokeInfo.sprites.other["official-artwork"].front_default,
    indexTeam: team.members.length,
    baseStats: {
      hp:
        pokeInfo.stats.find((status) => status.stat.name === "hp")?.base_stat ||
        0,
      atk:
        pokeInfo.stats.find((status) => status.stat.name === "attack")
          ?.base_stat || 0,
      def:
        pokeInfo.stats.find((status) => status.stat.name === "defense")
          ?.base_stat || 0,
      spatk:
        pokeInfo.stats.find((status) => status.stat.name === "special-attack")
          ?.base_stat || 0,
      spdef:
        pokeInfo.stats.find((status) => status.stat.name === "special-defense")
          ?.base_stat || 0,
      speed:
        pokeInfo.stats.find((status) => status.stat.name === "speed")
          ?.base_stat || 0,
    },
    ivs: {
      hp: 31,
      atk: 31,
      def: 31,
      spatk: 31,
      spdef: 31,
      speed: 31,
    },
    evs: {
      hp: 0,
      atk: 0,
      def: 0,
      spatk: 0,
      spdef: 0,
      speed: 0,
    },
    nature: PokemonNatureEnum.hardy,
    lvl: 50,
    item: "",
  };
};
