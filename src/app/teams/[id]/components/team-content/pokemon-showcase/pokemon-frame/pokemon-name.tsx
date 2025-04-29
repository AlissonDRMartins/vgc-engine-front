"use client";

import { PokemonTypeItem } from "@/components/pokemon/type";
import { formatApiName } from "@/utils/format";
import { AnimatePresence, motion } from "framer-motion";
import { useBuilderContext } from "../context/builder-context";
import { useTeamContext } from "@/app/teams/[id]/context/team-context";
import { Input } from "@/components/ui/input";

interface PokemonNameProps {
  name: string;
}

export const PokemonName = ({ name }: PokemonNameProps) => {
  const { pokeData } = useBuilderContext();
  const { pokemonSelected } = useTeamContext();
  const types: string[] = pokeData?.types.map((type) => type.type.name) || [];

  return (
    <div
      className="bg-black shadow-2xl text-white w-[90%] md:w-full p-1 px-4 pr-6 flex items-center justify-between"
      style={{
        clipPath: "polygon(0 0, calc(100% - 17px) 0, 100% 100%, 0 100%)",
      }}
    >
      <AnimatePresence mode="wait">
        <motion.span
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 10 }}
          className="capitalize"
          key={name}
        >
          {formatApiName(name)}
        </motion.span>
      </AnimatePresence>
      <div className="flex gap-3 items-center">
        <div className="flex gap-2 items-center">
          <span>Lv.</span>
          <Input
            value={pokemonSelected?.lvl}
            className="text-center border-none h-6 text-sm md:text-base w-[45px] !bg-stone-800 rounded-sm"
          />
        </div>
        <PokemonTypeItem pokemonType={types} withAnimation />
      </div>
    </div>
  );
};
