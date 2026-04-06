export default function QueryLoading() {
  return (
    <div className="flex flex-col h-full">
      {/* Topbar 骨架 */}
      <div className="flex items-center gap-2 px-4 h-[52px] border-b border-gray-200 shrink-0 bg-white">
        <div className="w-12 h-4 bg-gray-100 rounded animate-pulse" />
        <div className="w-px h-4 bg-gray-200 shrink-0" />
        <div className="w-80 h-8 bg-gray-100 rounded-lg animate-pulse" />
        <div className="w-24 h-8 bg-gray-100 rounded-lg animate-pulse" />
        <div className="w-20 h-8 bg-gray-100 rounded-lg animate-pulse" />
      </div>

      {/* 載入圈圈 */}
      <div className="flex-1 flex flex-col items-center justify-center gap-3">
        <div className="w-8 h-8 border-2 border-gray-200 border-t-blue-500 rounded-full animate-spin" />
        <span className="text-xs text-gray-400">Loading hosts...</span>
      </div>
    </div>
  );
}
