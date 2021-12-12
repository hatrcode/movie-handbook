import React from "react";
import ItemCard from "./ItemCard";
import { Box } from "@mui/material";

const ItemCards = ({ content }) => {
  return (
    <div className="item-list">
      {content.map((movie) => (
        <Box container key={movie.id} sx={{ maxWidth: { xs: 150, md: 175 } }}>
          <ItemCard movie={movie} />
        </Box>
      ))}
    </div>
  );
};

export default ItemCards;
