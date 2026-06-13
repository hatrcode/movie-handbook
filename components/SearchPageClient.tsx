"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Typography } from "@mui/material";
import SearchBar from "@/components/SearchBar";
import { StatusMessage } from "@/components/StatusMessage";
import ItemCards from "@/components/items/ItemCards";
import ItemPagination from "@/components/items/ItemPagination";
import LoadingSkeleton from "@/components/ui/LoadingSkeleton";
import PageShell from "@/components/ui/PageShell";
import SectionHeader from "@/components/ui/SectionHeader";
import { buildSearchUrl, hasTmdbApiKey, type MediaItem } from "@/lib/tmdb";

export default function SearchPageClient() {
  const searchParams = useSearchParams();
  const query = searchParams.get("s");
  const [pageState, setPageState] = useState<{ query: string | null; page: number }>({
    query: null,
    page: 1,
  });
  const effectivePage = pageState.query === query ? pageState.page : 1;

  function handlePageChange(p: number) {
    setPageState({ query, page: p });
  }

  const [content, setContent] = useState<MediaItem[]>([]);
  const [numOfPages, setNumOfPages] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const hasApiKey = hasTmdbApiKey();

  useEffect(() => {
    if (!query || !hasApiKey) {
      return;
    }

    let ignore = false;

    async function handleSubmit() {
      setLoading(true);
      setError(null);
      setContent([]);
      try {
        const res = await fetch(buildSearchUrl(query || "", effectivePage));
        const data = await res.json();

        if (!res.ok || data.success === false) {
          throw new Error(data.status_message || "TMDB search failed.");
        }

        if (!ignore) {
          setContent(data.results || []);
          setNumOfPages(data.total_pages || 0);
        }
      } catch (err) {
        console.error(err);
        if (!ignore) {
          setContent([]);
          setNumOfPages(0);
          setError(
            err instanceof Error ? err.message : "Unable to search TMDB."
          );
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    }

    handleSubmit();

    return () => {
      ignore = true;
    };
  }, [hasApiKey, query, effectivePage]);

  return (
    <PageShell>
      {!query ? (
        <section className="search-page-panel glass-panel">
          <p className="eyebrow">Search</p>
          <Typography variant="h2" component="h1">
            Search the movie universe
          </Typography>
          <p>
            Find films, TV shows, ratings, trailers and recommendations from
            TMDB.
          </p>
          <div className="search-panel-control">
            <SearchBar />
          </div>
        </section>
      ) : (
        <section className="content-section">
          <SectionHeader eyebrow="Search" title={`Results for "${query}"`} />
          {!hasApiKey ? (
            <StatusMessage
              title="TMDB API key missing"
              message="Set NEXT_PUBLIC_TMDB_API in your local environment or Netlify site settings to search movies and TV shows."
            />
          ) : null}
          {loading && (
            <LoadingSkeleton />
          )}
          {error && !loading ? (
            <StatusMessage title="Unable to search TMDB" message={error} />
          ) : null}
          {content.length === 0 && !loading && !error && hasApiKey && (
            <StatusMessage
              title={`No results for "${query}"`}
              message="Try a different title or spelling — or explore what's trending right now."
              actionHref="/trending"
              actionLabel="Browse Trending"
            />
          )}
          {content.length > 0 && <ItemCards content={content} />}
          {numOfPages > 1 && (
            <ItemPagination page={effectivePage} setPage={handlePageChange} numOfPages={numOfPages} />
          )}
        </section>
      )}
    </PageShell>
  );
}
