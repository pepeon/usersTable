import { memo } from "react";

export default memo(function Pagination({ page, total, limit, onPageChange }) {
  const totalPages = Math.ceil(total / limit);

  return (
    <div>
      <button
        disabled={page === 1 || !total}
        onClick={() => onPageChange(page - 1)}
      >
        ←
      </button>

      <span>
        {page} / {totalPages}
      </span>

      <button
        disabled={page === totalPages || !total}
        onClick={() => onPageChange(page + 1)}
      >
        →
      </button>
    </div>
  );
});
