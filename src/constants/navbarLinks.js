import React from "react";
import {
  FacebookIcon,
  TwitterIcon,
  InstagramIcon,
  PinterestIcon,
} from "@mui/icons-material";

export const links = [
  {
    id: 1,
    url: "/",
    text: "home",
  },
  {
    id: 2,
    url: "/movies",
    text: "movies",
  },
  {
    id: 3,
    url: "/series",
    text: "series",
  },
  {
    id: 4,
    url: "/trending",
    text: "trending",
  },
];

export const social = [
  {
    id: 1,
    url: "https://www.facebook.com/expatolife",
    icon: <FacebookIcon />,
  },
  {
    id: 2,
    url: "https://www.twitter.com/expatolife",
    icon: <TwitterIcon />,
  },
  {
    id: 3,
    url: "https://www.instagram.com/expatolife",
    icon: <InstagramIcon />,
  },
  {
    id: 4,
    url: "https://www.pinterest.com/expatolife",
    icon: <PinterestIcon />,
  },
];
