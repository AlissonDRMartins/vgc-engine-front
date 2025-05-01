import dynamic from "next/dynamic";
import { useAbilityData } from "./useAbilityData";
import { useTeamContext } from "@/app/teams/[id]/context/team-context";

const AbilityDataTable = dynamic(
  () => import("./data-table").then((mod) => mod.DataTable),
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

export const AbilityList = () => {
  const { data, isLoading, handleAddAbility } = useAbilityData();
  const { pokemonSelected } = useTeamContext();

  if (isLoading)
    return (
      <div className="flex flex-col gap-2 p-2 w-full mt-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className="bg-stone-500/50 animate-pulse rounded-md w-full h-10"
          />
        ))}
      </div>
    );

  return (
    <div className="flex flex-col">
      <AbilityDataTable
        data={data}
        selectedAbility={pokemonSelected?.ability}
        onRowClick={handleAddAbility}
      />
    </div>
  );
};
