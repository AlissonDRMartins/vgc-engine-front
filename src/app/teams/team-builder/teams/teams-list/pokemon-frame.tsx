"use client";
import { saveSelectedPokemonIndex } from "@/app/teams/[id]/components/team-list/helpers";
import { Skeleton } from "@/components/ui/skeleton";
import { PokemonInfo, Team } from "@/types/pokemon";
import { motion } from "framer-motion";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import Image from "next/image";
import { useEffect, useState } from "react";

interface PokemonFrameProps {
  index: number;
  member: PokemonInfo;
  router: AppRouterInstance;
  team: Team;
}

export const PokemonFrame = ({
  index,
  member,
  router,
  team,
}: PokemonFrameProps) => {
  const [imgSrc, setImgSrc] = useState<string | null>(null);

  useEffect(() => {
    if (member) setImgSrc(`/gifs/${member.name}.gif`);
  }, [member]);

  return (
    <motion.div
      key={index}
      className={`flex-1 basis-[calc((100%-20px)/6)] ${
        member ? "aspect-square" : ""
      }`}
    >
      <div
        className={`w-full h-full flex items-center justify-center cursor-pointer hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors border rounded-lg ${
          !member ? "hidden" : "flex"
        }`}
        onClick={() => {
          saveSelectedPokemonIndex(team.id, index);
          router.push(`/teams/${team.id}`);
        }}
      >
        {member && (
          <div className="relative flex flex-col gap-2 w-full h-full items-center justify-center">
            {member.sprite || imgSrc !== null || imgSrc ? (
              <Image
                src={imgSrc || "/placeholder.png"}
                width={100}
                height={100}
                alt={member.name}
                className="w-10 h-10 md:w-22 md:h-22 object-contain"
                unoptimized
                onError={() => {
                  if (member.sprite) {
                    setImgSrc(member.sprite);
                  } else {
                    setImgSrc("");
                  }
                }}
              />
            ) : (
              <Skeleton className="w-18 h-18 p-2 rounded-full flex items-center justify-center">
                <span className="text-xs text-stone-500">No Image</span>
              </Skeleton>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
};
