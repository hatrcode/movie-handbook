import React, { useState } from "react";
import { useFetch } from "../../hooks/useFetch";
import Layout from "../../components/layout/Layout";
import Seo from "../../components/layout/SEO";
import Genres from "../../components/items/Genres";
import useGenre from "../../hooks/useGerne";
import ItemCards from "../../components/items/ItemCards";
import ItemPagination from "../../components/items/ItemPagination";
import { Typography } from "@mui/material";

const Movies = () => {
  const [genres, setGenres] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [page, setPage] = useState(1);
  const genreforURL = useGenre(selectedGenres);
  const url = `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.GATSBY_TMDB_API}&include_adult=false&page=${page}&with_genres=${genreforURL}`;
  const { content, numOfPages, loading } = useFetch(url, page, selectedGenres);

  return (
    <Layout>
      <Seo title="Movies" />
      <div className="main-page">
        <Typography variant="h3" component="h2" gutterBottom align="center">
          Popular Movies
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
        {content && <ItemCards content={content} />}
        {numOfPages > 1 && (
          <ItemPagination setPage={setPage} numOfPages={numOfPages} />
        )}
      </div>
    </Layout>
  );
};

export default Movies;
