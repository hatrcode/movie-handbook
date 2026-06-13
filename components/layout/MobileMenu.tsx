"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Box,
  List,
  ListSubheader,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
} from "@mui/material";
import { Home, Whatshot, Movie, Tv, Search } from "@mui/icons-material";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { movies, shows, trending } from "@/lib/nav-links";

export default function MobileMenu() {
  const [open1, setOpen1] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [open3, setOpen3] = useState(false);

  return (
    <Box sx={{ width: 290 }} role="presentation" className="mobile-menu">
      <List
        sx={{ width: "100%", maxWidth: 360 }}
        component="nav"
        aria-labelledby="nested-list-subheader"
        subheader={
          <ListSubheader
            component="div"
            id="nested-list-subheader"
            className="mobile-menu-title"
          >
            Movie Handbook
          </ListSubheader>
        }
      >
        <ListItemButton component={Link} href="/">
          <ListItemIcon>
            <Home />
          </ListItemIcon>
          <ListItemText primary="Home" />
        </ListItemButton>
        <ListItemButton onClick={() => setOpen1(!open1)}>
          <ListItemIcon>
            <Movie />
          </ListItemIcon>
          <ListItemText primary="Movies" />
          {open1 ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={open1} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {movies.map((item) => (
              <ListItemButton
                key={item.id}
                sx={{ pl: 4 }}
                component={Link}
                href={item.url}
              >
                <ListItemText primary={item.text} />
              </ListItemButton>
            ))}
          </List>
        </Collapse>
        <ListItemButton onClick={() => setOpen2(!open2)}>
          <ListItemIcon>
            <Tv />
          </ListItemIcon>
          <ListItemText primary="TV Shows" />
          {open2 ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={open2} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {shows.map((item) => (
              <ListItemButton
                key={item.id}
                sx={{ pl: 4 }}
                component={Link}
                href={item.url}
              >
                <ListItemText primary={item.text} />
              </ListItemButton>
            ))}
          </List>
        </Collapse>
        <ListItemButton onClick={() => setOpen3(!open3)}>
          <ListItemIcon>
            <Whatshot />
          </ListItemIcon>
          <ListItemText primary="Trending" />
          {open3 ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={open3} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {trending.map((item) => (
              <ListItemButton
                key={item.id}
                sx={{ pl: 4 }}
                component={Link}
                href={item.url}
              >
                <ListItemText primary={item.text} />
              </ListItemButton>
            ))}
          </List>
        </Collapse>
        <ListItemButton component={Link} href="/search">
          <ListItemIcon>
            <Search />
          </ListItemIcon>
          <ListItemText primary="Search" />
        </ListItemButton>
      </List>
    </Box>
  );
}
