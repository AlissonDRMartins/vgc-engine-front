"use client";

import { useTeamContext } from "@/app/teams/[id]/context/team-context";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { PokemonNatureEnum } from "@/types/pokemon";
import { formatApiName } from "@/utils/format";
import { natureMatrix, natureModifiers } from "@/utils/nature";
import { ArrowRight, ArrowDown } from "lucide-react";
import { useState } from "react";

export const Nature = () => {
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const { updateMember, pokemonSelected } = useTeamContext();

  const handleSelect = (nature: PokemonNatureEnum) => {
    if (!pokemonSelected) return;
    updateMember(pokemonSelected.indexTeam, (prev) => ({
      ...prev,
      nature,
    }));
  };

  const nature = pokemonSelected?.nature || "";
  const statUp = nature ? natureModifiers[nature]?.up : null;
  const statDown = nature ? natureModifiers[nature]?.down : null;

  return (
    <div>
      <Tooltip>
        <TooltipTrigger asChild>
          <div
            className="flex pl-8 pr-5 rounded-r-md bg-black text-white justify-center items-end cursor-pointer gap-2"
            style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 10% 100%)" }}
            onClick={() => setIsDialogOpen(true)}
          >
            <span>Nature:</span>
            <span className="text-muted-foreground">
              {formatApiName(nature)}
            </span>
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <span>Click to change</span>
        </TooltipContent>
      </Tooltip>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <div
            className="bg-black dark:bg-red-500/30 shadow-2xl w-[90%] md:w-full p-1 px-4 pr-6 flex items-center justify-between -ml-6 relative"
            style={{
              clipPath: "polygon(0 0, calc(100% - 17px) 0, 100% 100%, 0 100%)",
            }}
          >
            <span className="text-white">Nature</span>
            <div
              className="bg-red-500/30 h-full absolute right-0 w-[40px] hidden dark:block"
              style={{
                clipPath: "polygon(0 0, 100% 0, 100% 100%, 18px 100%)",
              }}
            />
          </div>
          <DialogHeader className="hidden">
            <DialogTitle></DialogTitle>
          </DialogHeader>

          <div className="flex flex-col">
            <div className="w-full flex gap-2 text-muted-foreground items-center justify-center">
              <ArrowRight className="w-4 h-4" />
              <span className="text-sm">Positive</span>
            </div>
            <div className="flex">
              <div className="flex flex-col gap-2 text-muted-foreground items-center justify-center">
                <ArrowDown className="w-4 h-4" />
                <span className="text-sm inline-block [writing-mode:vertical-lr]">
                  Negative
                </span>
              </div>
              <div className="w-full flex flex-col">
                <div className="flex justify-between w-full">
                  <div className="w-full h-10 flex justify-center items-center border-b" />
                  {natureMatrix.map(([stat]) => (
                    <span
                      key={stat}
                      className={`w-full h-10 flex justify-center items-center border-b border-l capitalize ${
                        statUp === stat ? "bg-green-200 dark:bg-green-800" : ""
                      }`}
                    >
                      {formatApiName(stat)}
                    </span>
                  ))}
                </div>

                {natureMatrix.map(([stat, names]) => (
                  <div className="flex justify-between w-full" key={stat}>
                    <span
                      className={`w-full h-10 flex justify-center items-center capitalize ${
                        statDown === stat ? "bg-red-200 dark:bg-red-800" : ""
                      }`}
                    >
                      {formatApiName(stat)}
                    </span>

                    {names.map((natureName) => {
                      const isActive = nature === natureName;
                      return (
                        <span
                          key={natureName}
                          className={`w-full h-10 text-sm text-muted-foreground hover:bg-stone-200 dark:hover:bg-stone-800 cursor-pointer flex justify-center items-center border-l capitalize ${
                            isActive ? "bg-stone-300 dark:bg-stone-900" : ""
                          }`}
                          onClick={() =>
                            handleSelect(PokemonNatureEnum[natureName])
                          }
                        >
                          {natureName}
                        </span>
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
