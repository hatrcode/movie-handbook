"use client";

import { useState } from "react";
import Link from "next/link";
import { Drawer, Box, IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import MenuIcon from "@mui/icons-material/Menu";
import SearchBar from "@/components/SearchBar";
import SubNavDrop from "@/components/layout/SubNavDrop";
import MobileMenu from "@/components/layout/MobileMenu";
import { movies, shows, trending } from "@/lib/nav-links";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav>
      <div className="nav-center">
        <div className="nav-header">
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={() => setMobileOpen(!mobileOpen)}
            sx={{ mr: 2, display: { md: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <div className="logo">
            <Link href="/">Movie Handbook</Link>
          </div>
          <Box
            component="div"
            sx={{ display: { xs: "block", sm: "none", md: "none" } }}
          >
            <Link href="/search" aria-label="Search">
              <SearchIcon />
            </Link>
          </Box>
        </div>
        <Box component="div" sx={{ display: { xs: "none", md: "block" } }}>
          <SubNavDrop main="Movies" url="/movies" sub={movies} />
          <SubNavDrop main="Tv Shows" url="/shows" sub={shows} />
          <SubNavDrop main="Trending" url="/trending" sub={trending} />
        </Box>
        <Box component="div" sx={{ display: { xs: "block" } }}>
          <Drawer open={mobileOpen} onClose={() => setMobileOpen(!mobileOpen)}>
            <MobileMenu />
          </Drawer>
        </Box>
        <Box
          component="div"
          sx={{ display: { xs: "none", sm: "block", md: "block" } }}
        >
          <SearchBar />
        </Box>
      </div>
    </nav>
  );
}
