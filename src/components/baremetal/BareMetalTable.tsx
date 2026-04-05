"use client";

import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  flexRender,
  SortingState,
  ColumnFiltersState,
} from "@tanstack/react-table";
import { useState } from "react";
import { Search } from "lucide-react";
import { BareMetalHost } from "@/types/bareMetal";
import { columns } from "./BareMetalTable.columns";
import BareMetalTopbar from "./BareMetalTopbar";

interface BareMetalTableProps {
  hosts: BareMetalHost[];
}

export default function BareMetalTable({ hosts }: BareMetalTableProps) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [openFilters, setOpenFilters] = useState<Record<string, boolean>>({});

  const table = useReactTable({
    data: hosts,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: "includesString", //搜尋的比對方式，includesString 代表只要包含搜尋字串就算符合，不區分大小寫。
    state: {
      sorting,
      columnFilters,
      globalFilter,
    },
  });

  function handleSearch() {
    table.setGlobalFilter(globalFilter);
  }

  function toggleFilter(columnId: string) {
    setOpenFilters((prev) => {
      const isOpen = prev[columnId];
      // 關閉時清除該欄位的 filter 值
      if (isOpen) {
        table.getColumn(columnId)?.setFilterValue(undefined);
      }
      return { ...prev, [columnId]: !isOpen };
    });
  }

  return (
    <div className="flex flex-col h-full">
      <BareMetalTopbar
        totalCount={table.getFilteredRowModel().rows.length}
        search={globalFilter}
        onSearchChange={setGlobalFilter}
        filterPool={(table.getColumn("pool")?.getFilterValue() as string) ?? ""}
        onFilterPoolChange={(value) =>
          table.getColumn("pool")?.setFilterValue(value || undefined)
        }
        onSearch={handleSearch}
      />

      <div className="flex-1 overflow-auto">
        <table className="border-collapse whitespace-nowrap text-xs">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  const isFilterOpen = openFilters[header.column.id] ?? false;
                  const hasFilterValue = !!header.column.getFilterValue();

                  return (
                    <th
                      key={header.id}
                      className="px-3 py-2 text-left font-medium text-gray-400 bg-gray-50 border-b border-gray-200 sticky top-0 z-10"
                    >
                      <div className="flex items-center gap-1">
                        <div
                          className={`flex items-center gap-1 ${
                            header.column.getCanSort()
                              ? "cursor-pointer select-none hover:text-gray-600"
                              : ""
                          }`}
                          onClick={header.column.getToggleSortingHandler()}
                        >
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                          {header.column.getCanSort() && (
                            <span className="text-gray-300">
                              {header.column.getIsSorted() === "asc"
                                ? "↑"
                                : header.column.getIsSorted() === "desc"
                                  ? "↓"
                                  : "↕"}
                            </span>
                          )}
                        </div>
                        {/* 放大鏡按鈕 */}
                        {header.column.getCanFilter() && (
                          <button
                            onClick={() => toggleFilter(header.column.id)}
                            className={`p-0.5 rounded hover:bg-gray-200 transition-colors ${
                              isFilterOpen || hasFilterValue
                                ? "text-blue-500"
                                : "text-gray-300 hover:text-gray-500"
                            }`}
                          >
                            <Search className="w-3 h-3" />
                          </button>
                        )}
                      </div>
                      {/* Filter 輸入框，只在展開時顯示 */}
                      {isFilterOpen && (
                        <input
                          autoFocus
                          type="text"
                          value={
                            (header.column.getFilterValue() as string) ?? ""
                          }
                          onChange={(e) =>
                            header.column.setFilterValue(
                              e.target.value || undefined,
                            )
                          }
                          placeholder="filter..."
                          className="mt-1 w-full h-6 px-2 text-xs border border-gray-200 rounded outline-none focus:border-blue-400 font-normal"
                        />
                      )}
                    </th>
                  );
                })}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getFilteredRowModel().rows.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length}
                  className="px-4 py-10 text-center text-gray-400 text-xs"
                >
                  No hosts found.
                </td>
              </tr>
            ) : (
              table.getFilteredRowModel().rows.map((row) => (
                <tr key={row.id} className="hover:bg-gray-50 cursor-pointer">
                  {row.getVisibleCells().map((cell) => (
                    <td
                      key={cell.id}
                      className="px-3 py-2.5 border-b border-gray-100 text-gray-600"
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
