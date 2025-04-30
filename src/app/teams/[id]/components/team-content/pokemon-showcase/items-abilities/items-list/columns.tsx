import { Button } from "@/components/ui/button";
import { ItemDetail } from "@/types/pokemon";
import { formatApiName } from "@/utils/format";
import { removeDashes } from "@/utils/remove-dashes";
import { ColumnDef } from "@tanstack/react-table";
import { HelpCircle } from "lucide-react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useEffect, useState } from "react";

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

export const ColumnsItem: ColumnDef<ItemDetail>[] = [
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
      const name = cell.row.original.name;
      return <ItemNameCell name={name} />;
    },
  },
  {
    accessorKey: "effect",
    header: "Effect",
    cell: (cell) => {
      const { effect, name, category } = cell.row.original;
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
                  <ItemNameCell name={name} />
                </DrawerTitle>
              </DrawerHeader>
              <div className="p-2">
                <div className="my-2 pb-6 flex justify-between w-full">
                  <span className="flex gap-1 text-sm">
                    Category: {formatApiName(category || "") || "-"}
                  </span>
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
    accessorKey: "category",
    header: ({ column }) => {
      return (
        <div className="w-full flex justify-center">
          <Button
            variant="ghost"
            className="p-1 hover:bg-transparent hover:text-white"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            <span>Category</span>
            {column.getIsSorted() === "asc" ? (
              <ArrowUp />
            ) : column.getIsSorted() === "desc" ? (
              <ArrowDown />
            ) : null}
          </Button>
        </div>
      );
    },
    cell: (cell) => {
      return (
        <span>{formatApiName(cell.row.original.category || "") || "-"}</span>
      );
    },
  },
];

export const ItemNameCell = ({ name }: { name: string }) => {
  const [hasError, setHasError] = useState(false);
  const url = `https://www.serebii.net/itemdex/sprites/${removeDashes(
    name
  )}.png`;

  useEffect(() => {
    const img = new window.Image();
    img.src = url;

    img.onload = () => setHasError(false);
    img.onerror = () => setHasError(true);
  }, [url]);

  return (
    <div className="flex gap-1 items-center">
      <div className="w-8 h-8 flex justify-center items-center" key={name}>
        {!hasError ? (
          <Image
            src={url}
            alt={name}
            width={192}
            height={192}
            unoptimized
            className="w-8 h-8"
            onError={() => setHasError(true)}
          />
        ) : (
          <HelpCircle className="w-5 h-5 text-muted-foreground" />
        )}
      </div>
      <span>{formatApiName(name)}</span>
    </div>
  );
};
