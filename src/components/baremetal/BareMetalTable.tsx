"use client";

import { useState } from "react";
import { AgGridReact } from "ag-grid-react";
import { BareMetalHost } from "@/types/bareMetal";
import { columnDefs } from "./BareMetalTable.columns";
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

  const filteredHosts = hosts.filter((h) => {
    if (filterPool && h.pool !== filterPool) return false;
    return true;
  });

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
    </div>
  );
}
