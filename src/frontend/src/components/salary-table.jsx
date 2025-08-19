"use client";

import { useEffect, useState } from "react";
import { apiGet, apiPut } from "@/lib/api";
import { useAuthToken } from "@/hooks/use-auth-token";

export default function SalaryTable() {
  const { token, isAuthenticated } = useAuthToken();
  const [rows, setRows] = useState([]);
  const [edit, setEdit] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function load() {
    if (!token) return;
    setLoading(true);
    try {
      const res = await apiGet("/api/salaries", token);
      setRows(res.data);
      const prepared = {};
      res.data.forEach((r) => {
        prepared[r.id] = {
          salaryLocal: r.salary_local,
          salaryEuros: r.salary_euros ?? "",
          commission: r.commission,
        };
      });
      setEdit(prepared);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function saveRow(id) {
    try {
      const body = {
        salary_local: Number(edit[id].salaryLocal),
        salary_euros: edit[id].salaryEuros ? Number(edit[id].salaryEuros) : null,
        commission: Number(edit[id].commission),
      };
      const updated = await apiPut(`/api/salaries/${id}`, body, token);
      setRows((prev) => prev.map((r) => (r.id === id ? updated : r)));
    } catch (err) {
      alert(err.message);
    }
  }

  useEffect(() => {
    if (isAuthenticated) void load();
  }, [isAuthenticated]);

  if (!isAuthenticated) return <p>Please sign in to view admin panel.</p>;

  return (
    <div className="rounded-2xl bg-white p-6 shadow">
      <h1 className="mb-4 text-xl font-semibold">User Salaries</h1>
      {error && <p className="mb-4 text-sm text-red-600">{error}</p>}
      <table className="min-w-full text-sm">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 text-left">Name</th>
            <th className="p-2 text-left">Email</th>
            <th className="p-2 text-right">Local</th>
            <th className="p-2 text-right">Euro</th>
            <th className="p-2 text-right">Commission</th>
            <th className="p-2 text-right">Displayed</th>
            <th className="p-2 text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.id} className="border-b">
              <td className="p-2">{r.name}</td>
              <td className="p-2">{r.email}</td>
              <td className="p-2 text-right">
                <input
                  value={edit[r.id]?.salaryLocal || ""}
                  onChange={(e) =>
                    setEdit((s) => ({ ...s, [r.id]: { ...s[r.id], salaryLocal: e.target.value } }))
                  }
                  className="w-24 rounded border px-2 py-1 text-right"
                />
              </td>
              <td className="p-2 text-right">
                <input
                  value={edit[r.id]?.salaryEuros || ""}
                  onChange={(e) =>
                    setEdit((s) => ({ ...s, [r.id]: { ...s[r.id], salaryEuros: e.target.value } }))
                  }
                  className="w-24 rounded border px-2 py-1 text-right"
                />
              </td>
              <td className="p-2 text-right">
                <input
                  value={edit[r.id]?.commission || ""}
                  onChange={(e) =>
                    setEdit((s) => ({ ...s, [r.id]: { ...s[r.id], commission: e.target.value } }))
                  }
                  className="w-24 rounded border px-2 py-1 text-right"
                />
              </td>
              <td className="p-2 text-right">{r.displayed_salary}</td>
              <td className="p-2 text-right">
                <button
                  onClick={() => saveRow(r.id)}
                  className="rounded bg-black px-3 py-1 text-white"
                >
                  Save
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
