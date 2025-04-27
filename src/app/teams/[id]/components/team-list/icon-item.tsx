"use client";

import { motion } from "framer-motion";

import { PokemonInfo } from "@/types/pokemon";
import Image from "next/image";

interface IconItemProps {
  pokemon: PokemonInfo;
  pokemonSelected?: PokemonInfo | null;
}

export const IconItem = ({ pokemon, pokemonSelected }: IconItemProps) => {
  const isSelected = pokemonSelected?.name === pokemon.name;

  return (
    <motion.div
      layout
      initial={{ rotate: 45 }}
      animate={{ scale: isSelected ? 1.2 : 1 }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 20,
        duration: 0.3,
        ease: "easeInOut",
      }}
      className={`relative ${
        isSelected ? "w-20 h-20" : "w-10 h-10"
      } rounded-full overflow-hidden shadow-lg border-[1px] border-black`}
    >
      {/* Parte de cima - Vermelha */}
      <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-r from-red-600 to-red-800 border-b-[2px] border-black" />

      {/* Parte de baixo - Branca */}
      <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-r from-white to-gray-400" />

      {/* Linha preta do meio */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-full h-[1px] bg-black z-10" />

      {/* Botão central */}
      <div
        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 flex items-center justify-center rounded-full ${
          isSelected
            ? "w-14 h-14 bg-black border-[2px]"
            : "w-4 h-4 bg-white border-[2px]"
        } border-black`}
      >
        {isSelected ? (
          <div className="[transform:rotate(-45deg)] rounded-full flex items-center justify-center absolute w-16 h-16">
            {pokemon.sprite ? (
              <Image
                src={`${pokemon.sprite}`}
                width={100}
                height={100}
                alt={pokemon.name}
                className="w-20 h-20 object-contain"
                rel="preload"
              />
            ) : (
              <div className="w-14 h-14 bg-gray-400 animate-pulse rounded-full" />
            )}
          </div>
        ) : (
          <div className="w-2 h-2 bg-gray-400 rounded-full" />
        )}
      </div>
    </motion.div>
  );
};
