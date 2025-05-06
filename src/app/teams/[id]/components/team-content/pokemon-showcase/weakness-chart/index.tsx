"use client";

import { useTeamContext } from "@/app/teams/[id]/context/team-context";
import { analyzePokemon } from "@/utils/type-analysis";
import { EffectiveMoves } from "./effective-moves";

export const WeaknessChart = () => {
  const { pokemonSelected } = useTeamContext();
  const filteredMoves =
    pokemonSelected?.moves.filter((move) => move.power > 0) || [];
  const analyzedTypes = analyzePokemon({
    pokemonTypes: pokemonSelected?.types || [],
    moves:
      filteredMoves.map((move) => ({
        name: move.name,
        type: move.type,
        power: move.power,
      })) || [],
    item: {
      name: pokemonSelected?.item || "",
    },
  });

  return (
    <div className="bg-stone-200 dark:bg-stone-900 p-2 gap-3 rounded-md lg:mt-6 m-2 flex flex-col lg:flex-row">
      <EffectiveMoves analyzedTypes={analyzedTypes} />
    </div>
  );
};
