import React from "react";
import Pagination from "@mui/material/Pagination";

const ItemPagination = ({ setPage, numOfPages = 10 }) => {
  const handlePageChange = (page) => {
    setPage(page);
    window.scroll(0, 0);
  };
  return (
    <div
      style={{
        margin: "0 auto",
      }}>
      <Pagination
        onChange={(e) => handlePageChange(e.target.textContent)}
        count={numOfPages}
        color="primary"
        style={{ boxShadow: "none" }}
      />
    </div>
  );
};

export default ItemPagination;
