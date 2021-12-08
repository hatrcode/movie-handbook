import React from "react";
import { img_300 } from "../constants/links";
import { Card, CardMedia, CardContent, Typography } from "@mui/material";
import noPic from "../images/noPic.svg";

const PeopleCard = ({ people }) => {
  const { name, character, profile_path } = people;
  return (
    <Card sx={{ minWidth: 138 }}>
      <CardMedia
        component="img"
        alt={name}
        width="138"
        height="207"
        image={profile_path ? `${img_300}${profile_path}` : noPic}
      />
      <CardContent>
        <Typography gutterBottom variant="h6" component="h4">
          {name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {character}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default PeopleCard;
