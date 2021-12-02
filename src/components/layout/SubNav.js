import React from "react";
import { Link } from "gatsby";
import { movies, series } from "../../constants/navbarLinks";
import SubNavDrop from "./SubNavDrop";

const SubNav = () => {
  console.log(movies);
  return (
    <div class="navbar">
      <Link to="/" className="sub-link">
        Home
      </Link>
      <SubNavDrop main="Movies" url="/movies" sub={movies} />
      <SubNavDrop main="Series" url="/series" sub={series} />
      <Link to="/" className="sub-link">
        Trending
      </Link>
    </div>
  );
};

export default SubNav;
