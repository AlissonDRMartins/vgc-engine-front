import { Dispatch, SetStateAction } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Table } from "@tanstack/react-table";
import { Button } from "./ui/button";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";

interface PaginationControl<T> {
  pageSize: number;
  setPageSize: Dispatch<SetStateAction<number>>;
  pageIndex: number;
  setPageIndex: Dispatch<SetStateAction<number>>;
  table: Table<T>;
}

export const PaginationControl = <T,>({
  pageSize,
  setPageSize,
  pageIndex,
  setPageIndex,
  table,
}: PaginationControl<T>) => {
  return (
    <div className="flex flex-col md:flex-row gap-4 p-4">
      <div className="flex w-full justify-start items-center gap-2">
        <span className="text-sm text-muted-foreground">Rows per page:</span>
        <Select
          value={pageSize.toString()}
          onValueChange={(e) => {
            const newSize = Number(e);
            setPageSize(newSize);
            table.setPageSize(newSize);
          }}
        >
          <SelectTrigger className="w-[80px] !h-[30px]">
            <SelectValue defaultValue={pageSize} />
          </SelectTrigger>
          <SelectContent>
            {[5, 10, 20, 30, 50].map((size) => (
              <SelectItem key={size} value={size.toString()}>
                {size}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-center gap-2 w-full justify-center md:justify-end">
        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8"
          onClick={() => {
            table.setPageIndex(0);
            setPageIndex(0);
          }}
          disabled={!table.getCanPreviousPage()}
        >
          <ChevronsLeft className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8"
          onClick={() => {
            table.previousPage();
            setPageIndex((old) => Math.max(old, 0));
          }}
          disabled={!table.getCanPreviousPage()}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <span className="text-xs text-muted-foreground flex gap-1 items-center">
          Page{" "}
          <Select
            value={String(pageIndex + 1)}
            onValueChange={(e) => {
              const value = e ? Number(e) - 1 : 0;
              table.setPageIndex(value);
              setPageIndex(value);
            }}
          >
            <SelectTrigger className="h-8 px-2 text-xs w-14">
              <SelectValue defaultValue={pageIndex} />
            </SelectTrigger>
            <SelectContent>
              {Array.from({ length: table.getPageCount() }).map((_, index) => (
                <SelectItem
                  key={index}
                  value={String(index + 1)}
                  className="text-xs"
                >
                  {index + 1}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>{" "}
          of {table.getPageCount()}
        </span>
        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8"
          onClick={() => {
            table.nextPage();
            setPageIndex((old) => old);
          }}
          disabled={!table.getCanNextPage()}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8"
          onClick={() => {
            const lastPage = table.getPageCount() - 1;
            table.setPageIndex(lastPage);
            setPageIndex(lastPage);
          }}
          disabled={!table.getCanNextPage()}
        >
          <ChevronsRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};
