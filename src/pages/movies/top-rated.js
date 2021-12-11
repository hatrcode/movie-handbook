import React, { useState } from "react";
import { useFetch } from "../../hooks/useFetch";
import Genres from "../../components/Genres";
import MovieCard from "../../components/MovieCard";
import useGenre from "../../hooks/useGerne";
import Layout from "../../components/layout/Layout";
import Seo from "../../components/layout/SEO";
import ItemPagination from "../../components/ItemPagination";
import { Typography, Box } from "@mui/material";

const TopMovies = () => {
  const [genres, setGenres] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [page, setPage] = useState(1);
  const genreforURL = useGenre(selectedGenres);
  const url = `https://api.themoviedb.org/3/movie/top_rated?api_key=${process.env.GATSBY_TMDB_API}&include_adult=false&page=${page}&with_genres=${genreforURL}`;
  const { content, numOfPages, loading } = useFetch(url, page, selectedGenres);

  return (
    <Layout>
      <Seo title="Movies" />
      <div className="main-page">
        <Typography variant="h3" component="h2" gutterBottom align="center">
          Top-rate Movies
        </Typography>
        <Genres
          type="movie"
          selectedGenres={selectedGenres}
          setSelectedGenres={setSelectedGenres}
          genres={genres}
          setGenres={setGenres}
          setPage={setPage}
        />
        {loading && (
          <Typography variant="h4" gutterBottom align="center">
            Loading...
          </Typography>
        )}
        <div className="item-list">
          {content &&
            content.map((movie) => (
              <Box
                container
                key={movie.id}
                sx={{ maxWidth: { xs: 150, md: 175 } }}>
                <MovieCard movie={movie} media_type="movie" />
              </Box>
            ))}
        </div>
        {numOfPages > 1 && (
          <ItemPagination setPage={setPage} numOfPages={numOfPages} />
        )}
      </div>
    </Layout>
  );
};

export default TopMovies;
