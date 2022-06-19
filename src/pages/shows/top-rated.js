import React from "react";
import ItemTemplate from "../../components/items/ItemTemplate";

const TopShows = () => {
  return (
    <ItemTemplate
      media_type="tv"
      filter="top_rated"
      title="Top Rated TV Shows"
    />
  );
};

export default TopShows;
