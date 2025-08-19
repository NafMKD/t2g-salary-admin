"use client";

import { Loader2 } from "lucide-react";
import SalaryRow from "./salary-row";

export default function SalaryTableBody({
  rows,
  loading,
  editRow,
  setEditRow,
  editValues,
  setEditValues,
  saveRow,
  saveLoading,
  setShowDelete,
}) {
  return (
    <div className="overflow-x-auto rounded-lg border border-gray-200">
      <table className="min-w-full text-sm">
        <thead className="bg-gray-50 text-gray-600 text-xs uppercase">
          <tr>
            <th className="p-3 text-left">Name</th>
            <th className="p-3 text-left">Email</th>
            <th className="p-3 text-right">Local Salary</th>
            <th className="p-3 text-right">Euro Salary</th>
            <th className="p-3 text-right">Commission</th>
            <th className="p-3 text-right">Displayed</th>
            <th className="p-3 text-center">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {loading ? (
            <tr>
              <td colSpan={7} className="py-6 text-center">
                <Loader2 className="mx-auto h-5 w-5 animate-spin text-gray-500" />
              </td>
            </tr>
          ) : rows.length > 0 ? (
            rows.map((r) => (
              <SalaryRow
                key={r.id}
                row={r}
                editRow={editRow}
                setEditRow={setEditRow}
                editValues={editValues}
                setEditValues={setEditValues}
                saveRow={saveRow}
                saveLoading={saveLoading}
                setShowDelete={setShowDelete}
              />
            ))
          ) : (
            <tr>
              <td colSpan={7} className="py-6 text-center text-gray-500">
                No data found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
