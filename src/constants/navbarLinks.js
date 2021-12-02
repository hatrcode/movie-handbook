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
    text: "Movies 2021",
    url: "/movies?year=2021",
  },
  {
    id: 2.2,
    text: "Movies 2020",
    url: "/movies?year=2020",
  },
  {
    id: 2.3,
    text: "Movies 2019",
    url: "/movies?year=2019",
  },
];

export const series = [
  {
    id: 2.1,
    text: "Series 2021",
    url: "/series?year=2021",
  },
  {
    id: 2.2,
    text: "Series 2020",
    url: "/series?year=2020",
  },
  {
    id: 2.3,
    text: "Series 2019",
    url: "/series?year=2019",
  },
];
