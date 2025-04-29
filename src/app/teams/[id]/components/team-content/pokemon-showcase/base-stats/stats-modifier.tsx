"use client";

import { useTeamContext } from "@/app/teams/[id]/context/team-context";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { BaseStats } from "@/types/pokemon";
import { ArrowDown, ArrowRight } from "lucide-react";
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
  const [localIvs, setLocalIvs] = useState<BaseStats>({
    hp: 0,
    atk: 0,
    def: 0,
    spatk: 0,
    spdef: 0,
    speed: 0,
  });

  useEffect(() => {
    if (pokemonSelected) {
      setLocalEvs(pokemonSelected.evs);
      setLocalIvs(pokemonSelected.ivs);
    }
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

  const handleIvChange = useCallback(
    (statName: keyof BaseStats, value: number) => {
      setLocalIvs((prev) => ({
        ...prev,
        [statName]: value,
      }));
    },
    []
  );

  const handleIvCommit = useCallback(
    (statName: keyof BaseStats, value: number) => {
      if (!pokemonSelected) return;

      updateMember(pokemonSelected.indexTeam, (prev) => ({
        ...prev,
        ivs: {
          ...prev.ivs,
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
      <div className="flex w-full flex-col md:flex-row">
        <div className="p-2 flex gap-2 w-full md:w-[55%] justify-center md:justify-start">
          <div className="flex flex-col items-end gap-2">
            <div className="h-4 w-full" />
            {statLabels.map((stat) => (
              <span key={stat.key} className="text-sm h-6 flex items-center">
                {stat.label}
              </span>
            ))}
          </div>
          <div className="flex flex-col gap-1 w-full max-w-[400px] items-start">
            <div className="w-full flex justify-between">
              <div className="flex justify-center items-center w-[20%]">
                <span className="text-sm truncate">Base stats</span>
              </div>
              <div className="flex justify-center items-center w-[60%]">
                <span className="text-sm text-muted-foreground truncate">
                  Total EVs: {totalEvs} / 510
                </span>
              </div>

              <div className="flex justify-center items-center w-[20%]">
                <span className="text-sm">EVs</span>
              </div>
            </div>
            <div className="flex flex-col items-start gap-2 w-full">
              {statLabels.map((stat) => {
                return (
                  <div key={stat.key} className="w-full">
                    <div className="flex w-full">
                      <div
                        className="flex w-[20%] bg-black text-white justify-center"
                        style={{
                          clipPath: "polygon(0 0, 80% 0, 100% 100%, 20% 100%)",
                        }}
                      >
                        <span className="text-sm md:text-base h-6 flex items-center">
                          {pokemonSelected?.baseStats[stat.key] ?? 0}
                        </span>
                      </div>
                      <div
                        className="flex w-[60%] bg-stone-200 text-black justify-center"
                        style={{
                          clipPath: "polygon(0 0, 93% 0, 100% 100%, 7% 100%)",
                        }}
                      >
                        <Slider
                          value={[localEvs[stat.key]]}
                          onValueChange={(val) =>
                            handleEvChange(stat.key, val[0])
                          }
                          onValueCommit={(val) =>
                            handleEvCommit(stat.key, val[0])
                          }
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
                          placeholder="0"
                          value={
                            localEvs[stat.key] === 0 ? "" : localEvs[stat.key]
                          }
                          className="text-center border-none h-6 text-sm md:text-base"
                          onChange={(e) => {
                            const inputValue = e.target.value;

                            if (inputValue === "") {
                              setLocalEvs((prev) => ({
                                ...prev,
                                [stat.key]: 0,
                              }));
                              return;
                            }

                            const parsed = parseInt(inputValue, 10);

                            if (isNaN(parsed)) return;

                            let newValue = parsed;
                            if (newValue > 252) newValue = 252;
                            if (newValue < 0) newValue = 0;

                            handleEvChange(stat.key, newValue);
                          }}
                          onBlur={(e) => {
                            const inputValue = e.target.value.trim();
                            if (inputValue === "") {
                              handleEvChange(stat.key, 0);
                              handleEvCommit(stat.key, 0);
                              return;
                            }

                            const parsed = parseInt(inputValue, 10);
                            if (!isNaN(parsed)) {
                              handleEvCommit(stat.key, parsed);
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
        <div className="m-1 p-2 flex gap-2 w-full md:w-[45%] max-w-[400px] mx-auto justify-center md:justify-start border rounded-md bg-stone-200 dark:bg-stone-900">
          <div className="flex flex-col gap-1 w-full">
            <div className="flex justify-center w-full rounded-md bg-stone-300 dark:bg-stone-950">
              <span>IVs</span>
            </div>
            <div className="grid grid-cols-6 md:grid-cols-3 lg:grid-cols-6 gap-0.5 w-full my-auto">
              {statLabels.map((stat) => {
                return (
                  <div
                    key={stat.key}
                    className="flex flex-col gap-1 items-center w-full"
                  >
                    <span className="text-sm text-muted-foreground">
                      {stat.label}
                    </span>
                    <Input
                      type="number"
                      min={0}
                      max={31}
                      placeholder="0"
                      value={localIvs[stat.key] === 0 ? "" : localIvs[stat.key]}
                      className="text-center border-none h-6 text-sm md:text-base bg-stone-800 text-white rounded-none"
                      onChange={(e) => {
                        const inputValue = e.target.value;

                        if (inputValue === "") {
                          setLocalIvs((prev) => ({
                            ...prev,
                            [stat.key]: 0,
                          }));
                          return;
                        }

                        const parsed = parseInt(inputValue, 10);

                        if (isNaN(parsed)) return;

                        let newValue = parsed;
                        if (newValue > 31) newValue = 31;
                        if (newValue < 0) newValue = 0;

                        handleIvChange(stat.key, newValue);
                      }}
                      onBlur={(e) => {
                        const inputValue = e.target.value.trim();
                        if (inputValue === "") {
                          handleIvChange(stat.key, 0);
                          handleIvCommit(stat.key, 0);
                          return;
                        }

                        const parsed = parseInt(inputValue, 10);
                        if (!isNaN(parsed)) {
                          handleIvCommit(stat.key, parsed);
                        }
                      }}
                    />
                  </div>
                );
              })}
            </div>
            <div className="grid grid-cols-2 gap-1 justify-between">
              <span className="col-span-2 w-full flex justify-center text-sm text-muted-foreground">
                IV Spreads
              </span>
              <Button
                className="p-0 bg-stone-400 dark:bg-stone-700 dark:text-white dark:hover:bg-stone-600 cursor-pointer"
                onClick={() => {
                  const spread = {
                    hp: 31,
                    atk: 0,
                    def: 31,
                    spatk: 31,
                    spdef: 31,
                    speed: 31,
                  };
                  setLocalIvs(spread);

                  if (!pokemonSelected) return;

                  updateMember(pokemonSelected.indexTeam, (prev) => ({
                    ...prev,
                    ivs: spread,
                  }));
                }}
              >
                <span className="truncate">Weak Attack Spread</span>
              </Button>
              <Button
                className="p-0 bg-stone-400 dark:bg-stone-700 dark:text-white dark:hover:bg-stone-600 cursor-pointer"
                onClick={() => {
                  const spread = {
                    hp: 31,
                    atk: 0,
                    def: 31,
                    spatk: 31,
                    spdef: 31,
                    speed: 0,
                  };
                  setLocalIvs(spread);

                  if (!pokemonSelected) return;

                  updateMember(pokemonSelected.indexTeam, (prev) => ({
                    ...prev,
                    ivs: spread,
                  }));
                }}
              >
                <span className="truncate">Weak Slower Spread</span>
              </Button>
              <Button
                className="p-0 bg-stone-400 dark:bg-stone-700 dark:text-white dark:hover:bg-stone-600 cursor-pointer"
                onClick={() => {
                  const spread = {
                    hp: 31,
                    atk: 31,
                    def: 31,
                    spatk: 31,
                    spdef: 31,
                    speed: 31,
                  };
                  setLocalIvs(spread);

                  if (!pokemonSelected) return;

                  updateMember(pokemonSelected.indexTeam, (prev) => ({
                    ...prev,
                    ivs: spread,
                  }));
                }}
              >
                Max Spread
              </Button>
              <Button
                className="p-0 bg-stone-400 dark:bg-stone-700 dark:text-white dark:hover:bg-stone-600 cursor-pointer"
                onClick={() => {
                  const spread = {
                    hp: 31,
                    atk: 31,
                    def: 31,
                    spatk: 31,
                    spdef: 31,
                    speed: 0,
                  };
                  setLocalIvs(spread);

                  if (!pokemonSelected) return;

                  updateMember(pokemonSelected.indexTeam, (prev) => ({
                    ...prev,
                    ivs: spread,
                  }));
                }}
              >
                <span className="truncate">Slower Spread</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className="flex w-full p-1">
        <Dialog>
          <DialogTrigger asChild>
            <Button>{"Choose nature"}</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Nature</DialogTitle>
            </DialogHeader>
            <div className="flex flex-col">
              <div className="w-full flex gap-2 text-muted-foreground items-center justify-center">
                <ArrowRight className="w-4 h-4" />
                <span className="text-sm">Positive</span>
              </div>
              <div className="flex">
                <div className="flex flex-col gap-2 text-muted-foreground items-center justify-center">
                  <ArrowDown className="w-4 h-4" />
                  <span className="text-sm inline-block [writing-mode:vertical-lr]">
                    Negative
                  </span>
                </div>
                <div className="w-full flex flex-col">
                  <div className="flex justify-between w-full">
                    <div className="w-full h-10 flex justify-center items-center border-b" />
                    <span className="w-full h-10 flex justify-center items-center border-b border-l">
                      Atk
                    </span>
                    <span className="w-full h-10 flex justify-center items-center border-b">
                      Def
                    </span>
                    <span className="w-full h-10 flex justify-center items-center border-b">
                      Sp.Atk
                    </span>
                    <span className="w-full h-10 flex justify-center items-center border-b">
                      Sp.Def
                    </span>
                    <span className="w-full h-10 flex justify-center items-center border-b">
                      Speed
                    </span>
                  </div>
                  <div className="flex justify-between w-full">
                    <span className="w-full h-10 flex justify-center items-center">
                      Atk
                    </span>
                    <span className="w-full h-10 flex justify-center items-center border-l">
                      Hardy
                    </span>
                    <span className="w-full h-10 flex justify-center items-center">
                      Bold
                    </span>
                    <span className="w-full h-10 flex justify-center items-center">
                      Modest
                    </span>
                    <span className="w-full h-10 flex justify-center items-center">
                      Calm
                    </span>
                    <span className="w-full h-10 flex justify-center items-center">
                      Timid
                    </span>
                  </div>
                  <div className="flex justify-between w-full">
                    <span className="w-full h-10 flex justify-center items-center">
                      Def
                    </span>
                    <span className="w-full h-10 flex justify-center items-center border-l">
                      Lonely
                    </span>
                    <span className="w-full h-10 flex justify-center items-center">
                      Docile
                    </span>
                    <span className="w-full h-10 flex justify-center items-center">
                      Mild
                    </span>
                    <span className="w-full h-10 flex justify-center items-center">
                      Gentle
                    </span>
                    <span className="w-full h-10 flex justify-center items-center">
                      Hasty
                    </span>
                  </div>
                  <div className="flex justify-between w-full">
                    <span className="w-full h-10 flex justify-center items-center">
                      Sp.Atk
                    </span>
                    <span className="w-full h-10 flex justify-center items-center border-l">
                      Adamant
                    </span>
                    <span className="w-full h-10 flex justify-center items-center">
                      Impish
                    </span>
                    <span className="w-full h-10 flex justify-center items-center">
                      Bashful
                    </span>
                    <span className="w-full h-10 flex justify-center items-center">
                      Careful
                    </span>
                    <span className="w-full h-10 flex justify-center items-center">
                      Jolly
                    </span>
                  </div>
                  <div className="flex justify-between w-full">
                    <span className="w-full h-10 flex justify-center items-center">
                      Sp.Def
                    </span>
                    <span className="w-full h-10 flex justify-center items-center border-l">
                      Naughty
                    </span>
                    <span className="w-full h-10 flex justify-center items-center">
                      Lax
                    </span>
                    <span className="w-full h-10 flex justify-center items-center">
                      Rash
                    </span>
                    <span className="w-full h-10 flex justify-center items-center">
                      Quirky
                    </span>
                    <span className="w-full h-10 flex justify-center items-center">
                      Naive
                    </span>
                  </div>
                  <div className="flex justify-between w-full">
                    <span className="w-full h-10 flex justify-center items-center">
                      Speed
                    </span>
                    <span className="w-full h-10 flex justify-center items-center border-l">
                      Brave
                    </span>
                    <span className="w-full h-10 flex justify-center items-center">
                      Relaxed
                    </span>
                    <span className="w-full h-10 flex justify-center items-center">
                      Quiet
                    </span>
                    <span className="w-full h-10 flex justify-center items-center">
                      Sassy
                    </span>
                    <span className="w-full h-10 flex justify-center items-center">
                      Serious
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};
