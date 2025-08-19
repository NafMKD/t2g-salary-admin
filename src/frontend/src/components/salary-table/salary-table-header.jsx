"use client";

import { Search } from "lucide-react";

export default function SalaryTableHeader({ meta, load, search, setSearch }) {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between mb-4 gap-3">
      <div className="flex items-center gap-2">
        <label className="text-sm text-gray-600">Show</label>
        <select
          className="rounded-lg border border-blue-100 text-sm px-2 py-1 focus:outline-none focus:ring-1 focus:ring-blue-100"
          onChange={(e) => load(1, Number(e.target.value))}
          defaultValue={meta.per_page || 10}
        >
          {[10, 25, 50].map((n) => (
            <option key={n} value={n}>
              {n}
            </option>
          ))}
        </select>
        <span className="text-sm text-gray-600">entries</span>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
        <input
          type="text"
          placeholder="Search..."
          className="w-full border rounded-lg border-gray-300 pl-9 px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-100"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
    </div>
  );
}
