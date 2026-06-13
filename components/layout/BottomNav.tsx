"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BottomNavigation, BottomNavigationAction } from "@mui/material";
import { Whatshot, Movie, Tv, Search } from "@mui/icons-material";

export default function BottomNav() {
  const pathname = usePathname();
  const initialValue = pathname.startsWith("/movies")
    ? 1
    : pathname.startsWith("/shows")
      ? 2
      : pathname.startsWith("/trending")
        ? 3
        : 0;
  const [value, setValue] = useState(initialValue);

  return (
    <BottomNavigation
      className="bottom-nav"
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
