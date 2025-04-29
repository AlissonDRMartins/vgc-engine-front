import { useTeamContext } from "@/app/teams/[id]/context/team-context";
import { BaseStats } from "@/types/pokemon";
import { useCallback, useEffect, useState } from "react";

export const useStatModifier = () => {
  const { pokemonSelected, updateMember } = useTeamContext();
  const [localEvs, setLocalEvs] = useState<BaseStats>(defaultStats);
  const [localIvs, setLocalIvs] = useState<BaseStats>(defaultStats);

  useEffect(() => {
    if (pokemonSelected) {
      setLocalEvs(pokemonSelected.evs);
      setLocalIvs(pokemonSelected.ivs);
    }
  }, [pokemonSelected]);

  const handleEvChange = useCallback(
    (statName: keyof BaseStats, value: number) => {
      setLocalEvs((prev) => {
        const total = Object.values(prev).reduce((sum, v) => sum + v, 0);
        const delta = value - prev[statName];
        if (total + delta > 510) return prev;
        return { ...prev, [statName]: value };
      });
    },
    []
  );

  const handleEvCommit = useCallback(
    (statName: keyof BaseStats, value: number) => {
      if (!pokemonSelected) return;
      updateMember(pokemonSelected.indexTeam, (prev) => ({
        ...prev,
        evs: { ...prev.evs, [statName]: value },
      }));
    },
    [pokemonSelected, updateMember]
  );

  const handleIvChange = useCallback(
    (statName: keyof BaseStats, value: number) => {
      setLocalIvs((prev) => ({ ...prev, [statName]: value }));
    },
    []
  );

  const handleIvCommit = useCallback(
    (statName: keyof BaseStats, value: number) => {
      if (!pokemonSelected) return;
      updateMember(pokemonSelected.indexTeam, (prev) => ({
        ...prev,
        ivs: { ...prev.ivs, [statName]: value },
      }));
    },
    [pokemonSelected, updateMember]
  );

  const applyPreset = (preset: BaseStats) => {
    setLocalIvs(preset);
    if (!pokemonSelected) return;
    updateMember(pokemonSelected.indexTeam, (prev) => ({
      ...prev,
      ivs: preset,
    }));
  };

  return {
    localEvs,
    localIvs,
    handleEvChange,
    handleEvCommit,
    handleIvChange,
    handleIvCommit,
    applyPreset,
    totalEvs: Object.values(localEvs).reduce((s, v) => s + v, 0),
  };
};

const defaultStats: BaseStats = {
  hp: 0,
  atk: 0,
  def: 0,
  spatk: 0,
  spdef: 0,
  speed: 0,
};
