"use client";

import { AnimatePresence, motion } from "framer-motion";
import { PokemonInfoApi } from "@/types/poke-api";
import Image from "next/image";
import { PokemonTypeItem } from "../type";

interface PokedexFrameProps {
  pokedata: PokemonInfoApi | null;
}

export const PokedexFrame = ({ pokedata }: PokedexFrameProps) => {
  const sprite =
    pokedata?.sprites.other["official-artwork"].front_default ??
    pokedata?.sprites.front_default;
  const types: string[] = pokedata?.types.map((type) => type.type.name) || [];
  const name = pokedata?.name ?? "Not found";

  return (
    <div className="w-72 h-60 rounded-xl bg-gradient-to-br from-red-600 to-red-900 border-2 border-black shadow-lg flex flex-col items-center p-1 gap-1">
      <Screen sprite={sprite} />
      <FrameInfo name={name} types={types} />
    </div>
  );
};

const Screen = ({ sprite }: { sprite: string | null | undefined }) => {
  return (
    <div className="w-full h-48 bg-black rounded-lg flex items-center justify-center overflow-hidden border-2 border-black">
      <AnimatePresence mode="wait">
        {sprite ? (
          <motion.div
            key={sprite}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 5 }}
          >
            <Image
              src={sprite}
              width={192}
              height={192}
              alt="Pikachu"
              className="h-full object-contain"
            />
          </motion.div>
        ) : (
          <div>
            <span>Not found</span>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

const FrameInfo = ({ name, types }: { name: string; types: string[] }) => {
  return (
    <div className="flex justify-between items-center w-full px-2">
      <AnimatePresence mode="wait">
        <motion.div
          initial={{ opacity: 0, x: 5 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 5 }}
          key={name}
        >
          <div className="text-white text-sm tracking-wider capitalize">
            {name}
          </div>
        </motion.div>
      </AnimatePresence>

      <div className="flex gap-2">
        <PokemonTypeItem pokemonType={types} />
      </div>
    </div>
  );
};
