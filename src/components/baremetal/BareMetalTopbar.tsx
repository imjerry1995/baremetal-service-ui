"use client";

import BareMetalSearch from "./BareMetalSearch";

interface BareMetalTopbarProps {
  totalCount: number;
  search: string;
  onSearchChange: (value: string) => void;
  filterPool: string;
  onFilterPoolChange: (value: string) => void;
  onSearch: () => void;
}

export default function BareMetalTopbar({
  totalCount,
  search,
  onSearchChange,
  filterPool,
  onFilterPoolChange,
  onSearch,
}: BareMetalTopbarProps) {
  return (
    <div className="flex items-center gap-2 px-4 h-[52px] border-b border-gray-200 shrink-0 bg-white">
      <span className="text-sm font-medium text-gray-900 whitespace-nowrap">
        Query
      </span>
      <div className="w-px h-4 bg-gray-200 shrink-0" />

      <BareMetalSearch
        search={search}
        onSearchChange={onSearchChange}
        filterPool={filterPool}
        onFilterPoolChange={onFilterPoolChange}
        onSearch={onSearch}
      />

      <div className="flex-1" />
      <span className="text-xs text-gray-400 shrink-0">{totalCount} hosts</span>
    </div>
  );
}
