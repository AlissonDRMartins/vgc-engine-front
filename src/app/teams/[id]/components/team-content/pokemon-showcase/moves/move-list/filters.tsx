import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MovesDetail } from "@/types/pokemon";
import { formatApiName } from "@/utils/format";
import { Table } from "@tanstack/react-table";
import { Filter, FilterX, Search } from "lucide-react";

import dynamic from "next/dynamic";

const PokemonDamageClasses = dynamic(() =>
  import("@/components/pokemon/damage-classes").then(
    (m) => m.PokemonDamageClasses
  )
);
const PokemonMoveTarget = dynamic(() =>
  import("@/components/pokemon/move-target").then((m) => m.PokemonMoveTarget)
);
const PokemonTypeItem = dynamic(() =>
  import("@/components/pokemon/type").then((m) => m.PokemonTypeItem)
);

interface TableFiltersProps {
  table: Table<MovesDetail>;
}

export const TableFilters = ({ table }: TableFiltersProps) => {
  const clearFilters = () => {
    table.resetColumnFilters();
  };

  const activeFilters = [
    { column: "name", value: table.getColumn("name")?.getFilterValue() },
    { column: "type", value: table.getColumn("type")?.getFilterValue() },
    {
      column: "damage_class",
      value: table.getColumn("damage_class")?.getFilterValue(),
    },
    { column: "target", value: table.getColumn("target")?.getFilterValue() },
  ].filter((filter) => filter.value);

  const renderBadgeContent = (column: string, value: string | unknown) => {
    if (!value || typeof value !== "string") return null;

    switch (column) {
      case "type":
        return (
          <PokemonTypeItem pokemonType={[value]} className="w-5 h-5 mx-1" />
        );
      case "damage_class":
        return <PokemonDamageClasses dc={value} className="w-6 h-6" />;
      case "target":
        return <PokemonMoveTarget target={value} className="w-6 h-6" />;
      case "name":
      default:
        return <span className="capitalize">{value}</span>;
    }
  };

  return (
    <Accordion type="single" collapsible>
      <AccordionItem value="filter">
        <AccordionTrigger className="bg-stone-200 hover:bg-stone-300 dark:bg-stone-900 dark:hover:bg-[#24201d] px-4 py-2 mb-2 cursor-pointer">
          <div className="flex gap-3 items-center">
            <div className="flex gap-1 items-center">
              <Filter className="w-4 h-4" />
              <span>Filters</span>
            </div>
            {activeFilters.length > 0 && (
              <div className="flex flex-wrap gap-2 items-center">
                {activeFilters.map((filter) => (
                  <Badge
                    key={filter.column}
                    variant="secondary"
                    className="text-sm capitalize flex items-center gap-1 h-6 md:w-auto"
                  >
                    <span className="text-muted-foreground">
                      {formatApiName(filter.column)}:
                    </span>
                    <div>{renderBadgeContent(filter.column, filter.value)}</div>
                  </Badge>
                ))}
              </div>
            )}
          </div>
        </AccordionTrigger>
        <AccordionContent>
          <Button
            variant="outline"
            size="sm"
            onClick={clearFilters}
            className="ml-auto"
          >
            <FilterX className="w-4 h-4 mr-2" />
            Clear Filters
          </Button>
          <div className="flex flex-wrap items-center gap-4 py-4">
            <div className="relative w-full md:w-[200px]">
              <Input
                value={
                  (table.getColumn("name")?.getFilterValue() as string) ?? ""
                }
                onChange={(event) =>
                  table.getColumn("name")?.setFilterValue(event.target.value)
                }
                className="w-full"
              />
              {!(table.getColumn("name")?.getFilterValue() as string) && (
                <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-muted-foreground">
                  <span className="flex gap-2 text-sm items-center">
                    <Search className="w-5 h-5" />
                    Filter name...
                  </span>{" "}
                </div>
              )}
            </div>

            <Select
              onValueChange={(value) =>
                table.getColumn("type")?.setFilterValue(value)
              }
              value={
                (table.getColumn("type")?.getFilterValue() as string) ?? ""
              }
            >
              <SelectTrigger className="w-full md:w-[160px]">
                <SelectValue placeholder="Filter type" />
              </SelectTrigger>
              <SelectContent>
                {[
                  "normal",
                  "fire",
                  "water",
                  "electric",
                  "grass",
                  "ice",
                  "fighting",
                  "poison",
                  "ground",
                  "flying",
                  "psychic",
                  "bug",
                  "rock",
                  "ghost",
                  "dragon",
                  "dark",
                  "steel",
                  "fairy",
                ].map((type) => (
                  <SelectItem key={type} value={type}>
                    <PokemonTypeItem
                      pokemonType={[type]}
                      arceusIcon
                      className="h-5"
                    />
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select
              onValueChange={(value) =>
                table.getColumn("damage_class")?.setFilterValue(value)
              }
              value={
                (table.getColumn("damage_class")?.getFilterValue() as string) ??
                ""
              }
            >
              <SelectTrigger className="w-full md:w-[160px]">
                <SelectValue placeholder="Filter DC" />
              </SelectTrigger>
              <SelectContent>
                {["physical", "special", "status"].map((dc) => (
                  <SelectItem key={dc} value={dc}>
                    <PokemonDamageClasses dc={dc} className="h-6 w-6" />
                    {formatApiName(dc)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select
              onValueChange={(value) =>
                table.getColumn("target")?.setFilterValue(value)
              }
              value={
                (table.getColumn("target")?.getFilterValue() as string) ?? ""
              }
            >
              <SelectTrigger className="w-full md:w-[200px]">
                <SelectValue placeholder="Filter target" />
              </SelectTrigger>
              <SelectContent>
                {[
                  "all-allies",
                  "all-opponents",
                  "all-other-pokemon",
                  "all-pokemon",
                  "ally",
                  "entire-field",
                  "fainting-pokemon",
                  "opponents-field",
                  "random-opponent",
                  "selected-pokemon",
                  "selected-pokemon-me-first",
                  "specific-move",
                  "user",
                  "user-and-allies",
                  "user-or-ally",
                  "users-field",
                ].map((target) => (
                  <SelectItem key={target} value={target}>
                    <PokemonMoveTarget target={target} className="h-6" />
                    {formatApiName(target)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};
