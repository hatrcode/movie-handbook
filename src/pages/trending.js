import React, { useState } from "react";
import { useFetch } from "../hooks/useFetch";
import MovieCard from "../components/MovieCard";
import Layout from "../components/layout/Layout";
import ItemPagination from "../components/ItemPagination";

const Trending = ({ location }) => {
  const [page, setPage] = useState(1);
  const params = new URLSearchParams(location.search);
  const media_type = params.get("media_type") || "all";
  const time = params.get("time") || "week";

  const url = `https://api.themoviedb.org/3/trending/${media_type}/${time}?api_key=${process.env.API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}`;

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
