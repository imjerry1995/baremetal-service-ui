"use client";

import { Search } from "lucide-react";

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
      {/* 頁面標題 */}
      <span className="text-sm font-medium text-gray-900 whitespace-nowrap">
        Query
      </span>

      {/* 分隔線 */}
      <div className="w-px h-4 bg-gray-200 shrink-0" />

      {/* Pool filter */}
      <select
        value={filterPool}
        onChange={(e) => onFilterPoolChange(e.target.value)}
        className="h-8 px-2 pr-7 text-xs border border-gray-200 rounded-lg outline-none focus:border-blue-400 text-gray-600 bg-white appearance-none cursor-pointer shrink-0"
      >
        <option value="">All Pool</option>
        <option value="F12">F12</option>
        <option value="F14">F12</option>
        <option value="F15">F15</option>
        <option value="F18">F18</option>
        <option value="F23">F23</option>
      </select>

      {/* 搜尋欄 */}
      <div className="relative w-80 shrink-0">
        <svg
          className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400 pointer-events-none"
          viewBox="0 0 14 14"
          fill="none"
        >
          <circle
            cx="6"
            cy="6"
            r="4.2"
            stroke="currentColor"
            strokeWidth="1.3"
          />
          <path
            d="M9.5 9.5L12.5 12.5"
            stroke="currentColor"
            strokeWidth="1.3"
            strokeLinecap="round"
          />
        </svg>
        <input
          type="text"
          placeholder="Search hostname/SN/PO Number/IP/MAC..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full h-8 pl-7 pr-3 text-xs border border-gray-200 rounded-lg outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-50 text-gray-900 placeholder:text-gray-400"
        />
      </div>

      {/* Search 按鈕 */}
      <button
        onClick={onSearch}
        className="h-8 px-3 text-xs font-medium bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-1.5 shrink-0"
      >
        <Search className="w-3.5 h-3.5" />
        Search
      </button>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Host count */}
      <span className="text-xs text-gray-400 shrink-0">{totalCount} hosts</span>
    </div>
  );
}
