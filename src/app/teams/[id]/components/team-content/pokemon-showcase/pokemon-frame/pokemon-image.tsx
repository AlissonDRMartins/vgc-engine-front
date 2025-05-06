"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useBuilderContext } from "../context/builder-context";
import { Skeleton } from "@/components/ui/skeleton";
import { HelpCircle } from "lucide-react";
import { useEffect, useState } from "react";
import Image from "next/image";
import { formatApiName, formatToCamelCase } from "@/utils/format";
import { useTeamContext } from "@/app/teams/[id]/context/team-context";
import { ItemNameCell } from "../items-abilities/items-list/columns";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export const PokemonImage = ({
  pokemonName: name,
}: {
  pokemonName: string;
}) => {
  const [imgSrc, setImgSrc] = useState<string | null>(null);
  const [hasError, setHasError] = useState(false);
  const { pokeData } = useBuilderContext();
  const { pokemonSelected } = useTeamContext();

  useEffect(() => {
    if (name !== "Not found") {
      setImgSrc(`/gifs/${formatToCamelCase(name)}.gif`);
      setHasError(false);
    }
  }, [name]);

  const sprite =
    pokeData?.sprites.other["official-artwork"].front_default ??
    pokeData?.sprites.front_default;
  const fallbackImage = sprite || "/placeholder.png";
  const imageSource = imgSrc && !hasError ? imgSrc : fallbackImage;

  return (
    <AnimatePresence mode="wait">
      {pokeData ? (
        <motion.div
          key={imageSource}
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 5 }}
          className="w-full flex justify-center items-center relative"
        >
          {imageSource !== "/placeholder.png" ? (
            <Image
              key={imageSource}
              src={imageSource}
              width={240}
              height={240}
              alt={formatApiName(name)}
              className="w-52 h-52 object-contain"
              priority
              unoptimized
              onError={() => {
                setHasError(true);
              }}
            />
          ) : (
            <EmptyImageSkeleton />
          )}
          {pokemonSelected?.item && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="absolute bottom-0 w-[70px] transition-all duration-300 ease-in-out left-0 md:-left-10 hover:left-0"
            >
              <TooltipProvider>
                <Tooltip delayDuration={200}>
                  <TooltipTrigger asChild>
                    <div
                      className="relative w-full bg-black overflow-hidden"
                      style={{
                        clipPath: "polygon(0 0, 80% 0, 100% 100%, 0 100%)",
                      }}
                    >
                      <ItemNameCell
                        name={pokemonSelected.item}
                        onlyIcon
                        className="w-6 h-6"
                      />

                      <div
                        className="absolute top-0 right-0 h-full bg-stone-800 w-[30px]"
                        style={{
                          clipPath: "polygon(0 0, 100% 0, 100% 100%, 45% 100%)",
                        }}
                      />
                    </div>
                  </TooltipTrigger>
                  <TooltipContent side="right">
                    <span>Hold: {formatApiName(pokemonSelected.item)}</span>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </motion.div>
          )}
        </motion.div>
      ) : (
        <EmptyImageSkeleton />
      )}
    </AnimatePresence>
  );
};

const EmptyImageSkeleton = () => {
  return (
    <Skeleton className="w-52 h-52 rounded-md flex flex-col items-center justify-center gap-2 animate-pulse bg-muted/40">
      <HelpCircle className="w-12 h-12 text-muted-foreground opacity-50" />
      <span className="text-sm text-muted-foreground opacity-70">
        Unknown Pokémon
      </span>
    </Skeleton>
  );
};
