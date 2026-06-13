"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { Typography } from "@mui/material";
import ItemCards from "@/components/items/ItemCards";
import ItemPagination from "@/components/items/ItemPagination";
import { useTmdbList } from "@/components/items/useTmdbList";
import { buildTrendingUrl, type TrendingMediaType } from "@/lib/tmdb";

export default function TrendingPageClient() {
  const [page, setPage] = useState(1);
  const searchParams = useSearchParams();
  const mediaType =
    (searchParams.get("media_type") as TrendingMediaType | null) || "all";
  const time = searchParams.get("time") || "week";

  const url = buildTrendingUrl(mediaType, time, page);
  const { content, numOfPages, loading } = useTmdbList(url);

  let type = "";

  if (mediaType === "movie") {
    type = "movies";
  } else if (mediaType === "tv") {
    type = "series";
  }

  return (
    <main className="main-page">
      <Typography variant="h3" component="h1" gutterBottom align="center">
        Trending {type} this {time}
      </Typography>
      {loading && (
        <Typography variant="h4" gutterBottom align="center">
          Loading...
        </Typography>
      )}
      {content.length > 0 && <ItemCards content={content} />}
      {numOfPages > 1 && (
        <ItemPagination setPage={setPage} numOfPages={numOfPages} />
      )}
    </main>
  );
}
