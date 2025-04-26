"use client";

import { PokeService } from "@/services/poke";
import { MovesDetail } from "@/types/pokemon";
import { useEffect, useState } from "react";
import { MoveDataTable } from "./data-table";
import { moveListColumns } from "./columns";

interface MoveListProps {
  moveList: string[];
}

export const MoveList = ({ moveList }: MoveListProps) => {
  const [movesDetails, setMovesDetails] = useState<MovesDetail[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchMoves = async () => {
      try {
        setIsLoading(true);
        const moves = await Promise.all(
          moveList.map(async (move) => {
            const moveResponse = await PokeService.getMove(move);
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

            return {
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
            } as MovesDetail;
          })
        );

        const sortedMoves = moves.sort((a, b) => a.name.localeCompare(b.name));
        setMovesDetails(sortedMoves);
      } catch (error) {
        console.error("Failed to fetch moves:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMoves();
  }, [moveList]);

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
