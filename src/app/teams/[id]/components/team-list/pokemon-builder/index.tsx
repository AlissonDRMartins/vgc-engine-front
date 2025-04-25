"use client";

import { AnimatePresence, motion } from "framer-motion";
import { PokemonInfo } from "@/types/pokemon";
import { useEffect, useState } from "react";
import { PokeService } from "@/services/poke";
import { PokemonInfoApi } from "@/types/poke-api";
import { MovesSelected } from "./moves-selected";
import { PokemonFrame } from "./pokemon-frame";
import { CarouselApi } from "@/components/ui/carousel";
import { MenuOptions } from "./menu-options";

interface PokemonBuilderProps {
  pokemonSelected: PokemonInfo | null;
  updateMember: (index: number, pokemon: PokemonInfo) => void;
}

export const PokemonBuilder = ({
  pokemonSelected,
  updateMember,
}: PokemonBuilderProps) => {
  const [pokedata, setPokedata] = useState<PokemonInfoApi | null>(null);
  const [carouselApi, setCarouselApi] = useState<CarouselApi>();
  const [currentIndex, setCurrentIndex] = useState(0);
  console.log("currentIndex: ", currentIndex);

  useEffect(() => {
    const fetchPokemonData = async () => {
      if (pokemonSelected) {
        const data = await PokeService.getPokemon(pokemonSelected.name);
        setPokedata(data);
      }
    };

    fetchPokemonData();
  }, [pokemonSelected]);

  useEffect(() => {
    if (!carouselApi) return;

    const handleSelect = () => {
      const index = carouselApi.selectedScrollSnap();
      setCurrentIndex(index);
    };

    carouselApi.on("select", handleSelect);

    return () => {
      carouselApi.off("select", handleSelect);
    };
  }, [carouselApi]);

  return (
    <AnimatePresence mode="wait">
      {pokemonSelected && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ delay: 1.5 }}
          className="w-full h-full border relative overflow-hidden bg-stone-100 dark:bg-stone-800 rounded-lg shadow-lg flex items-center justify-center"
        >
          <div className="w-full h-full z-10">
            <div className="grid grid-cols-4 justify-center md:justify-start w-full gap-2">
              <PokemonFrame pokedata={pokedata} />
              <MenuOptions
                currentIndex={currentIndex}
                setCarouselApi={setCarouselApi}
              >
                <MovesSelected
                  pokedata={pokedata}
                  pokemonSelected={pokemonSelected}
                  updateMember={updateMember}
                />
              </MenuOptions>
              <span>test</span>
            </div>
          </div>

          <div className="absolute top-0 w-full h-[330px] md:h-[50vw] rotate-[0deg] md:rotate-[70deg] md:-left-[40%] md:-top-[20px] bg-red-900 dark:bg-red-500/30 z-0" />
        </motion.div>
      )}
    </AnimatePresence>
  );
};
