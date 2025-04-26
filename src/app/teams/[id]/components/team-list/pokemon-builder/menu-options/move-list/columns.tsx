"use client";

import { motion } from "framer-motion";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { MovesDetail } from "@/types/pokemon";
import { ColumnDef } from "@tanstack/react-table";
import { PokemonTypeItem } from "../../../../../../../../components/pokemon/type";
import { formatApiName } from "@/utils/format";
import { PokemonDamageClasses } from "@/components/pokemon/damage-classes";
import { Button } from "@/components/ui/button";
import { ArrowDown, ArrowUp } from "lucide-react";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { PokemonMoveTarget } from "@/components/pokemon/move-target";

export const moveListColumns: ColumnDef<MovesDetail>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="hover:bg-transparent hover:text-white"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          <span>Name</span>
          {column.getIsSorted() === "asc" ? (
            <ArrowUp />
          ) : column.getIsSorted() === "desc" ? (
            <ArrowDown />
          ) : null}
        </Button>
      );
    },
    cell: (cell) => {
      return (
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          key={cell.row.original.name}
        >
          {formatApiName(cell.row.original.name)}
        </motion.span>
      );
    },
  },
  {
    accessorKey: "type",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="p-1 hover:bg-transparent hover:text-white"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          <span>Type</span>
          {column.getIsSorted() === "asc" ? (
            <ArrowUp />
          ) : column.getIsSorted() === "desc" ? (
            <ArrowDown />
          ) : null}
        </Button>
      );
    },
    cell: (cell) => {
      const type = cell.row.original.type;
      return (
        <div className="w-full flex justify-center">
          <PokemonTypeItem pokemonType={[type]} />
        </div>
      );
    },
  },
  {
    accessorKey: "damage_class",
    header: ({ column }) => {
      return (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                className="p-1 hover:bg-transparent hover:text-white"
                onClick={() =>
                  column.toggleSorting(column.getIsSorted() === "asc")
                }
              >
                <span>DC</span>
                {column.getIsSorted() === "asc" ? (
                  <ArrowUp />
                ) : column.getIsSorted() === "desc" ? (
                  <ArrowDown />
                ) : null}
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <span>Damage Class</span>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      );
    },
    cell: (cell) => {
      const dc = cell.row.original.damage_class;
      return (
        <div className="w-full flex justify-center">
          <PokemonDamageClasses dc={dc} />
        </div>
      );
    },
  },
  {
    accessorKey: "power",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="p-1 hover:bg-transparent hover:text-white"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          <span>Power</span>
          {column.getIsSorted() === "asc" ? (
            <ArrowUp />
          ) : column.getIsSorted() === "desc" ? (
            <ArrowDown />
          ) : null}
        </Button>
      );
    },
    cell: (cell) => {
      const power = cell.row.original.power;
      return (
        <div className="w-full flex justify-center">
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            key={cell.row.original.name}
          >
            {power || "-"}
          </motion.span>
        </div>
      );
    },
  },
  {
    accessorKey: "accuracy",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="p-1 hover:bg-transparent hover:text-white"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          <span>Accuracy</span>
          {column.getIsSorted() === "asc" ? (
            <ArrowUp />
          ) : column.getIsSorted() === "desc" ? (
            <ArrowDown />
          ) : null}
        </Button>
      );
    },
    cell: (cell) => {
      const accuracy = cell.row.original.accuracy;
      return (
        <div className="w-full flex justify-center">
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            key={cell.row.original.name}
          >
            {accuracy || "-"}
          </motion.span>
        </div>
      );
    },
  },
  {
    accessorKey: "pp",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="p-1 hover:bg-transparent hover:text-white"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          <span>PP</span>
          {column.getIsSorted() === "asc" ? (
            <ArrowUp />
          ) : column.getIsSorted() === "desc" ? (
            <ArrowDown />
          ) : null}
        </Button>
      );
    },
    cell: (cell) => {
      const pp = cell.row.original.pp;
      return (
        <div className="w-full flex justify-center">
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            key={cell.row.original.name}
          >
            {pp}
          </motion.span>
        </div>
      );
    },
  },
  {
    accessorKey: "effect_entries",
    header: "Effect",
    cell: (cell) => {
      const {
        effect_entries: effect,
        name,
        accuracy,
        damage_class,
        power,
        pp,
        target,
        type,
      } = cell.row.original;
      if (!effect) {
        return <span>-</span>;
      }

      const shortEffect =
        effect.length > 60 ? `${effect.slice(0, 60)}...` : effect;

      return (
        <Drawer>
          <DrawerTrigger asChild>
            <Button
              variant="ghost"
              className="max-w-[400px] p-0 w-full flex justify-start truncate text-left hover:bg-transparent hover:text-white cursor-pointer"
            >
              {shortEffect}
            </Button>
          </DrawerTrigger>
          <DrawerContent>
            <div className="mx-auto w-full max-w-lg">
              <DrawerHeader className="flex justify-between">
                <DrawerTitle>
                  <div className="w-full flex justify-between items-center">
                    <span className="-ml-2 font-semibold text-lg">
                      {formatApiName(name)}
                    </span>
                    <div className="flex items-center gap-1">
                      <PokemonTypeItem pokemonType={[type]} />
                      <PokemonDamageClasses dc={damage_class} />
                      <PokemonMoveTarget target={target} />
                    </div>
                  </div>
                </DrawerTitle>
              </DrawerHeader>
              <div className="p-2">
                <div className="my-2 pb-6 flex justify-between w-full">
                  <span className="flex gap-1 text-sm">
                    Power: {power || "-"}
                  </span>
                  <span className="flex gap-1 text-sm">
                    Accuracy: {accuracy || "-"}
                  </span>
                  <span className="flex gap-1 text-sm">PP: {pp}</span>
                </div>
                <h2 className="font-semibold mb-2">Effect Description</h2>
                <p className="text-sm">{effect}</p>
              </div>
            </div>
          </DrawerContent>
        </Drawer>
      );
    },
  },
  {
    accessorKey: "target",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="p-1 hover:bg-transparent hover:text-white"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          <span>Target</span>
          {column.getIsSorted() === "asc" ? (
            <ArrowUp />
          ) : column.getIsSorted() === "desc" ? (
            <ArrowDown />
          ) : null}
        </Button>
      );
    },
    cell: (cell) => {
      const target = cell.row.original.target;
      return (
        <div className="w-full flex justify-center">
          <PokemonMoveTarget target={target} />
        </div>
      );
    },
  },
];
