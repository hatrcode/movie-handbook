import React, { useState } from "react";
import { useFetch } from "../hooks/useFetch";
import Genres from "../components/Genres";
import MovieCard from "../components/MovieCard";
import useGenre from "../hooks/useGerne";
import Layout from "../components/layout/Layout";
import Seo from "../components/layout/SEO";
import ItemPagination from "../components/ItemPagination";
import { Typography } from "@mui/material";

const Series = ({ location }) => {
  const params = new URLSearchParams(location.search);
  const year = params.get("year");
  const [genres, setGenres] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [page, setPage] = useState(1);
  const genreforURL = useGenre(selectedGenres);

  const url = `https://api.themoviedb.org/3/discover/tv?api_key=${process.env.GATSBY_TMDB_API}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${genreforURL}&primary_release_year=${year}`;
  const { content, numOfPages, loading } = useFetch(url, page, selectedGenres);

  return (
    <Layout>
      <Seo title="Series" />
      <div className="main-page">
        <Typography variant="h3" component="h2" gutterBottom align="center">
          TV Series
        </Typography>
        <Genres
          type="tv"
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
              <MovieCard movie={movie} key={movie.id} media_type="tv" />
            ))}
        </div>
        {numOfPages > 1 && (
          <ItemPagination setPage={setPage} numOfPages={numOfPages} />
        )}
      </div>
    </Layout>
  );
};

export default Series;
