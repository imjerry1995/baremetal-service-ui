"use client";

import { BareMetalHost } from "@/types/bareMetal";
import { columns } from "./BareMetalTable.columns";

// typescript interface 宣告型別
interface BareMetalTableProps {
  hosts: BareMetalHost[];
}

// 傳入 host
export default function BareMetalTable({ hosts }: BareMetalTableProps) {
  return (
    <div className="overflow-auto">
      <table className="border-collapse whitespace-nowrap text-xs">
        <thead>
          <tr>
            {columns.map((col) => (
              <th
                key={col.header}
                className="px-3 py-2 text-left font-medium text-gray-400 bg-gray-50 border-b border-gray-200 sticky top-0"
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {hosts.map((host) => (
            <tr key={host.name} className="hover:bg-gray-50">
              {columns.map((col) => (
                <td
                  key={col.header}
                  className="px-3 py-2.5 border-b border-gray-100 text-gray-600"
                >
                  {col.render(host)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
