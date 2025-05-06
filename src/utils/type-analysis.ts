type TypeEffectiveness = {
  [attackingType: string]: {
    [defendingType: string]: number;
  };
};

const TYPE_CHART: TypeEffectiveness = {
  normal: { rock: 0.5, ghost: 0, steel: 0.5 },
  fire: {
    fire: 0.5,
    water: 0.5,
    grass: 2,
    ice: 2,
    bug: 2,
    rock: 0.5,
    dragon: 0.5,
    steel: 2,
  },
  water: {
    fire: 2,
    water: 0.5,
    grass: 0.5,
    ground: 2,
    rock: 2,
    dragon: 0.5,
  },
  electric: {
    water: 2,
    electric: 0.5,
    grass: 0.5,
    ground: 0,
    flying: 2,
    dragon: 0.5,
  },
  grass: {
    fire: 0.5,
    water: 2,
    grass: 0.5,
    poison: 0.5,
    ground: 2,
    flying: 0.5,
    bug: 0.5,
    rock: 2,
    dragon: 0.5,
    steel: 0.5,
  },
  ice: {
    fire: 0.5,
    water: 0.5,
    grass: 2,
    ice: 0.5,
    ground: 2,
    flying: 2,
    dragon: 2,
    steel: 0.5,
  },
  fighting: {
    normal: 2,
    ice: 2,
    poison: 0.5,
    flying: 0.5,
    psychic: 0.5,
    bug: 0.5,
    rock: 2,
    ghost: 0,
    dark: 2,
    steel: 2,
    fairy: 0.5,
  },
  poison: {
    grass: 2,
    poison: 0.5,
    ground: 0.5,
    rock: 0.5,
    ghost: 0.5,
    steel: 0,
    fairy: 2,
  },
  ground: {
    fire: 2,
    electric: 2,
    grass: 0.5,
    poison: 2,
    flying: 0,
    bug: 0.5,
    rock: 2,
    steel: 2,
  },
  flying: {
    electric: 0.5,
    grass: 2,
    fighting: 2,
    bug: 2,
    rock: 0.5,
    steel: 0.5,
  },
  psychic: {
    fighting: 2,
    poison: 2,
    psychic: 0.5,
    dark: 0,
    steel: 0.5,
  },
  bug: {
    fire: 0.5,
    grass: 2,
    fighting: 0.5,
    poison: 0.5,
    flying: 0.5,
    psychic: 2,
    ghost: 0.5,
    dark: 2,
    steel: 0.5,
    fairy: 0.5,
  },
  rock: {
    fire: 2,
    ice: 2,
    fighting: 0.5,
    ground: 0.5,
    flying: 2,
    bug: 2,
    steel: 0.5,
  },
  ghost: {
    normal: 0,
    psychic: 2,
    ghost: 2,
    dark: 0.5,
  },
  dragon: {
    dragon: 2,
    steel: 0.5,
    fairy: 0,
  },
  dark: {
    fighting: 0.5,
    psychic: 2,
    ghost: 2,
    dark: 0.5,
    fairy: 0.5,
  },
  steel: {
    fire: 0.5,
    water: 0.5,
    electric: 0.5,
    ice: 2,
    rock: 2,
    fairy: 2,
    steel: 0.5,
  },
  fairy: {
    fire: 0.5,
    fighting: 2,
    poison: 0.5,
    dragon: 2,
    dark: 2,
    steel: 0.5,
  },
};

type PokemonType = keyof typeof TYPE_CHART;
export type MoveType = { name: string; type: PokemonType; power: number };

export interface MoveAnalysis extends MoveType {
  effectiveAgainst: {
    type: PokemonType;
    value: number;
  }[];
}

type Item = { name: string; effect?: string };

export interface TypeEffectEntry {
  type: PokemonType;
  value: number;
}

export interface PokemonTypeAnalysis {
  types: {
    weakTo: TypeEffectEntry[];
    resistantTo: TypeEffectEntry[];
    immuneTo: TypeEffectEntry[];
    effectiveAgainst: TypeEffectEntry[];
  };
  moves: MoveAnalysis[];
  item: {
    immuneTo: PokemonType[];
    neutralizedWeaknesses: PokemonType[];
  };
}

interface analyzePokemonProps {
  pokemonTypes: PokemonType[];
  moves: MoveType[];
  item?: Item;
}

export function analyzePokemon({
  pokemonTypes,
  moves = [],
  item = { name: "" },
}: analyzePokemonProps): PokemonTypeAnalysis {
  const result: PokemonTypeAnalysis = {
    types: {
      weakTo: [],
      resistantTo: [],
      immuneTo: [],
      effectiveAgainst: [],
    },
    moves: [],
    item: {
      immuneTo: [],
      neutralizedWeaknesses: [],
    },
  };

  const allTypes = Object.keys(TYPE_CHART) as PokemonType[];

  // Defensive Analysis
  for (const attackType of allTypes) {
    let multiplier = 1;
    for (const defType of pokemonTypes) {
      const typeChart = TYPE_CHART[attackType];
      multiplier *= typeChart?.[defType] ?? 1;
    }

    const entry: TypeEffectEntry = { type: attackType, value: multiplier };

    if (multiplier > 1) result.types.weakTo.push(entry);
    else if (multiplier === 0) result.types.immuneTo.push(entry);
    else if (multiplier < 1) result.types.resistantTo.push(entry);
  }

  // Offensive Analysis
  for (const defType of allTypes) {
    let multiplier = 1;
    for (const atkType of pokemonTypes) {
      multiplier *= TYPE_CHART[atkType]?.[defType] ?? 1;
    }

    if (multiplier > 1) {
      result.types.effectiveAgainst.push({
        type: defType,
        value: multiplier,
      });
    }
  }

  // Moves Analysis
  result.moves = moves.map((move) => {
    const effectiveAgainst: { type: PokemonType; value: number }[] = [];

    const effectiveness = TYPE_CHART[move.type];
    if (effectiveness) {
      for (const [defType, mult] of Object.entries(effectiveness)) {
        if (mult >= 2) {
          effectiveAgainst.push({
            type: defType as PokemonType,
            value: mult,
          });
        }
      }
    }

    return {
      ...move,
      effectiveAgainst,
    };
  });

  // Item effects
  if (item.effect) {
    const effect = item.effect.toLowerCase();

    for (const type of allTypes) {
      if (effect.includes(`immunity to ${type}`)) {
        result.item.immuneTo.push(type);
      } else if (
        effect.includes(`negates ${type} weakness`) &&
        result.types.weakTo.some((entry) => entry.type === type)
      ) {
        result.item.neutralizedWeaknesses.push(type);
      }
    }
  }

  return result;
}
