import { BaseStats, PokemonInfo } from "@/types/pokemon";
import { statLabels } from "./stat-labels";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { ChangeEvent } from "react";
import { natureModifiers } from "@/utils/nature";
import { AnimatedNumber } from "@/utils/animate-number";

interface EvsInputsProps {
  pokemonSelected: PokemonInfo | null;
  localEvs: BaseStats;
  handleEvChange: (statName: keyof BaseStats, value: number) => void;
  handleEvCommit: (statName: keyof BaseStats, value: number) => void;
}

export const EvsInputs = ({
  handleEvChange,
  handleEvCommit,
  localEvs,
  pokemonSelected,
}: EvsInputsProps) => {
  const onChangeEv = ({
    e,
    stat,
  }: {
    e: ChangeEvent<HTMLInputElement>;
    stat: { key: keyof BaseStats; label: string };
  }) => {
    const inputValue = e.target.value;
    if (inputValue === "") {
      handleEvChange(stat.key, 0);
      return;
    }
    const parsed = parseInt(inputValue, 10);
    if (!isNaN(parsed)) {
      handleEvChange(stat.key, Math.min(252, Math.max(0, parsed)));
    }
  };

  const nature = pokemonSelected?.nature || "";
  const statUp = nature ? natureModifiers[nature]?.up : null;
  const statDown = nature ? natureModifiers[nature]?.down : null;

  return (
    <div className="flex flex-col items-start gap-2 w-full">
      {statLabels.map((stat, index) => (
        <div key={stat.key} className="w-full">
          <div className="flex w-full">
            <div
              className="flex w-[20%] bg-black text-white justify-center"
              style={{
                clipPath: "polygon(0 0, 80% 0, 100% 100%, 20% 100%)",
              }}
            >
              <span className="text-sm md:text-base h-6 flex items-center">
                <AnimatedNumber
                  value={pokemonSelected?.baseStats[stat.key] ?? 0}
                  delay={200 * index + 500}
                  duration={200}
                />
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
                onValueChange={(val) => handleEvChange(stat.key, val[0])}
                onValueCommit={(val) => handleEvCommit(stat.key, val[0])}
                max={252}
                step={1}
                className="w-[80%] hover:cursor-pointer"
                trackClassName="bg-white"
                rangeClassName="bg-black"
                thumbClassName="hidden"
              />
            </div>
            <div
              className={`flex w-[20%] ${
                statUp === stat.key
                  ? "bg-gradient-to-br from-green-500 to-green-700 dark:from-green-800 dark:to-green-900"
                  : statDown === stat.key
                  ? "bg-gradient-to-br from-red-500 to-red-700 dark:bg-red-800 dark:to-red-900"
                  : "bg-black"
              } text-white justify-center`}
              style={{
                clipPath: "polygon(0 0, 80% 0, 100% 100%, 20% 100%)",
              }}
            >
              <Input
                type="number"
                min={0}
                max={252}
                placeholder="0"
                value={localEvs[stat.key] === 0 ? "" : localEvs[stat.key]}
                className="text-center border-none h-6 text-sm md:text-base"
                onChange={(e) => onChangeEv({ e, stat })}
                onBlur={(e) => {
                  const inputValue = e.target.value.trim();
                  const parsed = parseInt(inputValue, 10);
                  handleEvCommit(stat.key, isNaN(parsed) ? 0 : parsed);
                }}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
