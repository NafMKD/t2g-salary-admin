"use client";

import { X, Trash2, Loader2 } from "lucide-react";
import { useState } from "react";
import { apiDelete } from "@/lib/api";
import { useAuthToken } from "@/hooks/use-auth-token";

export default function DeleteModal({ id, onCancel, onSuccess, onError }) {
  const { token } = useAuthToken();
  const [loading, setLoading] = useState(false);

  async function handleDelete() {
    if (!token || loading) return;
    setLoading(true);
    try {
      await apiDelete(`/api/salaries/${id}`, token);
      onSuccess(id);
    } catch (err) {
      console.error(err);
      onError(err.message || "Failed to delete salary record.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="w-72 rounded-xl bg-white p-5 shadow-xl ring-1 ring-gray-200">
        <h2 className="mb-3 text-base font-semibold text-gray-800">
          Confirm Deletion
        </h2>
        <p className="mb-5 text-sm text-gray-500">
          Are you sure you want to delete this salary record?
        </p>
        <div className="flex justify-end gap-2">
          <button
            onClick={onCancel}
            disabled={loading}
            className="inline-flex items-center gap-1 rounded-md bg-gray-50 px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-100 transition cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <X className="h-4 w-4" /> Cancel
          </button>
          <button
            onClick={handleDelete}
            disabled={loading}
            className="inline-flex items-center gap-1 rounded-md bg-red-500 px-3 py-1.5 text-sm text-white hover:bg-red-600 transition cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Trash2 className="h-4 w-4" />
            )}{" "}
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
