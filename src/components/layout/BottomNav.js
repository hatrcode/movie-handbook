import React, { useState } from "react";
import { Link } from "gatsby";
import { BottomNavigation, BottomNavigationAction } from "@mui/material";
import { Whatshot, Movie, Tv, Search } from "@mui/icons-material";

const BottomNav = () => {
  const [value, setValue] = useState(0);

  return (
    <BottomNavigation
      showLabels
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
      }}>
      <BottomNavigationAction
        label="Trending"
        icon={<Whatshot />}
        component={Link}
        to="/"
      />
      <BottomNavigationAction
        label="Movies"
        icon={<Movie />}
        component={Link}
        to="/movies"
      />
      <BottomNavigationAction
        label="TV Series"
        icon={<Tv />}
        component={Link}
        to="/series"
      />
      <BottomNavigationAction
        label="Search"
        icon={<Search />}
        component={Link}
        to="/"
      />
    </BottomNavigation>
  );
};

export default BottomNav;
