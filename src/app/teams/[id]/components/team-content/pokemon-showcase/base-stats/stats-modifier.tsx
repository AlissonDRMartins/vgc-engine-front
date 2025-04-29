"use client";

import { useTeamContext } from "@/app/teams/[id]/context/team-context";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { BaseStats } from "@/types/pokemon";
import { useCallback, useEffect, useState } from "react";

export const StatsModifier = () => {
  const { pokemonSelected, updateMember } = useTeamContext();
  const [localEvs, setLocalEvs] = useState<BaseStats>({
    hp: 0,
    atk: 0,
    def: 0,
    spatk: 0,
    spdef: 0,
    speed: 0,
  });

  useEffect(() => {
    if (pokemonSelected) setLocalEvs(pokemonSelected.evs);
  }, [pokemonSelected]);

  const handleEvChange = useCallback(
    (statName: keyof BaseStats, value: number) => {
      setLocalEvs((prev) => {
        const currentTotal = Object.values(prev).reduce((sum, v) => sum + v, 0);
        const currentStatValue = prev[statName];
        const delta = value - currentStatValue;
        const newTotal = currentTotal + delta;

        if (newTotal > 510) return prev;

        return {
          ...prev,
          [statName]: value,
        };
      });
    },
    []
  );

  const handleEvCommit = useCallback(
    (statName: keyof BaseStats, value: number) => {
      if (!pokemonSelected) return;

      updateMember(pokemonSelected.indexTeam, (prev) => ({
        ...prev,
        evs: {
          ...prev.evs,
          [statName]: value,
        },
      }));
    },
    [pokemonSelected, updateMember]
  );

  const statLabels: { key: keyof BaseStats; label: string }[] = [
    { key: "hp", label: "HP" },
    { key: "atk", label: "ATK" },
    { key: "def", label: "DEF" },
    { key: "spatk", label: "SP.ATK" },
    { key: "spdef", label: "SP.DEF" },
    { key: "speed", label: "SPD" },
  ];

  const totalEvs = Object.values(localEvs).reduce((sum, v) => sum + v, 0);

  return (
    <div className="-mt-6 mb-2 mx-2 md:mt-3 border rounded-md border-stone-200 dark:border-stone-900">
      <div className="w-full flex bg-stone-200 dark:bg-stone-900 text-black dark:text-white p-2 rounded-md">
        <span>Stats modifier</span>
      </div>
      <div className="p-2 flex gap-2">
        <div className="flex flex-col items-end justify-end gap-2">
          {statLabels.map((stat) => (
            <span key={stat.key} className="text-sm h-6 flex items-center">
              {stat.label}
            </span>
          ))}
        </div>
        <div className="flex flex-col gap-1 w-full max-w-[400px] items-start">
          <div className="w-full flex justify-between">
            <div className="flex justify-center items-center w-[20%]">
              <span className="text-sm">Base stats</span>
            </div>
            <div className="flex justify-center items-center w-[60%]">
              <span className="text-sm text-muted-foreground">
                Total EVs: {totalEvs} / 510
              </span>
            </div>

            <div className="flex justify-center items-center w-[20%]">
              <span className="text-sm">EVs</span>
            </div>
          </div>
          <div className="flex flex-col items-start gap-2 w-full">
            {statLabels.map(({ key }) => {
              return (
                <div key={key} className="w-full">
                  <div className="flex w-full">
                    <div
                      className="flex w-[20%] bg-black text-white justify-center"
                      style={{
                        clipPath: "polygon(0 0, 80% 0, 100% 100%, 20% 100%)",
                      }}
                    >
                      <span className="text-sm md:text-base h-6 flex items-center">
                        {pokemonSelected?.baseStats[key] ?? 0}
                      </span>
                    </div>
                    <div
                      className="flex w-[60%] bg-stone-200 text-black justify-center"
                      style={{
                        clipPath: "polygon(0 0, 93% 0, 100% 100%, 7% 100%)",
                      }}
                    >
                      <Slider
                        value={[localEvs[key]]}
                        onValueChange={(val) => handleEvChange(key, val[0])}
                        onValueCommit={(val) => handleEvCommit(key, val[0])}
                        max={252}
                        step={1}
                        className="w-[80%] hover:cursor-pointer"
                        trackClassName="bg-white"
                        rangeClassName="bg-black"
                        thumbClassName="hidden"
                      />
                    </div>
                    <div
                      className="flex w-[20%] bg-black text-white justify-center"
                      style={{
                        clipPath: "polygon(0 0, 80% 0, 100% 100%, 20% 100%)",
                      }}
                    >
                      <Input
                        type="number"
                        min={0}
                        max={252}
                        value={localEvs[key] === 0 ? "" : localEvs[key]}
                        className="text-center border-none h-6 text-sm md:text-base"
                        onChange={(e) => {
                          const inputValue = e.target.value;

                          if (inputValue === "") {
                            setLocalEvs((prev) => ({
                              ...prev,
                              [key]: 0,
                            }));
                            return;
                          }

                          const parsed = parseInt(inputValue, 10);

                          if (isNaN(parsed)) return;

                          let newValue = parsed;
                          if (newValue > 252) newValue = 252;
                          if (newValue < 0) newValue = 0;

                          handleEvChange(key, newValue);
                        }}
                        onBlur={(e) => {
                          const inputValue = e.target.value.trim();
                          if (inputValue === "") {
                            handleEvChange(key, 0);
                            handleEvCommit(key, 0);
                            return;
                          }

                          const parsed = parseInt(inputValue, 10);
                          if (!isNaN(parsed)) {
                            handleEvCommit(key, parsed);
                          }
                        }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
