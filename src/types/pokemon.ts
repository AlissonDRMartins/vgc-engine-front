export interface PokemonType {
  slot: number;
  type: {
    name: string;
    url: string;
  };
}

export interface PokemonAbility {
  ability: {
    name: string;
    url: string;
  };
  is_hidden: boolean;
  slot: number;
}

export interface PokemonStat {
  base_stat: number;
  effort: number;
  stat: {
    name: string;
    url: string;
  };
}

export interface SpriteImage {
  front_default: string | null;
  front_shiny?: string | null;
  front_female?: string | null;
  front_shiny_female?: string | null;
  back_default?: string | null;
  back_shiny?: string | null;
  back_female?: string | null;
  back_shiny_female?: string | null;
}

export interface PokemonOtherSprites {
  dream_world: SpriteImage;
  home: SpriteImage;
  "official-artwork": Omit<
    SpriteImage,
    "front_female" | "front_shiny_female" | "back_default" | "back_shiny"
  >;
  showdown: SpriteImage;
}

export interface VersionSprites {
  [version: string]:
    | Partial<SpriteImage>
    | { [variant: string]: Partial<SpriteImage> };
}

export interface PokemonSprites {
  front_default: string | null;
  front_shiny: string | null;
  front_female: string | null;
  front_shiny_female: string | null;
  back_default: string | null;
  back_shiny: string | null;
  back_female: string | null;
  back_shiny_female: string | null;
  other: PokemonOtherSprites;
  versions: {
    [generation: string]: VersionSprites;
  };
}

export interface PokemonMove {
  move: {
    name: string;
    url: string;
  };
}

export interface PokemonType {
  id: number;
  name: string;
  height: number;
  weight: number;
  base_experience: number;
  types: PokemonType[];
  abilities: PokemonAbility[];
  stats: PokemonStat[];
  sprites: PokemonSprites;
  moves: PokemonMove[];
}

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
};

export type Team = {
  id: string;
  name: string;
  members: PokemonInfo[];
};
