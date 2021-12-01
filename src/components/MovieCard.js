import React from "react";
import { Badge } from "@mui/material";
import { img_link, unavailable } from "../config/links";

const MovieCard = ({ movie }) => {
  const {
    id,
    title,
    name,
    poster_path,
    release_date,
    first_air_date,
    vote_average,
  } = movie;

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
        <h4 className="item-title">{title || name}</h4>
        <div className="item-info">
          <p>
            <small>Release date: {release_date || first_air_date}</small>
          </p>
        </div>
      </div>
    </div>
    // <Badge
    //   badgeContent={vote_average}
    //   color={vote_average > 5.5 ? "primary" : "secondary"}>
    //   <Card sx={{ maxWidth: "185" }} key={id}>
    //     <CardActionArea>
    //       <CardMedia
    //         component="img"
    //         image={poster_path ? `${img_link}${poster_path}` : unavailable}
    //         alt={title}
    //         sx={{ width: "auto", maxHeight: "75%" }}
    //       />
    //       <CardContent>
    //         <Typography
    //           gutterBottom
    //           variant="subtitle1"
    //           component="h3"
    //           paragraph="true">
    //           {title || name}
    //         </Typography>
    //         <Typography variant="body2" color="text.secondary">
    //           Release date: {release_date || first_air_date}
    //         </Typography>
    //       </CardContent>
    //     </CardActionArea>
    //   </Card>
    // </Badge>
  );
};

export default MovieCard;
