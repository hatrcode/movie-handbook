import React, { useState, useEffect } from "react";
import { Link } from "gatsby";
import Layout from "../components/layout/Layout";
import Seo from "../components/layout/SEO";
import MovieCard from "../components/MovieCard";
import SearchBar from "../components/SearchBar";
import { Typography, Box, Button } from "@mui/material";

const SearchPage = ({ location }) => {
  const params = new URLSearchParams(location.search);
  const query = params.get("s");
  const [content, setContent] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleSubmit = async () => {
    const url = `https://api.themoviedb.org/3/search/multi?api_key=${process.env.GATSBY_TMDB_API}&language=en-US&query=${query}&page=1&include_adult=false`;
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
        {!query ? (
          <div>
            <Typography variant="h2">Search</Typography>
            <div style={{ marginTop: "1rem" }}>
              <SearchBar />
            </div>
          </div>
        ) : null}
        {query ? (
          <div>
            <Typography variant="h2" align="center" gutterBottom>
              Search results
            </Typography>
            {loading && (
              <Typography variant="h4" gutterBottom align="center">
                Searching...
              </Typography>
            )}
            {content.length === 0 && !loading && (
              <div className="error-container">
                <p>Sorry. We couldn’t find what you were looking for.</p>
                <Link to="/">
                  <Button size="small" variant="contained" color="primary">
                    Back to Homepage
                  </Button>
                </Link>
              </div>
            )}
            {content && (
              <div className="item-list">
                {content.map((movie) => (
                  <Box
                    container
                    key={movie.id}
                    sx={{ maxWidth: { xs: 150, md: 175 } }}>
                    <MovieCard movie={movie} />
                  </Box>
                ))}
              </div>
            )}
          </div>
        ) : null}
      </div>
    </Layout>
  );
};

export default SearchPage;
