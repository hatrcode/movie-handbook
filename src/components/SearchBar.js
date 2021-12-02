// A search bar
import React from "react";
import SearchIcon from "@mui/icons-material/Search";

const SearchBar = () => {
  return (
    <div className="search-container">
      <form className="search-form" action="/search" method="GET">
        <div className="search-box">
          <span className="glass">
            <SearchIcon />
          </span>
          <input type="text" id="search" placeholder="Search..." name="s" />
        </div>
      </form>
    </div>
  );
};

export default SearchBar;
