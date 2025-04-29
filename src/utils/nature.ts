import { BaseStats, PokemonNatureEnum } from "@/types/pokemon";

export const natureModifiers: Record<
  string,
  { up?: keyof BaseStats; down?: keyof BaseStats }
> = {
  lonely: { up: "atk", down: "def" },
  adamant: { up: "atk", down: "spatk" },
  naughty: { up: "atk", down: "spdef" },
  brave: { up: "atk", down: "speed" },
  bold: { up: "def", down: "atk" },
  impish: { up: "def", down: "spatk" },
  lax: { up: "def", down: "spdef" },
  relaxed: { up: "def", down: "speed" },
  modest: { up: "spatk", down: "atk" },
  mild: { up: "spatk", down: "def" },
  rash: { up: "spatk", down: "spdef" },
  quiet: { up: "spatk", down: "speed" },
  calm: { up: "spdef", down: "atk" },
  gentle: { up: "spdef", down: "def" },
  careful: { up: "spdef", down: "spatk" },
  sassy: { up: "spdef", down: "speed" },
  timid: { up: "speed", down: "atk" },
  hasty: { up: "speed", down: "def" },
  jolly: { up: "speed", down: "spatk" },
  naive: { up: "speed", down: "spdef" },
  hardy: {},
  docile: {},
  bashful: {},
  quirky: {},
  serious: {},
};

export const natureMatrix = [
  ["atk", ["hardy", "bold", "modest", "calm", "timid"]],
  ["def", ["lonely", "docile", "mild", "gentle", "hasty"]],
  ["spatk", ["adamant", "impish", "bashful", "careful", "jolly"]],
  ["spdef", ["naughty", "lax", "rash", "quirky", "naive"]],
  ["speed", ["brave", "relaxed", "quiet", "sassy", "serious"]],
] as const;

export type NatureStat = (typeof natureMatrix)[number][0];
export type NatureName =
  (typeof PokemonNatureEnum)[keyof typeof PokemonNatureEnum];
