import React from "react";
import { Badge } from "@material-ui/core";
import { img_link, unavailable } from "../config/links";

const MovieCard = ({ movie }) => {
  const { id, title, poster_path, release_date, vote_average } = movie;
  return (
    <div className="item-card" key={id}>
      <Badge
        badgeContent={vote_average}
        color={vote_average > 5.5 ? "primary" : "secondary"}
      />
      <img
        className="item-img"
        src={poster_path ? `${img_link}${poster_path}` : unavailable}
        alt={title}
      />
      <div>
        <h3 className="item-title">{title}</h3>
        <div className="item-info">
          <p>
            <small>Release date: {release_date}</small>
          </p>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
