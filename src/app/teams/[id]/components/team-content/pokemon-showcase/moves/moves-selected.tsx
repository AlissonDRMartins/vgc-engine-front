"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useTeamContext } from "@/app/teams/[id]/context/team-context";
import { formatApiName } from "@/utils/format";
import { PokemonTypeItem } from "@/components/pokemon/type";
import { useEffect, useState } from "react";

export const MovesSelected = () => {
  const { pokemonSelected } = useTeamContext();
  const [windowWidth, setWindowWidth] = useState({ width: window.innerWidth });

  useEffect(() => {
    const handleResize = () => setWindowWidth({ width: window.innerWidth });
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="flex w-full md:h-[200px] items-center justify-center mt-8 md:mt-0 px-6 md:px-10">
      <div className="flex flex-col gap-1 w-full">
        <AnimatePresence mode="sync">
          {pokemonSelected?.moves?.map((move, index) => {
            return (
              <motion.div
                key={move.name + index}
                whileHover={{ scale: 1.025 }}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="w-full bg-stone-200 dark:text-black flex items-center rounded-full justify-between h-full overflow-hidden"
              >
                <span className="capitalize text-sm m-2 pl-3">
                  {formatApiName(move.name)}
                </span>
                <div className="flex gap-1 justify-end w-[50%] max-w-[160px] h-[36px]">
                  <PokemonTypeItem
                    pokemonType={[move.type]}
                    arceusIcon={windowWidth.width >= 1150}
                  />
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
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
};
