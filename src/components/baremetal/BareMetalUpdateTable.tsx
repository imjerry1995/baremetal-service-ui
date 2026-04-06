"use client";

import { useState } from "react";
import { AgGridReact } from "ag-grid-react";
import { ModuleRegistry, AllCommunityModule, ColDef } from "ag-grid-community";
import { BareMetalHost } from "@/types/bareMetal";
import {
  updateColumnDefs,
  EXPORT_COLUMN_KEYS,
} from "./BareMetalUpdateTable.columns";
import BareMetalSearch from "./BareMetalSearch";
import { useBareMetalGrid } from "@/hooks/useBareMetalGrid";
import { Download, Upload } from "lucide-react";

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

export default function BareMetalUpdateTable({ hosts }: BareMetalTableProps) {
  const {
    search,
    setSearch,
    filterPool,
    setFilterPool,
    filteredHosts,
    handleSearch,
    onGridReady,
    gridApiRef,
  } = useBareMetalGrid(hosts);

  const [selectedRows, setSelectedRows] = useState<BareMetalHost[]>([]);

  function handleExport() {
    gridApiRef.current?.exportDataAsCsv({
      onlySelected: true,
      columnKeys: EXPORT_COLUMN_KEYS,
      fileName: `baremetal-update-${new Date().toISOString().slice(0, 10)}.csv`,
    });
  }

  return (
    <div className="flex flex-col h-full">
      {/* Topbar */}
      <div className="flex items-center gap-2 px-4 h-[52px] border-b border-gray-200 shrink-0 bg-white">
        <span className="text-sm font-medium text-gray-900 whitespace-nowrap">
          Update
        </span>
        <div className="w-px h-4 bg-gray-200 shrink-0" />

        <BareMetalSearch
          search={search}
          onSearchChange={setSearch}
          filterPool={filterPool}
          onFilterPoolChange={setFilterPool}
          onSearch={handleSearch}
        />

        <div className="flex-1" />

        {selectedRows.length > 0 && (
          <span className="text-xs text-gray-500 shrink-0">
            {selectedRows.length} 台已選取
          </span>
        )}

        <button
          onClick={handleExport}
          disabled={selectedRows.length === 0}
          className="h-8 px-3 text-xs font-medium border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 flex items-center gap-1.5 shrink-0 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <Download className="w-3.5 h-3.5" />
          Export CSV
        </button>

        <button className="h-8 px-3 text-xs font-medium bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-1.5 shrink-0">
          <Upload className="w-3.5 h-3.5" />
          Import CSV
        </button>
      </div>

      {/* Table */}
      <div className="flex-1 ag-theme-quartz">
        <AgGridReact
          rowData={filteredHosts}
          columnDefs={updateColumnDefs}
          defaultColDef={defaultColDef}
          rowSelection={{
            mode: "multiRow",
            checkboxes: true,
            headerCheckbox: true,
            enableClickSelection: false,
          }}
          onSelectionChanged={(e) => setSelectedRows(e.api.getSelectedRows())}
          paginationPageSize={50}
          paginationPageSizeSelector={[10, 25, 50, 100]}
          onGridReady={onGridReady}
          enableCellTextSelection={true}
        />
      </div>
    </div>
  );
}
