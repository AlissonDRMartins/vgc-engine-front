"use client";

import { AnimatePresence, motion } from "framer-motion";
import { PokemonInfo, Team } from "@/types/pokemon";
import { useEffect, useState } from "react";
import { PokeService } from "@/services/poke";
import { PokemonInfoApi } from "@/types/poke-api";
import { PokemonFrame } from "./pokemon-frame";
import { CarouselApi } from "@/components/ui/carousel";
import { MenuOptions } from "./menu-options";
import { MoveList } from "./menu-options/move-list";
import { MovesSelected } from "./menu-options/move-list/move-selected";

interface PokemonBuilderProps {
  team: Team;
  pokemonSelected: PokemonInfo | null;
  updateMember: (index: number, pokemon: PokemonInfo) => void;
}

export const PokemonBuilder = ({
  team,
  pokemonSelected,
}: PokemonBuilderProps) => {
  const [pokedata, setPokedata] = useState<PokemonInfoApi | null>(null);
  const [carouselApi, setCarouselApi] = useState<CarouselApi>();
  const [currentIndex, setCurrentIndex] = useState(0);

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
                <div className="w-full flex justify-center my-3 md:my-0">
                  {currentIndex === 0 ? (
                    <MovesSelected pokemonSelected={pokemonSelected} />
                  ) : (
                    <div></div>
                  )}
                </div>
              </MenuOptions>
              <div className="md:mt-3 col-span-4">
                {currentIndex === 0 ? (
                  <MoveList
                    moveList={
                      pokedata?.moves.map((moves) => moves.move.name) || []
                    }
                    teamMoveLists={team.members.map((member) =>
                      member.moves.map((move) => move.name)
                    )}
                    selectedPokemonIndex={team.members.findIndex(
                      (member) => member.indexTeam === pokemonSelected.indexTeam
                    )}
                  />
                ) : (
                  <div></div>
                )}
              </div>
            </div>
          </div>

          <div
            className="absolute w-[150%] md:w-[55%] h-[370px] md:h-[320px] left-0 top-0 bg-red-900 dark:bg-red-500/30 z-0"
            style={{
              clipPath: "polygon(0 0, calc(100% - 130px) 0, 100% 100%, 0 100%)",
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};
