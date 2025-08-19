"use client";

import { useEffect, useState } from "react";
import { apiGet, apiPut } from "@/lib/api";
import { useAuthToken } from "@/hooks/use-auth-token";
import SalaryTableHeader from "./salary-table-header";
import SalaryTableBody from "./salary-table-body";
import SalaryPagination from "./salary-pagination";
import DeleteModal from "./delete-modal";

export default function SalaryTable() {
  const { token, isAuthenticated } = useAuthToken();

  const [rows, setRows] = useState([]);
  const [meta, setMeta] = useState({});
  const [loading, setLoading] = useState(false);
  const [saveLoading, setSaveLoading] = useState(false);
  const [editRow, setEditRow] = useState(null);
  const [editValues, setEditValues] = useState({});
  const [search, setSearch] = useState("");
  const [showDelete, setShowDelete] = useState(null);

  async function load(page = 1, perPage = 10) {
    if (!token) return;
    setLoading(true);
    try {
      const res = await apiGet(
        `/api/salaries?page=${page}&per_page=${perPage}`,
        token
      );
      setRows(res.data);
      setMeta(res.meta);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (isAuthenticated) void load();
  }, [isAuthenticated]);

  async function saveRow(id) {
    try {
      if (!token || saveLoading) return;
      setSaveLoading(true);
      const body = {
        salary_local: Number(editValues.salaryLocal),
        salary_euros: editValues.salaryEuros
          ? Number(editValues.salaryEuros)
          : null,
        commission: Number(editValues.commission),
      };
      const updated = await apiPut(`/api/salaries/${id}`, body, token);
      setRows((prev) => prev.map((r) => (r.id === id ? updated : r)));
      setEditRow(null);
    } catch (err) {
      alert(err.message);
    } finally {
      setSaveLoading(false);
      setEditValues({});
    }
  }

  const filteredRows = rows.filter((r) =>
    [r.name, r.email].some((field) =>
      field?.toLowerCase().includes(search.toLowerCase())
    )
  );

  if (!isAuthenticated) return <p>Please sign in to view admin panel.</p>;

  return (
    <div className="rounded-xl bg-white p-6 shadow border border-gray-200">
      <SalaryTableHeader
        meta={meta}
        load={load}
        search={search}
        setSearch={setSearch}
      />

      <SalaryTableBody
        rows={filteredRows}
        loading={loading}
        editRow={editRow}
        setEditRow={setEditRow}
        editValues={editValues}
        setEditValues={setEditValues}
        saveRow={saveRow}
        saveLoading={saveLoading}
        setShowDelete={setShowDelete}
      />

      {meta.total > 0 && <SalaryPagination meta={meta} load={load} />}

      {showDelete && (
        <DeleteModal
          onCancel={() => setShowDelete(null)}
          onConfirm={() => {
            setRows((prev) => prev.filter((r) => r.id !== showDelete));
            setShowDelete(null);
          }}
        />
      )}
    </div>
  );
}
