"use client";

import { PokeService } from "@/services/poke";
import { MovesDetail } from "@/types/pokemon";
import { useEffect, useRef, useState } from "react";
import { MoveDataTable } from "./data-table";
import { moveListColumns } from "./columns";

interface MoveListProps {
  moveList: string[];
  teamMoveLists: string[][];
  selectedPokemonIndex: number;
}

export const MoveList = ({
  moveList,
  teamMoveLists,
  selectedPokemonIndex,
}: MoveListProps) => {
  const [movesDetails, setMovesDetails] = useState<MovesDetail[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const movesCache = useRef<Map<string, MovesDetail>>(new Map());

  useEffect(() => {
    const fetchMoveDetail = async (moveName: string) => {
      if (movesCache.current.has(moveName))
        return movesCache.current.get(moveName)!;

      const moveResponse = await PokeService.getMove(moveName);
      const {
        accuracy,
        damage_class,
        effect_chance,
        effect_entries,
        id,
        name,
        power,
        pp,
        priority,
        target,
        type,
      } = moveResponse;

      const moveDetail: MovesDetail = {
        accuracy,
        damage_class: damage_class.name,
        effect_chance,
        effect_entries: effect_entries[0]?.effect || "",
        id,
        name,
        power,
        pp,
        priority,
        target: target.name,
        type: type.name,
      };

      movesCache.current.set(name, moveDetail);
      return moveDetail;
    };

    const loadSelectedPokemonMovesFirst = async () => {
      try {
        const allMovesCached = moveList.every((move) =>
          movesCache.current.has(move)
        );

        if (!allMovesCached) {
          setIsLoading(true);
        }

        const selectedMoves = await Promise.all(
          moveList.map((move) => fetchMoveDetail(move))
        );

        const sortedSelectedMoves = selectedMoves.sort((a, b) =>
          a.name.localeCompare(b.name)
        );
        setMovesDetails(sortedSelectedMoves);

        const otherMoves = teamMoveLists
          .flat()
          .filter((move) => !movesCache.current.has(move));

        await Promise.all(
          otherMoves.map(async (move) => {
            await fetchMoveDetail(move);
          })
        );
      } catch (error) {
        console.error("Failed to fetch moves:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadSelectedPokemonMovesFirst();
  }, [moveList, teamMoveLists, selectedPokemonIndex]);

  return (
    <div className="flex flex-col gap-2 p-2 w-full">
      {isLoading ? (
        <div className="flex flex-col gap-2 w-full">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="bg-stone-500/50 animate-pulse rounded-md w-full h-10"
            />
          ))}
        </div>
      ) : (
        <MoveDataTable columns={moveListColumns} data={movesDetails} />
      )}
    </div>
  );
};
