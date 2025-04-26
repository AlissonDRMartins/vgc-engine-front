export interface PokemonInfoApi {
  abilities: PokemonAbility[];
  base_experience: number;
  cries: { latest: string; legacy: string };
  forms: nameUrl[];
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
    generation: nameUrl;
  }[];
  past_types: [];
  species: nameUrl;
  sprites: PokemonSprites;
  stats: Stats[];
  types: PokemonTypes[];
}

export interface PokemonAbility {
  ability: nameUrl;
  is_hidden: boolean;
  slot: number;
}

export interface PokemonGameIndex {
  game_index: number;
  version: nameUrl;
}

export interface PokemonHeldItems {
  item: nameUrl;
  version_details: {
    rarity: number;
    version: nameUrl;
  }[];
}

export interface PokemonMoves {
  move: nameUrl;
  version_group_details: {
    level_learned_at: number;
    move_learn_method: nameUrl;
    version_group: nameUrl;
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
  stat: nameUrl;
}

export interface PokemonTypes {
  slot: number;
  type: nameUrl;
}

export interface MoveApiResponse {
  accuracy: number;
  contest_combos: ContestCombos;
  contest_effect: { url: string };
  contest_type: nameUrl;
  damage_class: nameUrl;
  effect_chance: number;
  effect_change: [];
  effect_entries: {
    effect: string;
    language: nameUrl;
    short_effect: string;
  }[];
  flavor_text_entries: {
    flavor_text: string;
    language: nameUrl;
    version_group: nameUrl;
  }[];
  generation: nameUrl;
  id: number;
  learned_by_pokemon: nameUrl[];
  machines: {
    machine: { url: string };
    version_group: nameUrl;
  }[];
  meta: {
    ailment: nameUrl;
    ailment_chance: number;
    category: nameUrl;
    crit_rate: number;
    drain: number;
    flinch_chance: number;
    healing: number;
    max_hits: number | null;
    max_turns: number | null;
    min_hits: number | null;
    min_turns: number | null;
    stat_chance: number;
  };
  name: string;
  names: {
    language: nameUrl;
    name: string;
  }[];
  past_values: [];
  power: number;
  pp: number;
  priority: number;
  stat_change: [];
  super_contest_effect: { url: string };
  target: nameUrl;
  type: nameUrl;
}

export interface ContestCombos {
  normal: {
    use_after: nameUrl[] | null;
    use_before: nameUrl[] | null;
  };
  super: {
    use_after: nameUrl[] | null;
    use_before: nameUrl[] | null;
  };
}

export interface nameUrl {
  name: string;
  url: string;
}
