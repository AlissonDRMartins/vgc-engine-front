"use client";

import { MovesDetail, PokemonInfo } from "@/types/pokemon";
import { useEffect, useRef, useState } from "react";
import { MoveDataTable } from "./data-table";
import { moveListColumns } from "./columns";
import { VgcEngineService } from "@/services/vgc-engine";

interface MoveListProps {
  moveList: string[];
  teamMoveLists: string[][];
  pokemonSelected: PokemonInfo | null;
  selectedPokemonIndex: number;
  updateMember: (
    index: number,
    updater: (prev: PokemonInfo) => PokemonInfo
  ) => void;
}

export const MoveList = ({
  moveList,
  teamMoveLists,
  pokemonSelected,
  selectedPokemonIndex,
  updateMember,
}: MoveListProps) => {
  const [movesDetails, setMovesDetails] = useState<MovesDetail[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const movesCache = useRef<Map<string, MovesDetail>>(new Map());

  useEffect(() => {
    const loadMoves = async () => {
      try {
        const uniqueMoves = Array.from(
          new Set([...moveList, ...teamMoveLists.flat()])
        );

        const movesToFetch = uniqueMoves.filter(
          (move) => !movesCache.current.has(move)
        );

        if (movesToFetch.length > 0) {
          setIsLoading(true);
          const fetchedMoves = await VgcEngineService.getMoveDetails(
            movesToFetch
          );

          fetchedMoves.moves.forEach((moveDetail) => {
            movesCache.current.set(moveDetail.name, moveDetail);
          });
        }

        const selectedMovesDetails = moveList
          .map((move) => movesCache.current.get(move))
          .filter((moveDetail): moveDetail is MovesDetail => !!moveDetail)
          .sort((a, b) => a.name.localeCompare(b.name));

        setMovesDetails(selectedMovesDetails);
      } catch (error) {
        console.error("Failed to fetch moves:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadMoves();
  }, [moveList, teamMoveLists, selectedPokemonIndex]);

  const handleAddMove = (move: MovesDetail) => {
    const pokemonIndex = selectedPokemonIndex;
    if (pokemonIndex === -1) return;

    updateMember(pokemonIndex, (prevPokemon) => {
      const moveIndex = prevPokemon.moves.findIndex(
        (m) => m.name === move.name
      );
      const newMoves = [...prevPokemon.moves];

      if (moveIndex !== -1) {
        newMoves.splice(moveIndex, 1);
      } else {
        if (newMoves.length >= 4) newMoves.pop();
        newMoves.push({
          name: move.name,
          power: move.power || 0,
          type: move.type,
        });
      }

      return {
        ...prevPokemon,
        moves: newMoves,
      };
    });
  };

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
        <MoveDataTable
          columns={moveListColumns}
          data={movesDetails}
          onRowClick={handleAddMove}
          selectedMoves={pokemonSelected?.moves.map((m) => m.name) || []}
        />
      )}
    </div>
  );
};
