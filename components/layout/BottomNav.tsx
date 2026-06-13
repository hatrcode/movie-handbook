"use client";

import { useState } from "react";
import Link from "next/link";
import { BottomNavigation, BottomNavigationAction } from "@mui/material";
import { Whatshot, Movie, Tv, Search } from "@mui/icons-material";

export default function BottomNav() {
  const [value, setValue] = useState(0);

  return (
    <BottomNavigation
      showLabels
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
      }}
    >
      <BottomNavigationAction
        label="Search"
        icon={<Search />}
        component={Link}
        href="/search"
      />
      <BottomNavigationAction
        label="Movies"
        icon={<Movie />}
        component={Link}
        href="/movies"
      />
      <BottomNavigationAction
        label="TV Series"
        icon={<Tv />}
        component={Link}
        href="/shows"
      />
      <BottomNavigationAction
        label="Trending"
        icon={<Whatshot />}
        component={Link}
        href="/trending"
      />
    </BottomNavigation>
  );
}
