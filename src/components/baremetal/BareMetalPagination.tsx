"use client";

import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";

interface BareMetalPaginationProps {
  pageIndex: number;
  pageCount: number;
  pageSize: number;
  totalCount: number;
  canPreviousPage: boolean;
  canNextPage: boolean;
  onFirstPage: () => void;
  onPreviousPage: () => void;
  onNextPage: () => void;
  onLastPage: () => void;
  onPageSizeChange: (size: number) => void;
}

const PAGE_SIZE_OPTIONS = [20, 50, 100];

export default function BareMetalPagination({
  pageIndex,
  pageCount,
  pageSize,
  totalCount,
  canPreviousPage,
  canNextPage,
  onFirstPage,
  onPreviousPage,
  onNextPage,
  onLastPage,
  onPageSizeChange,
}: BareMetalPaginationProps) {
  const from = pageIndex * pageSize + 1;
  const to = Math.min((pageIndex + 1) * pageSize, totalCount);

  return (
    <div className="flex items-center justify-between px-4 py-2 border-t border-gray-200 bg-white shrink-0">
      {/* 左側：顯示筆數資訊 */}
      <span className="text-xs text-gray-400">
        顯示 {from} - {to}，共 {totalCount} 筆
      </span>

      {/* 中間：分頁按鈕 */}
      <div className="flex items-center gap-1">
        <button
          onClick={onFirstPage}
          disabled={!canPreviousPage}
          className="w-7 h-7 flex items-center justify-center rounded hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed text-gray-500"
        >
          <ChevronsLeft className="w-3.5 h-3.5" />
        </button>

        <button
          onClick={onPreviousPage}
          disabled={!canPreviousPage}
          className="w-7 h-7 flex items-center justify-center rounded hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed text-gray-500"
        >
          <ChevronLeft className="w-3.5 h-3.5" />
        </button>

        <span className="text-xs text-gray-500 px-2">
          第 {pageIndex + 1} 頁，共 {pageCount} 頁
        </span>

        <button
          onClick={onNextPage}
          disabled={!canNextPage}
          className="w-7 h-7 flex items-center justify-center rounded hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed text-gray-500"
        >
          <ChevronRight className="w-3.5 h-3.5" />
        </button>

        <button
          onClick={onLastPage}
          disabled={!canNextPage}
          className="w-7 h-7 flex items-center justify-center rounded hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed text-gray-500"
        >
          <ChevronsRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* 右側：每頁筆數 */}
      <div className="flex items-center gap-2">
        <span className="text-xs text-gray-400">每頁</span>
        <select
          value={pageSize}
          onChange={(e) => onPageSizeChange(Number(e.target.value))}
          className="h-7 px-2 text-xs border border-gray-200 rounded outline-none focus:border-blue-400 text-gray-600 bg-white cursor-pointer"
        >
          {PAGE_SIZE_OPTIONS.map((size) => (
            <option key={size} value={size}>
              {size} 筆
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
