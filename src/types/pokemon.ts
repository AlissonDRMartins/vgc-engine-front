export type BaseStats = {
  hp: number;
  atk: number;
  def: number;
  spatk: number;
  spdef: number;
  speed: number;
};

export type PokemonInfo = {
  name: string;
  form?: string;
  types: string[];
  ability: string;
  item?: string;
  teraType?: string;
  moves: {
    name: string;
    power: number;
    type: string;
  }[];
  baseStats: BaseStats;
  ivs: BaseStats;
  evs: BaseStats;
  nature: PokemonNatureEnum;
  sprite?: string | null;
  indexTeam: number;
  lvl: number;
};

export type Team = {
  id: string;
  name: string;
  members: PokemonInfo[];
};

export type MovesDetail = {
  accuracy: number;
  damage_class: string;
  effect_chance: number;
  effect: string;
  id: number;
  name: string;
  power: number;
  pp: number;
  priority: number;
  target: string;
  type: string;
};

export enum PokemonNatureEnum {
  hardy = "hardy",
  lonely = "lonely",
  brave = "brave",
  adamant = "adamant",
  naughty = "naughty",
  bold = "bold",
  docile = "docile",
  relaxed = "relaxed",
  impish = "impish",
  lax = "lax",
  timid = "timid",
  hasty = "hasty",
  serious = "serious",
  jolly = "jolly",
  naive = "naive",
  modest = "modest",
  mild = "mild",
  quiet = "quiet",
  bashful = "bashful",
  rash = "rash",
  calm = "calm",
  gentle = "gentle",
  sassy = "sassy",
  careful = "careful",
  quirky = "quirky",
}

export interface ItemDetail {
  name: string;
  effect: string;
  category: string;
}

export interface AbilityDetail {
  name: string;
  effect: string;
  isHidden?: string;
}
