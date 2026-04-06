import { useState, useMemo, useRef, useCallback } from "react";
import { GridApi } from "ag-grid-community";
import { BareMetalHost } from "@/types/bareMetal";

export function useBareMetalGrid(hosts: BareMetalHost[]) {
  const [search, setSearch] = useState("");
  const [filterPool, setFilterPool] = useState("");
  const gridApiRef = useRef<GridApi | null>(null);

  const filteredHosts = useMemo(
    () =>
      hosts.filter((h) => {
        if (filterPool && h.pool !== filterPool) return false;
        return true;
      }),
    [hosts, filterPool], //hosts 或 filterPool 改變時才重新計算
  );

  const handleSearch = useCallback(() => {
    gridApiRef.current?.setGridOption("quickFilterText", search);
  }, [search]); // 當 search 改變時，handleSearch 才重新建立，確保拿到最新的 search 值。

  const onGridReady = useCallback((params: { api: GridApi }) => {
    gridApiRef.current = params.api;
  }, []);

  return {
    search,
    setSearch,
    filterPool,
    setFilterPool,
    filteredHosts,
    gridApiRef,
    handleSearch,
    onGridReady,
  };
}
