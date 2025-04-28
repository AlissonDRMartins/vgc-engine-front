"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useBuilderContext } from "../context/builder-context";
import { Skeleton } from "@/components/ui/skeleton";
import { HelpCircle } from "lucide-react";
import { useEffect, useState } from "react";
import Image from "next/image";
import { formatApiName } from "@/utils/format";

export const PokemonImage = ({
  pokemonName: name,
}: {
  pokemonName: string;
}) => {
  const [imgSrc, setImgSrc] = useState<string | null>(null);
  const [hasError, setHasError] = useState(false);
  const { pokeData } = useBuilderContext();

  useEffect(() => {
    if (name !== "Not found") {
      setImgSrc(`/gifs/${name}.gif`);
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
          className="w-full flex justify-center items-center"
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
