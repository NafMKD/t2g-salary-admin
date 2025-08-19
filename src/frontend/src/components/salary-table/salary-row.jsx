"use client";

import { Edit, Save, Loader2, Trash2 } from "lucide-react";

export default function SalaryRow({
  row,
  editRow,
  setEditRow,
  editValues,
  setEditValues,
  saveRow,
  saveLoading,
  setShowDelete,
}) {
  return (
    <tr className="hover:bg-gray-50 transition">
      <td className="p-3">{row.name}</td>
      <td className="p-3">{row.email}</td>
      <td className="p-3 text-right">
        {editRow === row.id ? (
          <input
            type="number"
            className="w-28 rounded-md border border-gray-200 bg-white px-3 py-1.5 text-right text-sm shadow-sm focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-200"
            value={editValues.salaryLocal}
            onChange={(e) =>
              setEditValues((s) => ({ ...s, salaryLocal: e.target.value }))
            }
          />
        ) : (
          row.salary_local
        )}
      </td>
      <td className="p-3 text-right">
        {editRow === row.id ? (
          <input
            type="number"
            className="w-28 rounded-md border border-gray-200 bg-white px-3 py-1.5 text-right text-sm shadow-sm focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-200"
            value={editValues.salaryEuros}
            onChange={(e) =>
              setEditValues((s) => ({ ...s, salaryEuros: e.target.value }))
            }
          />
        ) : (
          row.salary_euros
        )}
      </td>
      <td className="p-3 text-right">
        {editRow === row.id ? (
          <input
            type="number"
            className="w-28 rounded-md border border-gray-200 bg-white px-3 py-1.5 text-right text-sm shadow-sm focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-200"
            value={editValues.commission}
            onChange={(e) =>
              setEditValues((s) => ({ ...s, commission: e.target.value }))
            }
          />
        ) : (
          row.commission
        )}
      </td>
      <td className="p-3 text-right">{row.displayed_salary}</td>
      <td className="p-3 flex justify-center gap-2">
        {editRow === row.id ? (
          <button
            onClick={() => saveRow(row.id)}
            className="text-gray-500 hover:text-green-500 cursor-pointer rounded-md bg-gray-100 px-2 py-1 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={
              saveLoading ||
              !editValues.salaryLocal ||
              !editValues.commission ||
              (editValues.salaryEuros && isNaN(editValues.salaryEuros))
            }
          >
            {saveLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Save className="h-4 w-4" />
            )}
          </button>
        ) : (
          <button
            onClick={() => {
              setEditRow(row.id);
              setEditValues({
                salaryLocal: row.salary_local,
                salaryEuros: row.salary_euros ?? "",
                commission: row.commission,
              });
            }}
            className="text-gray-500 hover:text-blue-500 cursor-pointer rounded-md bg-gray-100 px-2 py-1 hover:bg-gray-200"
          >
            <Edit className="h-4 w-4" />
          </button>
        )}
        <button
          onClick={() => setShowDelete(row.id)}
          className="text-gray-500 hover:text-red-500 cursor-pointer rounded-md bg-gray-100 px-2 py-1 hover:bg-gray-200"
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </td>
    </tr>
  );
}
