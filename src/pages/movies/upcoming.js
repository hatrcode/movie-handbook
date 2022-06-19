import React from "react";
import ItemTemplate from "../../components/items/ItemTemplate";

const UpcomingMovies = () => {
  return (
    <ItemTemplate
      media_type="movie"
      filter="upcoming"
      title="Upcoming Movies"
    />
  );
};

export default UpcomingMovies;
