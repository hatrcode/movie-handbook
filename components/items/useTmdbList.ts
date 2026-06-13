"use client";

import { useEffect, useState } from "react";
import type { MediaItem } from "@/lib/tmdb";

export function useTmdbList(url: string) {
  const [loading, setLoading] = useState(true);
  const [content, setContent] = useState<MediaItem[]>([]);
  const [numOfPages, setNumOfPages] = useState(0);

  useEffect(() => {
    let ignore = false;

    async function getItems() {
      setLoading(true);
      try {
        window.scroll(0, 0);
        const response = await fetch(url);
        const data = await response.json();

        if (!ignore) {
          setContent(data.results || []);
          setNumOfPages(data.total_pages || 0);
        }
      } catch (err) {
        console.error(err);
        if (!ignore) {
          setContent([]);
          setNumOfPages(0);
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

  return { loading, content, numOfPages };
}
