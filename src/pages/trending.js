import React, { useState } from "react";
import { useFetch } from "../hooks/useFetch";
import Layout from "../components/layout/Layout";
import Seo from "../components/layout/SEO";
import ItemCards from "../components/items/ItemCards";
import ItemPagination from "../components/items/ItemPagination";
import { Typography } from "@mui/material";

const Trending = ({ location }) => {
  const [page, setPage] = useState(1);
  const params = new URLSearchParams(location.search);
  const media_type = params.get("media_type") || "all";
  const time = params.get("time") || "week";

  const url = `https://api.themoviedb.org/3/trending/${media_type}/${time}?api_key=${process.env.GATSBY_TMDB_API}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}`;

  const { content, numOfPages, loading } = useFetch(url, page);

  let type = "";

  if (media_type === "movie") {
    type = "movies";
  } else if (media_type === "tv") {
    type = "series";
  } else {
    type = "";
  }
  return (
    <Layout>
      <Seo title="Trending" />
      <div className="main-page">
        <Typography variant="h3" component="h2" gutterBottom align="center">
          Trending {type} this {time}
        </Typography>
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

export default Trending;
