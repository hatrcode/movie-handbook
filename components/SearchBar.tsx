import SearchIcon from "@mui/icons-material/Search";

export default function SearchBar() {
  return (
    <div className="search-container">
      <form className="search-form" action="/search" method="GET">
        <div className="search-box">
          <span className="glass" aria-hidden="true">
            <SearchIcon />
          </span>
          <label className="sr-only" htmlFor="search">
            Search movies and TV shows
          </label>
          <input
            type="text"
            id="search"
            placeholder="Search..."
            name="s"
            autoComplete="off"
          />
        </div>
      </form>
    </div>
  );
}
