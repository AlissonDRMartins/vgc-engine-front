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
  moves: string[];
  baseStats?: BaseStats;
  sprite?: string | null;
  indexTeam: number;
};

export type Team = {
  id: string;
  name: string;
  members: PokemonInfo[];
};
