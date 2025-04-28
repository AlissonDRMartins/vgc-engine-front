"use client";

import { useTeamContext } from "@/app/teams/[id]/context/team-context";
import { useMoveList } from "../useMoveList";
import { moveListColumns } from "./columns";
import dynamic from "next/dynamic";

const MoveDataTable = dynamic(
  () => import("./data-table").then((mod) => mod.MoveDataTable),
  {
    loading: () => (
      <div className="flex flex-col gap-2 w-full">
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className="bg-stone-500/50 animate-pulse rounded-md w-full h-10"
          />
        ))}
      </div>
    ),
    ssr: false,
  }
);

export const MoveList = () => {
  const { moves, isLoading, handleAddMove } = useMoveList();
  const { pokemonSelected } = useTeamContext();

  if (isLoading)
    return (
      <div className="flex flex-col gap-2 p-2 w-full">
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className="bg-stone-500/50 animate-pulse rounded-md w-full h-10"
          />
        ))}
      </div>
    );

  return (
    <div className="flex flex-col gap-2 p-2 w-full">
      <MoveDataTable
        columns={moveListColumns}
        data={moves}
        onRowClick={handleAddMove}
        selectedMoves={pokemonSelected?.moves.map((m) => m.name) || []}
      />
    </div>
  );
};
