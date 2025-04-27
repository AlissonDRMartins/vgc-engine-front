import { PokemonInfoApi } from "@/types/poke-api";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { PokemonTypeItem } from "../../../../../../components/pokemon/type";
import { formatApiName } from "@/utils/format";

interface PokemonFrameProps {
  pokedata: PokemonInfoApi | null;
}

export const PokemonFrame = ({ pokedata }: PokemonFrameProps) => {
  const sprite =
    pokedata?.sprites.other["official-artwork"].front_default ??
    pokedata?.sprites.front_default;
  const types: string[] = pokedata?.types.map((type) => type.type.name) || [];
  const name = pokedata?.name ?? "Not found";

  return (
    <div className="flex flex-col gap-4 col-span-4 md:col-span-2 my-4">
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
        <PokemonTypeItem pokemonType={types} />
      </div>
      <AnimatePresence mode="wait">
        {sprite ? (
          <motion.div
            key={sprite}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 5 }}
            className="w-full flex justify-center items-center"
          >
            <Image
              src={`/gifs/${name}.gif`}
              width={240}
              height={240}
              alt={formatApiName(name)}
              unoptimized
              className="w-52 h-52 object-contain"
              rel="preload"
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
