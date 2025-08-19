"use client";

export default function SalaryPagination({ meta, load }) {
  return (
    <div className="flex items-center justify-between mt-4 text-sm">
      <span className="text-gray-600">
        Showing {(meta.current_page - 1) * meta.per_page + 1} to{" "}
        {Math.min(meta.current_page * meta.per_page, meta.total)} of{" "}
        {meta.total} entries
      </span>
      <div className="flex gap-2">
        <button
          disabled={meta.current_page === 1}
          onClick={() => load(meta.current_page - 1, meta.per_page)}
          className="px-2 py-1 text-sm rounded border border-gray-300 text-gray-600 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
        >
          Previous
        </button>

        {(() => {
          const pages = [];
          let start = Math.max(1, meta.current_page - 1);
          let end = Math.min(meta.last_page, start + 2);

          if (end - start < 2) {
            start = Math.max(1, end - 2);
          }

          for (let i = start; i <= end; i++) {
            pages.push(
              <button
                key={i}
                onClick={() => load(i, meta.per_page)}
                disabled={meta.current_page === i}
                className={`px-2.5 py-1 text-sm rounded-md transition cursor-pointer disabled:opacity-50 ${
                  meta.current_page === i
                    ? "bg-blue-300 text-white"
                    : "text-gray-600 hover:bg-blue-100"
                }`}
              >
                {i}
              </button>
            );
          }
          return pages;
        })()}

        <button
          disabled={meta.current_page === meta.last_page}
          onClick={() => load(meta.current_page + 1, meta.per_page)}
          className="px-2 py-1 text-sm rounded border border-gray-300 text-gray-600 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
        >
          Next
        </button>
      </div>
    </div>
  );
}
