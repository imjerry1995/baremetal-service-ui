"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { navGroups } from "@/constants/navigation";
import { House, Server, SquarePen } from "lucide-react";
import BrandIcon from "@/components/icons/BrandIcon";

const iconMap: Record<string, React.ReactNode> = {
  "/": <House className="w-4 h-4 shrink-0" />,
  "/baremetal/query": <Server className="w-4 h-4 shrink-0" />,
  "/baremetal/update": <SquarePen className="w-4 h-4 shrink-0" />,
};

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-[216px] shrink-0 bg-gray-50 border-r border-gray-200 flex flex-col h-full">
      {/* Brand */}
      <div className="px-3 py-3.5 border-b border-gray-200">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center shrink-0">
            <BrandIcon />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-900 leading-tight">
              BareMetal Portal
            </p>
            <p className="text-xs text-gray-400">Infrastructure</p>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-2 py-2.5 flex flex-col gap-4 overflow-y-auto">
        {navGroups.map((group) => (
          <div key={group.label}>
            <p className="text-[10px] font-medium text-gray-400 uppercase tracking-wider px-2 mb-1">
              {group.label}
            </p>
            <div className="flex flex-col gap-0.5">
              {group.items.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-2 px-2 py-1.5 rounded-lg text-sm transition-colors ${
                    pathname === item.href
                      ? "bg-white text-gray-900 font-medium"
                      : "text-gray-500 hover:bg-white hover:text-gray-900"
                  }`}
                >
                  {iconMap[item.href]}
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </nav>

      {/* Footer */}
      <div className="px-2 py-2 border-t border-gray-200">
        <div className="flex items-center gap-2 px-2 py-1.5 rounded-lg text-gray-500 text-xs cursor-pointer hover:bg-white">
          <div className="w-6 h-6 rounded-full bg-blue-50 flex items-center justify-center text-[10px] font-medium text-blue-700 shrink-0">
            AD
          </div>
          Admin
        </div>
      </div>
    </aside>
  );
}
