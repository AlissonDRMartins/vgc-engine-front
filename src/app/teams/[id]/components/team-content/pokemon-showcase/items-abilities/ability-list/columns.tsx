import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AbilityDetail } from "@/types/pokemon";
import { formatApiName } from "@/utils/format";
import { ColumnDef } from "@tanstack/react-table";
import dynamic from "next/dynamic";

const Drawer = dynamic(() =>
  import("@/components/ui/drawer").then((m) => m.Drawer)
);
const DrawerTrigger = dynamic(() =>
  import("@/components/ui/drawer").then((m) => m.DrawerTrigger)
);
const DrawerContent = dynamic(() =>
  import("@/components/ui/drawer").then((m) => m.DrawerContent)
);
const DrawerHeader = dynamic(() =>
  import("@/components/ui/drawer").then((m) => m.DrawerHeader)
);
const DrawerTitle = dynamic(() =>
  import("@/components/ui/drawer").then((m) => m.DrawerTitle)
);
const ArrowUp = dynamic(() => import("lucide-react").then((m) => m.ArrowUp));
const ArrowDown = dynamic(() =>
  import("lucide-react").then((m) => m.ArrowDown)
);

export const ColumnsAbility: ColumnDef<AbilityDetail>[] = [
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
      const { name, isHidden } = cell.row.original;
      return (
        <div className="flex gap-2 items-center">
          <span>{formatApiName(name)}</span>
          {isHidden && <Badge>Hidden</Badge>}
        </div>
      );
    },
  },
  {
    accessorKey: "effect",
    header: "Effect",
    cell: (cell) => {
      const { effect, name } = cell.row.original;
      const shortEffect =
        effect?.length > 60 ? `${effect.slice(0, 60)}...` : effect;

      return (
        <Drawer>
          <DrawerTrigger asChild>
            <Button
              variant="ghost"
              className="max-w-[400px] p-0 w-full flex justify-start truncate text-left hover:!bg-transparent cursor-pointer"
            >
              {shortEffect || "-"}
            </Button>
          </DrawerTrigger>
          <DrawerContent>
            <div className="mx-auto w-full max-w-lg">
              <DrawerHeader className="flex justify-between">
                <DrawerTitle className="-mx-3">
                  <span>{formatApiName(name)}</span>
                </DrawerTitle>
              </DrawerHeader>
              <div className="p-2">
                <h2 className="font-semibold mb-2">Effect Description</h2>
                <p className="text-sm">{effect}</p>
              </div>
            </div>
          </DrawerContent>
        </Drawer>
      );
    },
  },
];
