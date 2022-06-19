import React from "react";
import ItemTemplate from "../../components/items/ItemTemplate";

const TopMovies = () => {
  return (
    <ItemTemplate
      media_type="movie"
      filter="top_rated"
      title="Top-rate Movies"
    />
  );
};

export default TopMovies;
