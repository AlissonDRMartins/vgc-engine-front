export interface PokemonInfoApi {
  abilities: PokemonAbility[];
  base_experience: number;
  cries: { latest: string; legacy: string };
  forms: PokemonForms[];
  game_indices: PokemonGameIndex[];
  height: number;
  held_items: PokemonHeldItems[];
  id: number;
  is_default: boolean;
  location_area_encounters: string;
  moves: PokemonMoves[];
  name: string;
  order: number;
  past_abilities: {
    abilities: PokemonAbility[];
    generation: {
      name: string;
      url: string;
    };
  }[];
  past_types: [];
  species: {
    name: string;
    url: string;
  };
  sprites: PokemonSprites;
  stats: Stats[];
  types: PokemonTypes[];
}

export interface PokemonAbility {
  ability: {
    name: string;
    url: string;
  };
  is_hidden: boolean;
  slot: number;
}

export interface PokemonForms {
  name: string;
  url: string;
}

export interface PokemonGameIndex {
  game_index: number;
  version: {
    name: string;
    url: string;
  };
}

export interface PokemonHeldItems {
  item: {
    name: string;
    url: string;
  };
  version_details: {
    rarity: number;
    version: {
      name: string;
      url: string;
    };
  }[];
}

export interface PokemonMoves {
  move: {
    name: string;
    url: string;
  };
  version_group_details: {
    level_learned_at: number;
    move_learn_method: {
      name: string;
      url: string;
    };
    version_group: {
      name: string;
      url: string;
    };
  }[];
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

export interface Stats {
  base_stat: number;
  effort: number;
  stat: {
    name: string;
    url: string;
  };
}

export interface PokemonTypes {
  slot: number;
  type: {
    name: string;
    url: string;
  };
}
