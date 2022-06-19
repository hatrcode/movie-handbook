import React from "react";
import ItemTemplate from "../../components/items/ItemTemplate";

const Movies = () => {
  return (
    <ItemTemplate media_type="movie" filter="popular" title="Popular movies" />
  );
};

export default Movies;
