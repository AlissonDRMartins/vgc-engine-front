import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ItemDetail } from "@/types/pokemon";
import { Table } from "@tanstack/react-table";
import { FilterX } from "lucide-react";

interface ItemsFiltersProps {
  table: Table<ItemDetail>;
}

export const ItemsFilters = ({ table }: ItemsFiltersProps) => {
  const clearFilters = () => {
    table.resetColumnFilters();
  };

  const activeFilters = [
    { column: "name", value: table.getColumn("name")?.getFilterValue() },
    { column: "effect", value: table.getColumn("effect")?.getFilterValue() },
    {
      column: "category",
      value: table.getColumn("category")?.getFilterValue(),
    },
  ].filter((filter) => filter.value);

  return (
    <div className="w-full flex justify-between items-center p-2 rounded-md border border-stone-300 dark:border-stone-700 bg-gradient-to-br from-stone-200 to-stone-300 dark:from-stone-800 dark:to-stone-900">
      <div className="flex gap-2 items-center">
        <span className="text-muted-foreground text-sm">Filters:</span>
        <Input
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("name")?.setFilterValue(event.target.value)
          }
          className="w-[200px] h-7 bg-stone-100"
          placeholder="Item name"
        />
        <Input
          value={(table.getColumn("effect")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("effect")?.setFilterValue(event.target.value)
          }
          className="w-[200px] h-7 bg-stone-100"
          placeholder="Effect"
        />
      </div>

      {activeFilters.length > 0 && (
        <Button
          variant="outline"
          size="sm"
          onClick={clearFilters}
          className="ml-auto cursor-pointer"
        >
          <FilterX className="w-4 h-4 mr-2" />
          Clear Filters
        </Button>
      )}
    </div>
  );
};
