import React from "react";
import { useState } from "react";
import MovieCard from "./MovieCard";

const MovieSearch = () => {
  // Create state for input query
  const [query, setQuery] = useState("");
  // Create the state for recipes
  const [isLoading, setIsLoading] = useState(false);
  // Create the state for page & dishes per page
  const [movies, setMovies] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.API_KEY}&language=en-US&query=${query}&page=1&include_adult=false`;

    setIsLoading(true);
    try {
      const res = await fetch(url);
      const data = await res.json();
      setMovies(data.results);
      console.log(movies);
    } catch (err) {
      console.log("There is no movie");
    }
    setIsLoading(false);
  };

  return (
    <div className="main-page">
      <form className="search-form" onSubmit={handleSubmit}>
        <label className="search-label" htmlFor="query">
          Search your movie
        </label>
        <div className="search-box">
          <span className="glass">
            <svg
              focusable="false"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24">
              <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"></path>
            </svg>
          </span>
          <input
            type="text"
            name="search"
            id="search"
            autoComplete="on"
            placeholder="i.e. Jurassic Park"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <button className="button" type="submit">
          Search
        </button>
      </form>
      <div className="item-list">
        {movies &&
          movies
            .filter((movie) => movie.poster_path)
            .map((movie) => <MovieCard movie={movie} key={movie.id} />)}
      </div>
    </div>
  );
};

export default MovieSearch;
