"use client";

import { useState } from "react";
import { Typography } from "@mui/material";
import Genres from "@/components/items/Genres";
import ItemCards from "@/components/items/ItemCards";
import ItemPagination from "@/components/items/ItemPagination";
import { useTmdbList } from "@/components/items/useTmdbList";
import { StatusMessage } from "@/components/StatusMessage";
import {
  buildMediaListUrl,
  hasTmdbApiKey,
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
  const hasApiKey = hasTmdbApiKey();
  const url = hasApiKey
    ? buildMediaListUrl(mediaType, filter, page, selectedGenres)
    : null;
  const { content, numOfPages, loading, error } = useTmdbList(url);

  return (
    <main className="main-page">
      <Typography variant="h3" component="h1" gutterBottom align="center">
        {title}
      </Typography>
      {!hasApiKey ? (
        <StatusMessage
          title="TMDB API key missing"
          message="Set NEXT_PUBLIC_TMDB_API in your local environment or Netlify site settings to load movie and TV data."
        />
      ) : (
        <Genres
          type={mediaType}
          selectedGenres={selectedGenres}
          setSelectedGenres={setSelectedGenres}
          genres={genres}
          setGenres={setGenres}
          setPage={setPage}
        />
      )}
      {loading && (
        <Typography variant="h4" gutterBottom align="center">
          Loading...
        </Typography>
      )}
      {error && !loading ? (
        <StatusMessage title="Unable to load TMDB data" message={error} />
      ) : null}
      {!loading && !error && hasApiKey && content.length === 0 ? (
        <StatusMessage
          title="No results found"
          message="TMDB did not return any items for this page."
        />
      ) : null}
      {content.length > 0 && <ItemCards content={content} />}
      {numOfPages > 1 && (
        <ItemPagination setPage={setPage} numOfPages={numOfPages} />
      )}
    </main>
  );
}
