"use client";

import { useEffect, useState } from "react";
import type { MediaItem } from "@/lib/tmdb";

export function useTmdbList(url: string | null) {
  const [loading, setLoading] = useState(Boolean(url));
  const [content, setContent] = useState<MediaItem[]>([]);
  const [numOfPages, setNumOfPages] = useState(0);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!url) {
      return;
    }

    let ignore = false;

    async function getItems() {
      setLoading(true);
      setError(null);
      try {
        window.scroll(0, 0);
        const response = await fetch(url as string);
        const data = await response.json();

        if (!response.ok || data.success === false) {
          throw new Error(data.status_message || "TMDB request failed.");
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
            err instanceof Error ? err.message : "Unable to load TMDB data."
          );
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    }

    getItems();

    return () => {
      ignore = true;
    };
  }, [url]);

  return { loading, content, numOfPages, error };
}
