import React from "react";
import ItemCard from "./ItemCard";

const ItemCards = ({ content }) => {
  return (
    <div className="item-list">
      {content.map((movie) => (
        <ItemCard movie={movie} key={movie.id} />
      ))}
    </div>
  );
};

export default ItemCards;
