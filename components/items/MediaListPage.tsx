"use client";

import { useState } from "react";
import { Typography } from "@mui/material";
import Genres from "@/components/items/Genres";
import ItemCards from "@/components/items/ItemCards";
import ItemPagination from "@/components/items/ItemPagination";
import { useTmdbList } from "@/components/items/useTmdbList";
import {
  buildMediaListUrl,
  type Genre,
  type MediaType,
} from "@/lib/tmdb";

export default function MediaListPage({
  mediaType,
  filter,
  title,
}: {
  mediaType: MediaType;
  filter: string;
  title: string;
}) {
  const [genres, setGenres] = useState<Genre[]>([]);
  const [selectedGenres, setSelectedGenres] = useState<Genre[]>([]);
  const [page, setPage] = useState(1);
  const url = buildMediaListUrl(mediaType, filter, page, selectedGenres);
  const { content, numOfPages, loading } = useTmdbList(url);

  return (
    <main className="main-page">
      <Typography variant="h3" component="h1" gutterBottom align="center">
        {title}
      </Typography>
      <Genres
        type={mediaType}
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
      {content.length > 0 && <ItemCards content={content} />}
      {numOfPages > 1 && (
        <ItemPagination setPage={setPage} numOfPages={numOfPages} />
      )}
    </main>
  );
}
