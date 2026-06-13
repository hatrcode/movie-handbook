"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { Typography } from "@mui/material";
import ItemCards from "@/components/items/ItemCards";
import ItemPagination from "@/components/items/ItemPagination";
import { useTmdbList } from "@/components/items/useTmdbList";
import { StatusMessage } from "@/components/StatusMessage";
import LoadingSkeleton from "@/components/ui/LoadingSkeleton";
import PageShell from "@/components/ui/PageShell";
import SectionHeader from "@/components/ui/SectionHeader";
import {
  buildTrendingUrl,
  hasTmdbApiKey,
  type TrendingMediaType,
} from "@/lib/tmdb";

export default function TrendingPageClient() {
  const [page, setPage] = useState(1);
  const searchParams = useSearchParams();
  const mediaType =
    (searchParams.get("media_type") as TrendingMediaType | null) || "all";
  const time = searchParams.get("time") || "week";
  const hasApiKey = hasTmdbApiKey();

  const url = hasApiKey ? buildTrendingUrl(mediaType, time, page) : null;
  const { content, numOfPages, loading, error } = useTmdbList(url);

  let type = "";

  if (mediaType === "movie") {
    type = "movies";
  } else if (mediaType === "tv") {
    type = "series";
  }

  return (
    <PageShell>
      <div className="page-intro glass-panel">
        <p className="eyebrow">Trending</p>
        <Typography variant="h3" component="h1">
          Trending {type} this {time}
        </Typography>
        <p>See what audiences are watching across TMDB right now.</p>
      </div>
      {!hasApiKey ? (
        <StatusMessage
          title="TMDB API key missing"
          message="Set NEXT_PUBLIC_TMDB_API in your local environment or Netlify site settings to load trending movie and TV data."
        />
      ) : null}
      {loading && <LoadingSkeleton />}
      {error && !loading ? (
        <StatusMessage title="Unable to load trending data" message={error} />
      ) : null}
      {!loading && !error && hasApiKey && content.length === 0 ? (
        <StatusMessage
          title="No trending results found"
          message="TMDB did not return any trending items for this page."
        />
      ) : null}
      {content.length > 0 && (
        <section className="content-section">
          <SectionHeader title="Trending results" />
          <ItemCards content={content} />
        </section>
      )}
      {numOfPages > 1 && (
        <ItemPagination setPage={setPage} numOfPages={numOfPages} />
      )}
    </PageShell>
  );
}
