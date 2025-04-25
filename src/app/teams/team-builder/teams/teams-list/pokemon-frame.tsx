"use client";
import { PokemonInfo, Team } from "@/types/pokemon";
import { motion } from "framer-motion";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import Image from "next/image";

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
          router.push(`/teams/${team.id}`);
        }}
      >
        {member && (
          <div className="relative flex flex-col gap-2 w-full h-full items-center justify-center">
            <span className="capitalize text-sm absolute left-1/2 -translate-x-1/2 top-0 hidden md:block">
              {member.name}
            </span>
            {member.sprite ? (
              <Image
                src={member.sprite}
                width={100}
                height={100}
                alt={member.name}
                className="w-10 h-10 md:w-20 md:h-20 object-contain"
              />
            ) : (
              <div className="w-16 h-16 bg-stone-200 dark:bg-stone-700 rounded-full flex items-center justify-center">
                <span className="text-sm text-stone-500">No Image</span>
              </div>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
};
