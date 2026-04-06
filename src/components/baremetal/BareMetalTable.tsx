"use client";

import { useState, useMemo, useCallback } from "react";
import { AgGridReact } from "ag-grid-react";
import { BareMetalHost } from "@/types/bareMetal";
import { createColumnDefs } from "./BareMetalTable.columns";
import BareMetalTopbar from "./BareMetalTopbar";
import { ModuleRegistry, AllCommunityModule, ColDef } from "ag-grid-community";

ModuleRegistry.registerModules([AllCommunityModule]);

interface BareMetalTableProps {
  hosts: BareMetalHost[];
}

const defaultColDef: ColDef = {
  sortable: true,
  resizable: true,
  filter: true,
  minWidth: 100,
};

export default function BareMetalTable({ hosts }: BareMetalTableProps) {
  const [search, setSearch] = useState("");
  const [filterPool, setFilterPool] = useState("");
  const [selectedHost, setSelectedHost] = useState<BareMetalHost | null>(null);

  // 若不用 useCallback
  // function handleOpenDrawer(host: BareMetalHost) {
  //   setSelectedHost(host);
  // }
  // 但每次元件重新渲染，這個函式都會被重新建立

  const handleOpenDrawer = useCallback((host: BareMetalHost) => {
    setSelectedHost(host);
  }, []); // 空陣列代表沒有依賴，只建立一次，之後都用同一個。

  const handleCloseDrawer = useCallback(() => {
    setSelectedHost(null);
  }, []);

  const columnDefs = useMemo(
    () => createColumnDefs(handleOpenDrawer),
    [handleOpenDrawer],
  );

  // createColumnDefs 每次呼叫都會建立一個新的陣列，包含所有欄位的設定物件。
  // 如果不用 useMemo，每次渲染都重新建立，AG Grid 會以為欄位設定改變了，跟著重新渲染整個表格。
  // 用 useMemo 之後，只有 handleOpenDrawer 改變時才重新建立。

  const filteredHosts = useMemo(
    () =>
      hosts.filter((h) => {
        if (filterPool && h.pool !== filterPool) return false;
        return true;
      }),
    [hosts, filterPool], //hosts 或 filterPool 改變時才重新計算
  );

  function handleSearch() {}

  return (
    <div className="flex flex-col h-full">
      <BareMetalTopbar
        totalCount={filteredHosts.length}
        search={search}
        onSearchChange={setSearch}
        filterPool={filterPool}
        onFilterPoolChange={setFilterPool}
        onSearch={handleSearch}
      />

      <div className="flex flex-1 overflow-hidden">
        <div className="flex-1 ag-theme-quartz">
          <AgGridReact
            rowData={filteredHosts}
            columnDefs={columnDefs}
            defaultColDef={defaultColDef}
            pagination={true}
            paginationPageSize={50}
            paginationPageSizeSelector={[10, 25, 50, 100]}
          />
        </div>
        {/* Drawer 位置，下一步建立 */}
        {selectedHost && (
          <div className="w-80 border-l border-gray-200 bg-white p-4 shrink-0">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-medium text-gray-900">
                {selectedHost.name}
              </span>
              <button
                onClick={handleCloseDrawer}
                className="text-gray-400 hover:text-gray-600 text-lg"
              >
                ✕
              </button>
            </div>
            <p className="text-xs text-gray-400">Drawer 內容即將建立...</p>
          </div>
        )}
      </div>
    </div>
  );
}
