"use client";

import { useState } from "react";
import { Typography } from "@mui/material";
import Genres from "@/components/items/Genres";
import ItemCards from "@/components/items/ItemCards";
import ItemPagination from "@/components/items/ItemPagination";
import { useTmdbList } from "@/components/items/useTmdbList";
import { StatusMessage } from "@/components/StatusMessage";
import LoadingSkeleton from "@/components/ui/LoadingSkeleton";
import PageShell from "@/components/ui/PageShell";
import SectionHeader from "@/components/ui/SectionHeader";
import {
  buildMediaListUrl,
  hasTmdbApiKey,
  type Genre,
  type MediaType,
} from "@/lib/tmdb";

function getPageDescription(mediaType: MediaType, filter: string) {
  if (mediaType === "movie") {
    if (filter === "popular") return "Browse the movies audiences are watching right now.";
    if (filter === "upcoming") return "Coming soon to cinemas — discover what's opening next.";
    if (filter === "top_rated") return "The highest-rated films of all time, according to TMDB audiences.";
  }
  if (mediaType === "tv") {
    if (filter === "popular") return "The TV shows audiences are streaming right now.";
    if (filter === "airing_today") return "New episodes airing today across every platform.";
    if (filter === "top_rated") return "The highest-rated TV shows of all time, according to TMDB.";
  }
  return "Browse movies and TV shows from TMDB.";
}

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
    <PageShell>
      <div className="page-intro glass-panel">
        <p className="eyebrow">{mediaType === "movie" ? "Movies" : "TV Shows"}</p>
        <Typography variant="h3" component="h1">
          {title}
        </Typography>
        <p>{getPageDescription(mediaType, filter)}</p>
      </div>
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
      {loading && <LoadingSkeleton />}
      {error && !loading ? (
        <StatusMessage title="Something went wrong" message="We couldn't reach TMDB right now. Try refreshing the page." />
      ) : null}
      {!loading && !error && hasApiKey && content.length === 0 ? (
        <StatusMessage
          title="Nothing here yet"
          message="No results came back for this filter. Try a different genre or page."
        />
      ) : null}
      {content.length > 0 && (
        <section className="content-section">
          <SectionHeader title="Results" />
          <ItemCards content={content} />
        </section>
      )}
      {numOfPages > 1 && (
        <ItemPagination page={page} setPage={setPage} numOfPages={numOfPages} />
      )}
    </PageShell>
  );
}
