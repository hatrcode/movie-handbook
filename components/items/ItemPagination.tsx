"use client";

import Pagination from "@mui/material/Pagination";

export default function ItemPagination({
  page,
  setPage,
  numOfPages = 10,
}: {
  page: number;
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
        page={page}
        onChange={(event, page) => handlePageChange(page)}
        count={numOfPages}
        color="primary"
        style={{ boxShadow: "none" }}
      />
    </div>
  );
}
