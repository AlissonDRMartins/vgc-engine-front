"use client";

import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Search,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { MovesDetail } from "@/types/pokemon";

interface DataTableProps<TData, TValue> {
  onRowClick?: (data: TData) => void;
  selectedMoves?: string[];
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function MoveDataTable({
  onRowClick,
  selectedMoves,
  columns,
  data,
}: DataTableProps<MovesDetail, unknown>) {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(10);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
      pagination: {
        pageIndex,
        pageSize,
      },
    },
    onPaginationChange: (updater) => {
      if (typeof updater === "function") {
        const newState = updater({ pageIndex, pageSize });
        setPageIndex(newState.pageIndex);
        setPageSize(newState.pageSize);
      } else {
        setPageIndex(updater.pageIndex);
        setPageSize(updater.pageSize);
      }
    },
  });

  return (
    <div className="flex flex-col">
      <div className="flex items-center py-4">
        <div className="relative w-full max-w-sm">
          <Input
            value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
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
      </div>
      <div className="rounded-md border flex flex-col gap-2">
        <Table className="rounded-md">
          <TableHeader className="bg-red-900 dark:bg-red-500/30 rounded-md">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} className="text-white">
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length > 0 ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className={cn(
                    "hover:bg-stone-200 dark:hover:bg-stone-900 hover:cursor-pointer",
                    selectedMoves?.includes((row.original as MovesDetail).name)
                      ? "bg-gradient-to-br from-stone-700 to-stone-900 dark:from-stone-400 dark:to-stone-600 text-white"
                      : ""
                  )}
                  onClick={() => onRowClick?.(row.original)}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        <Separator />
        <div className="flex flex-col md:flex-row gap-4 p-4">
          <div className="flex w-full justify-start items-center gap-2">
            <span className="text-sm text-muted-foreground">
              Rows per page:
            </span>
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
                  {Array.from({ length: table.getPageCount() }).map(
                    (_, index) => (
                      <SelectItem
                        key={index}
                        value={String(index + 1)}
                        className="text-xs"
                      >
                        {index + 1}
                      </SelectItem>
                    )
                  )}
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
      </div>
    </div>
  );
}
