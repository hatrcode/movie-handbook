"use client";

import Pagination from "@mui/material/Pagination";

export default function ItemPagination({
  setPage,
  numOfPages = 10,
}: {
  setPage: (page: number) => void;
  numOfPages?: number;
}) {
  const handlePageChange = (page: number) => {
    setPage(page);
    window.scroll(0, 0);
  };

  return (
    <div className="pagination-wrap">
      <Pagination
        onChange={(event, page) => handlePageChange(page)}
        count={numOfPages}
        color="primary"
        style={{ boxShadow: "none" }}
      />
    </div>
  );
}
