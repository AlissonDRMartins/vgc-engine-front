"use client";

import { Input } from "@/components/ui/input";
import { statLabels } from "../ev-section/stat-labels";
import { IvInfoDialog } from "./iv-info-dialog";
import { BaseStats } from "@/types/pokemon";
import { useStatModifier } from "../hook/useStatModifier";
import { Button } from "@/components/ui/button";

export const IvsSection = () => {
  const { handleIvChange, handleIvCommit, applyPreset, localIvs } =
    useStatModifier();

  return (
    <div className="m-1 p-2 flex gap-2 w-full md:w-[45%] max-w-[400px] mx-auto justify-center md:justify-start border rounded-md bg-stone-200 dark:bg-stone-900">
      <div className="flex flex-col gap-1 w-full">
        <div className="flex justify-center w-full rounded-md bg-stone-300 dark:bg-stone-950 relative">
          <span>IVs</span>
          <IvInfoDialog />
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
                    const value = e.target.value;
                    const parsed = parseInt(value, 10);

                    handleIvChange(
                      stat.key,
                      value === "" || isNaN(parsed)
                        ? 0
                        : Math.min(31, Math.max(0, parsed))
                    );
                  }}
                  onBlur={(e) => {
                    const value = e.target.value.trim();
                    const parsed = parseInt(value, 10);

                    handleIvCommit(
                      stat.key,
                      value === "" || isNaN(parsed) ? 0 : parsed
                    );
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
          {spreads.map((spreadItem, index) => (
            <Button
              key={index}
              className="p-0 bg-stone-400 dark:bg-stone-700 dark:text-white dark:hover:bg-stone-600 cursor-pointer"
              onClick={() => applyPreset(spreadItem.spread)}
            >
              <span className="truncate">{spreadItem.label}</span>
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};

const spreads: { label: string; spread: BaseStats }[] = [
  {
    label: "Weak Attack Spread",
    spread: {
      hp: 31,
      atk: 0,
      def: 31,
      spatk: 31,
      spdef: 31,
      speed: 31,
    },
  },
  {
    label: "Weak Slower Spread",
    spread: {
      hp: 31,
      atk: 0,
      def: 31,
      spatk: 31,
      spdef: 31,
      speed: 0,
    },
  },
  {
    label: "Max Spread",
    spread: {
      hp: 31,
      atk: 31,
      def: 31,
      spatk: 31,
      spdef: 31,
      speed: 31,
    },
  },
  {
    label: "Slower Spread",
    spread: {
      hp: 31,
      atk: 31,
      def: 31,
      spatk: 31,
      spdef: 31,
      speed: 0,
    },
  },
];
