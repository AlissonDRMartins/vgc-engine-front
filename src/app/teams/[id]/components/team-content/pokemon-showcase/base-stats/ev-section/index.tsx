"use client";

import { StatsLabelsContent } from "./stats-labels-content";
import { EvsTitles } from "./evs-titles";
import { EvsInputs } from "./evs-inputs";
import { useStatModifier } from "../hook/useStatModifier";
import { useTeamContext } from "@/app/teams/[id]/context/team-context";

export const EvSection = () => {
  const { pokemonSelected } = useTeamContext();
  const { totalEvs, handleEvChange, handleEvCommit, localEvs } =
    useStatModifier();

  return (
    <div className="p-2 flex gap-2 w-full md:w-[55%] justify-center md:justify-start">
      <StatsLabelsContent />
      <div className="flex flex-col gap-1 w-full items-start">
        <EvsTitles totalEvs={totalEvs} />
        <EvsInputs
          handleEvChange={handleEvChange}
          handleEvCommit={handleEvCommit}
          pokemonSelected={pokemonSelected}
          localEvs={localEvs}
        />
      </div>
    </div>
  );
};
