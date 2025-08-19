"use client";

import { X, Trash2 } from "lucide-react";

export default function DeleteModal({ onCancel, onConfirm }) {
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
            className="inline-flex items-center gap-1 rounded-md bg-gray-50 px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-100 transition cursor-pointer"
          >
            <X className="h-4 w-4" /> Cancel
          </button>
          <button
            onClick={onConfirm}
            className="inline-flex items-center gap-1 rounded-md bg-red-500 px-3 py-1.5 text-sm text-white hover:bg-red-600 transition cursor-pointer"
          >
            <Trash2 className="h-4 w-4" /> Delete
          </button>
        </div>
      </div>
    </div>
  );
}
