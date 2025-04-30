"use client";

import { AnimatePresence } from "framer-motion";
import { PokebuilderCard } from "./components/pokebuilder-card";
import { PokemonFrame } from "./pokemon-frame";
import { usePokeData } from "./hook/usePokeData";
import { BuilderProvider } from "./context/builder-context";
import { ShowcaseMenu } from "./showcase-menu";
import { MoveList } from "./moves/move-list";
import { useMenuContext } from "./context/menu-context";
import { StatsModifier } from "./base-stats/stats-modifier";
import { ItemsAbilities } from "./items-abilities";

export const PokemonShowcase = () => {
  const { pokeData } = usePokeData();
  const { currentIndex } = useMenuContext();

  return (
    <BuilderProvider value={{ pokeData }}>
      <div className="w-full md:w-[70%] flex items-center justify-center">
        <AnimatePresence mode="wait">
          <PokebuilderCard>
            <div className="flex flex-col gap-2">
              <div className="flex flex-col md:flex-row gap-2 w-full">
                <PokemonFrame />
                <ShowcaseMenu />
              </div>
              <div>
                {currentIndex === 0 ? (
                  <MoveList />
                ) : currentIndex === 1 ? (
                  <StatsModifier />
                ) : currentIndex === 2 ? (
                  <ItemsAbilities />
                ) : (
                  <div></div>
                )}
              </div>
            </div>
          </PokebuilderCard>
        </AnimatePresence>
      </div>
    </BuilderProvider>
  );
};
