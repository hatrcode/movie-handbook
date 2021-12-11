import React from "react";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import PinterestIcon from "@mui/icons-material/Pinterest";

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

export const movies = [
  {
    id: 2.1,
    text: "Popular",
    url: "/movies",
  },
  {
    id: 2.2,
    text: "Upcoming",
    url: "/movies/upcoming",
  },
  {
    id: 2.3,
    text: "Top Rated",
    url: "/movies/top-rated",
  },
];

export const shows = [
  {
    id: 2.1,
    text: "Popular",
    url: "/shows",
  },
  {
    id: 2.2,
    text: "Airing Today",
    url: "/shows/airing-today",
  },
  {
    id: 2.3,
    text: "Top Rated",
    url: "/shows/top-rated",
  },
];

export const trending = [
  {
    id: 3.1,
    text: "Movies this week",
    url: "/trending?media_type=movie",
  },
  {
    id: 3.2,
    text: "Tv shows this week",
    url: "/trending?media_type=tv",
  },
];
