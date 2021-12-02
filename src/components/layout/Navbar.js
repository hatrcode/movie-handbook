import React from "react";
import { Link } from "gatsby";
import { social } from "../../constants/navbarLinks";
import SearchBar from "../SearchBar";

const Navbar = () => {
  return (
    <nav>
      <div className="nav-center">
        <div className="nav-header">
          <div className="logo">
            <Link to="/">Movie Handbook</Link>
          </div>
        </div>
        <SearchBar />
        <ul className="social-icons">
          {social.map((socialIcon) => {
            const { id, url, icon } = socialIcon;
            return (
              <li key={id}>
                <a href={url}>{icon}</a>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
