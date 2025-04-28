import { MovesDetail } from "@/types/pokemon";
import { useEffect, useMemo, useRef, useState } from "react";
import { useBuilderContext } from "../context/builder-context";
import { useTeamContext } from "@/app/teams/[id]/context/team-context";
import { VgcEngineService } from "@/services/vgc-engine";

export const useMoveList = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [moves, setMoves] = useState<MovesDetail[]>([]);
  const { pokeData } = useBuilderContext();
  const { team, pokemonSelected, updateMember } = useTeamContext();

  const selectedPokemonMoveNames = useMemo(() => {
    return pokeData?.moves.map((moves) => moves.move.name) || [];
  }, [pokeData]);

  const teamMovesName = useMemo(() => {
    return team.members.map((member) => member.moves.map((move) => move.name));
  }, [team.members]);

  const selectedPokemonIndex = useMemo(() => {
    return team.members.findIndex(
      (member) => member.indexTeam === pokemonSelected?.indexTeam
    );
  }, [team.members, pokemonSelected?.indexTeam]);

  const movesCache = useRef<Map<string, MovesDetail>>(new Map());

  useEffect(() => {
    const loadMoves = async () => {
      try {
        const uniqueMoves = Array.from(
          new Set([...selectedPokemonMoveNames, ...teamMovesName.flat()])
        );

        if (uniqueMoves.length === 0) {
          setMoves([]);
          setIsLoading(false);
          return;
        }

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

        const selectedMovesDetails = selectedPokemonMoveNames
          .map((move) => movesCache.current.get(move))
          .filter((moveDetail): moveDetail is MovesDetail => !!moveDetail)
          .sort((a, b) => a.name.localeCompare(b.name));

        setMoves(selectedMovesDetails);
      } catch (error) {
        const err = error as Error;
        console.error("Failed to fetch moves:", err.message);
      } finally {
        setIsLoading(false);
      }
    };

    loadMoves();
  }, [selectedPokemonMoveNames, teamMovesName, pokeData, team.members]);

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

  return {
    moves,
    setMoves,
    isLoading,
    setIsLoading,
    handleAddMove,
  };
};
