import React, { useState } from "react";
import { Link } from "gatsby";
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
import { movies, series, trending } from "../../constants/navbarLinks";

const SubMenu = () => {
  const [open1, setOpen1] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [open3, setOpen3] = useState(false);
  return (
    <Box sx={{ width: "250" }} role="presentation">
      <List
        sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
        component="nav"
        aria-labelledby="nested-list-subheader"
        subheader={
          <ListSubheader component="div" id="nested-list-subheader">
            Menu
          </ListSubheader>
        }>
        <ListItemButton>
          <ListItemIcon>
            <Home />
          </ListItemIcon>
          <Link to="/">
            <ListItemText primary="Home" />
          </Link>
        </ListItemButton>
        <ListItemButton onClick={() => setOpen1(!open1)}>
          <ListItemIcon>
            <Movie />
          </ListItemIcon>
          <Link to="/movies">
            <ListItemText primary="Movie" />
          </Link>
          {open1 ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={open1} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {movies.map((i) => {
              return (
                <ListItemButton sx={{ pl: 4 }}>
                  <Link to={i.url}>
                    <ListItemText primary={i.text} />
                  </Link>
                </ListItemButton>
              );
            })}
          </List>
        </Collapse>
        <ListItemButton onClick={() => setOpen2(!open2)}>
          <ListItemIcon>
            <Tv />
          </ListItemIcon>
          <Link to="/series">
            <ListItemText primary="Series" />
          </Link>
          {open2 ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={open2} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {series.map((i) => {
              return (
                <ListItemButton sx={{ pl: 4 }}>
                  <Link to={i.url}>
                    <ListItemText primary={i.text} />
                  </Link>
                </ListItemButton>
              );
            })}
          </List>
        </Collapse>
        <ListItemButton onClick={() => setOpen3(!open3)}>
          <ListItemIcon>
            <Whatshot />
          </ListItemIcon>
          <Link to="/trending">
            <ListItemText primary="Trending" />
          </Link>
          {open3 ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={open3} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {trending.map((i) => {
              return (
                <ListItemButton sx={{ pl: 4 }}>
                  <Link to={i.url}>
                    <ListItemText primary={i.text} />
                  </Link>
                </ListItemButton>
              );
            })}
          </List>
        </Collapse>
        <ListItemButton>
          <ListItemIcon>
            <Search />
          </ListItemIcon>
          <Link to="/search">
            <ListItemText primary="Search" />
          </Link>
        </ListItemButton>
      </List>
    </Box>
  );
};

export default SubMenu;
