"use client";

import { motion } from "framer-motion";
import { formatApiName } from "@/utils/format";
import { useAnalysisList } from "./hook/useAnalysisList";
import { PokemonTypeItem } from "@/components/pokemon/type";
import { ItemNameCell } from "../items-abilities/items-list/columns";
import { Plus } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";

export const AnalysisList = () => {
  const { analysisList, isLoading } = useAnalysisList();

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="flex flex-col gap-2 mt-4 px-4 lg:px-0 justify-center items-center">
      {analysisList.length > 0 &&
        analysisList.map((poke, index) => (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2, delay: index * 0.1 }}
            key={index}
            className={`relative w-full h-[36px] flex justify-between items-center bg-stone-200 dark:bg-stone-900 rounded-md shadow-md px-2 py-1`}
          >
            <div className="flex gap-2 items-center h-full">
              <PokemonTypeItem pokemonType={poke.typing} />
              <span>{formatApiName(poke.name)}</span>
            </div>

            <div className="flex gap-1 items-center h-full">
              {poke.items.slice(0, 3).map((item, index) => (
                <TooltipProvider key={index}>
                  <Tooltip delayDuration={0}>
                    <TooltipTrigger>
                      <ItemNameCell name={item.name} onlyIcon />
                    </TooltipTrigger>
                    <TooltipContent>
                      <div className="flex gap-2 items-center">
                        <span className="text-sm">
                          {formatApiName(item.name)}
                        </span>
                        <Badge className="bg-white dark:bg-black">
                          <span className="text-muted-foreground dark:text-white">
                            Usage:{` ${item.usage}%`}
                          </span>
                        </Badge>
                      </div>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              ))}
              {poke.items.length > 3 && (
                <TooltipProvider>
                  <Tooltip delayDuration={0}>
                    <TooltipTrigger asChild>
                      <Plus className="h-4 w-4" />
                    </TooltipTrigger>
                    <TooltipContent side="left" sideOffset={10}>
                      <div className="flex gap-1">
                        {poke.items.slice(3).map((item, index) => (
                          <ItemNameCell key={index} name={item.name} onlyIcon />
                        ))}
                      </div>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              )}
            </div>
          </motion.div>
        ))}
    </div>
  );
};
