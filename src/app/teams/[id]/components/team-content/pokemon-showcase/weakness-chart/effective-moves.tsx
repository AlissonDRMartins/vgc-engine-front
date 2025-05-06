"use client";

import { motion } from "framer-motion";
import { PokemonTypeItem } from "@/components/pokemon/type";
import { PokemonTypeAnalysis } from "@/utils/type-analysis";
import { formatApiName } from "@/utils/format";

interface EffectiveMovesProps {
  analyzedTypes: PokemonTypeAnalysis;
}

export const EffectiveMoves = ({ analyzedTypes }: EffectiveMovesProps) => {
  return (
    <div className="bg-stone-300 dark:bg-stone-800 p-2 rounded-md grid grid-cols-1 lg:grid-cols-2 gap-2 w-full">
      <span className="col-span-1 lg:col-span-2">Effective Moves</span>
      {analyzedTypes.moves.map((move, index) => {
        return (
          <motion.div
            key={move.name + index}
            whileHover={{ scale: 1.025 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2, delay: index * 0.2 }}
            className="w-full flex flex-col rounded-t-3xl rounded-b-md bg-stone-100 dark:bg-stone-700"
          >
            <div className="w-full bg-stone-200 dark:text-black flex items-center rounded-full justify-between h-full overflow-hidden">
              <span className="capitalize text-sm m-2 pl-3">
                {formatApiName(move.name)}
              </span>
              <div className="flex gap-1 justify-end w-[50%] max-w-[160px] h-[36px]">
                <PokemonTypeItem pokemonType={[String(move.type)]} arceusIcon />
                <div
                  className="w-[160px] bg-stone-700 dark:bg-stone-900 h-full flex items-center justify-center"
                  style={{
                    clipPath: "polygon(10px 0, 100% 0, 100% 100%, 0 100%)",
                  }}
                >
                  <span className="text-white p-2 text-sm md:text-base">
                    {move.power || "-"}
                  </span>
                </div>
              </div>
            </div>
            <div className="m-1 flex items-center gap-2 px-2">
              <span className="text-muted-foreground text-sm h-[32px] flex items-center w-[140px]">
                Super Effective:
              </span>
              <div className="flex w-full gap-1">
                {move.effectiveAgainst.map(({ type }, index) => (
                  <PokemonTypeItem pokemonType={[String(type)]} key={index} />
                ))}
              </div>

              {move.effectiveAgainst.length === 0 && (
                <span className="text-muted-foreground text-sm font-bold italic">
                  None
                </span>
              )}
            </div>
          </motion.div>
        );
      })}
      {analyzedTypes.moves.length === 0 && (
        <div className="col-span-1 lg:col-span-2 text-center text-muted-foreground text-sm font-bold italic border p-1 rounded-md">
          <span>No effective moves found</span>
        </div>
      )}
    </div>
  );
};
