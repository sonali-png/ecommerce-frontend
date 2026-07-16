import React from "react";
import CommonStyles from "../../css/Admin/Common.module.css";
import PGStyles from "../../css/Admin/Pagination.module.css";

export default function Pagination({
  page,
  start,
  end,
  limit,
  totalRecords,
  onPageChange,
}) {

  const totalPages = Math.ceil(totalRecords / limit);

  if (totalPages <= 1) return null;

  return (
    <div className={PGStyles.paginationContainer}>
      <span className={CommonStyles.textMuted}>
        Showing {start} to {end} of {totalRecords} entries
      </span>

      <div className={PGStyles.paginationButtons}>

        <button
          className={`${CommonStyles.btn} ${CommonStyles.btnSm} ${CommonStyles.btnOutline}`}
          onClick={() => onPageChange(page - 1)}
          disabled={page === 1}
        >
          Previous
        </button>

        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            className={`${CommonStyles.btn} ${CommonStyles.btnSm} ${CommonStyles.btnOutline} ${
              page === index + 1 ? "active" : ""
            }`}
            onClick={() => onPageChange(index + 1)}
          >
            {index + 1}
          </button>
        ))}

        <button
          className={`${CommonStyles.btn} ${CommonStyles.btnSm} ${CommonStyles.btnOutline}`}
          onClick={() => onPageChange(page + 1)}
          disabled={page === totalPages}
        >
          Next
        </button>

      </div>
    </div>
  );
}