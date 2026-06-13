"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Button, Typography } from "@mui/material";
import SearchBar from "@/components/SearchBar";
import { StatusMessage } from "@/components/StatusMessage";
import ItemCards from "@/components/items/ItemCards";
import LoadingSkeleton from "@/components/ui/LoadingSkeleton";
import PageShell from "@/components/ui/PageShell";
import SectionHeader from "@/components/ui/SectionHeader";
import { buildSearchUrl, hasTmdbApiKey, type MediaItem } from "@/lib/tmdb";

export default function SearchPageClient() {
  const searchParams = useSearchParams();
  const query = searchParams.get("s");
  const [content, setContent] = useState<MediaItem[]>([]);
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
      try {
        const res = await fetch(buildSearchUrl(query || ""));
        const data = await res.json();

        if (!res.ok || data.success === false) {
          throw new Error(data.status_message || "TMDB search failed.");
        }

        if (!ignore) {
          setContent(data.results || []);
        }
      } catch (err) {
        console.error(err);
        if (!ignore) {
          setContent([]);
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
  }, [hasApiKey, query]);

  return (
    <PageShell>
      {!query ? (
        <section className="search-page-panel glass-panel">
          <p className="eyebrow">Search the catalogue</p>
          <Typography variant="h2" component="h1">
            Find movies, shows and people
          </Typography>
          <p>
            Search TMDB and open a title to see details, trailers, cast and
            recommendations.
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
            <div className="error-container">
              <p>Sorry. We couldn&apos;t find what you were looking for.</p>
              <Link href="/">
                <Button size="small" variant="contained" color="primary">
                  Back to Homepage
                </Button>
              </Link>
            </div>
          )}
          {content.length > 0 && <ItemCards content={content} />}
        </section>
      )}
    </PageShell>
  );
}
