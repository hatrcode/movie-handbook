import React from "react";
import { Link } from "gatsby";
import SearchBar from "../SearchBar";
import SubNavDrop from "../layout/SubNavDrop";
import { movies, series, trending } from "../../constants/navbarLinks";
import { Drawer, Box, IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import MenuIcon from "@mui/icons-material/Menu";
import MobileMenu from "./MobileMenu";

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = React.useState(false);

  return (
    <nav>
      <div className="nav-center">
        <div className="nav-header">
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={() => setMobileOpen(!mobileOpen)}
            sx={{ mr: 2, display: { md: "none" } }}>
            <MenuIcon />
          </IconButton>
          <div className="logo">
            <Link to="/">Movie Handbook</Link>
          </div>
          <Box
            component="div"
            sx={{ display: { xs: "block", sm: "none", md: "none" } }}>
            <Link to="/search">
              <SearchIcon />
            </Link>
          </Box>
        </div>
        <Box component="div" sx={{ display: { xs: "none", md: "block" } }}>
          <SubNavDrop main="Movies" url="/movies" sub={movies} />
          <SubNavDrop main="Series" url="/series" sub={series} />
          <SubNavDrop main="Trending" url="/trending" sub={trending} />
        </Box>
        <Box component="div" sx={{ display: { xs: "block" } }}>
          <Drawer open={mobileOpen} onClose={() => setMobileOpen(!mobileOpen)}>
            <MobileMenu />
          </Drawer>
        </Box>
        <Box
          component="div"
          sx={{ display: { xs: "none", sm: "block", md: "block" } }}>
          <SearchBar />
        </Box>
      </div>
    </nav>
  );
};

export default Navbar;
