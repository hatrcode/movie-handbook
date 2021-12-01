import React, { useState } from "react";
import { useFetch } from "../hooks/useFetch";
import MovieCard from "../components/MovieCard";
import Layout from "../components/layout/Layout";
import ItemPagination from "../components/ItemPagination";

const Trending = () => {
  const [page, setPage] = useState(1);

  const url = `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}`;

  const { content, numOfPages } = useFetch(url, page);

  return (
    <Layout>
      <div className="main-page">
        <div className="item-list">
          {content &&
            content.map((movie) => <MovieCard movie={movie} key={movie.id} />)}
        </div>
        {numOfPages > 1 && (
          <ItemPagination setPage={setPage} numOfPages={numOfPages} />
        )}
      </div>
    </Layout>
  );
};

export default Trending;
