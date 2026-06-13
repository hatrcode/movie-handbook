"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Button, Typography } from "@mui/material";
import SearchBar from "@/components/SearchBar";
import ItemCards from "@/components/items/ItemCards";
import { buildSearchUrl, type MediaItem } from "@/lib/tmdb";

export default function SearchPageClient() {
  const searchParams = useSearchParams();
  const query = searchParams.get("s");
  const [content, setContent] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!query) {
      return;
    }

    let ignore = false;

    async function handleSubmit() {
      setLoading(true);
      try {
        const res = await fetch(buildSearchUrl(query || ""));
        const data = await res.json();

        if (!ignore) {
          setContent(data.results || []);
        }
      } catch (err) {
        console.error(err);
        if (!ignore) {
          setContent([]);
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
  }, [query]);

  return (
    <main className="main-page">
      {!query ? (
        <div>
          <Typography variant="h2">Search</Typography>
          <div style={{ marginTop: "1rem" }}>
            <SearchBar />
          </div>
        </div>
      ) : (
        <div>
          <Typography variant="h2" align="center" gutterBottom>
            Search results
          </Typography>
          {loading && (
            <Typography variant="h4" gutterBottom align="center">
              Searching...
            </Typography>
          )}
          {content.length === 0 && !loading && (
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
        </div>
      )}
    </main>
  );
}
