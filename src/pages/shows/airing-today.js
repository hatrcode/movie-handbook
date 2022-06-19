import React from "react";
import ItemTemplate from "../../components/items/ItemTemplate";

const AirShows = () => {
  return (
    <ItemTemplate
      media_type="tv"
      filter="airing_today"
      title="TV Shows Airing Today"
    />
  );
};

export default AirShows;
