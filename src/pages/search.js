import React, { useState, useEffect } from "react";
import { Link } from "gatsby";
import Layout from "../components/layout/Layout";
import Seo from "../components/layout/SEO";
import MovieCard from "../components/MovieCard";
import SearchBar from "../components/SearchBar";
import { Typography } from "@mui/material";

const SearchPage = ({ location }) => {
  const params = new URLSearchParams(location.search);
  const query = params.get("s");
  const [content, setContent] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleSubmit = async () => {
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_TMDB}&language=en-US&query=${query}&page=1&include_adult=false`;
    try {
      const res = await fetch(url);
      const data = await res.json();
      setContent(data.results);
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };

  useEffect(() => {
    handleSubmit();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  return (
    <Layout>
      <Seo title="Search" />
      <div className="main-page">
        {!query && (
          <div>
            <Typography variant="h2">Search</Typography>
            <div style={{ marginTop: "1rem" }}>
              <SearchBar />
            </div>
          </div>
        )}
        {query && (
          <div>
            <Typography variant="h2">Search results</Typography>
            {loading && <div>Searching...</div>}
            {content.length === 0 && !loading && (
              <div className="error-container">
                <p>Sorry. We couldn’t find what you were looking for.</p>
                <Link to="/" className="btn">
                  Back to Homepage
                </Link>
              </div>
            )}
            <div className="item-list">
              {content &&
                content.map((movie) => (
                  <MovieCard movie={movie} key={movie.id} />
                ))}
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default SearchPage;
