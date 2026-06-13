"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BottomNavigation, BottomNavigationAction } from "@mui/material";
import { Whatshot, Movie, Tv, Search } from "@mui/icons-material";

function getActiveTab(pathname: string) {
  if (pathname.startsWith("/movies") || pathname.startsWith("/movie/")) return 1;
  if (pathname.startsWith("/shows") || pathname.startsWith("/show/")) return 2;
  if (pathname.startsWith("/trending")) return 3;
  return 0;
}

export default function BottomNav() {
  const pathname = usePathname();
  const value = getActiveTab(pathname);

  return (
    <BottomNavigation
      className="bottom-nav"
      showLabels
      value={value}
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
