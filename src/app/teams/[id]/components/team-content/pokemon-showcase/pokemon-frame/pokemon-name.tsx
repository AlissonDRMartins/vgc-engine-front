"use client";

import { PokemonTypeItem } from "@/components/pokemon/type";
import { formatApiName } from "@/utils/format";
import { AnimatePresence, motion } from "framer-motion";
import { useBuilderContext } from "../context/builder-context";
import { useTeamContext } from "@/app/teams/[id]/context/team-context";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";

interface PokemonNameProps {
  name: string;
}

export const PokemonName = ({ name }: PokemonNameProps) => {
  const { pokeData } = useBuilderContext();
  const { pokemonSelected, updateMember } = useTeamContext();
  const types: string[] = pokeData?.types.map((type) => type.type.name) || [];
  const level = pokemonSelected?.level || 1;

  const [localLevel, setLocalLevel] = useState<string>(level.toString());

  useEffect(() => {
    setLocalLevel(level.toString());
  }, [level]);

  const handleLevelChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) setLocalLevel(value);
  };

  const handleLevelBlur = () => {
    const parsed = parseInt(localLevel);
    const newLevel = isNaN(parsed) ? 1 : Math.min(Math.max(parsed, 1), 100);

    updateMember(pokemonSelected!.indexTeam, (prev) => ({
      ...prev,
      level: newLevel,
    }));

    setLocalLevel(newLevel.toString());
  };

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
            value={localLevel}
            onChange={handleLevelChange}
            onBlur={handleLevelBlur}
            inputMode="numeric"
            className="text-center border-none h-6 text-sm md:text-base w-[45px] p-0 !bg-stone-800 rounded-sm"
          />
        </div>
        <PokemonTypeItem pokemonType={types} withAnimation />
      </div>
    </div>
  );
};
