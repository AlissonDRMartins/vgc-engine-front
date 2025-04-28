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
  baseStats?: BaseStats;
  sprite?: string | null;
  indexTeam: number;
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
