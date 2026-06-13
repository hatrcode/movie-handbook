import type { Metadata } from "next";
import { Suspense } from "react";
import SearchPageClient from "@/components/SearchPageClient";
import { StatusMessage } from "@/components/StatusMessage";
import { hasTmdbApiKey } from "@/lib/tmdb";

export const metadata: Metadata = {
  title: "Search",
};

export default function SearchPage() {
  return (
    <Suspense
      fallback={
        <main className="main-page">
          {hasTmdbApiKey() ? (
            "Loading..."
          ) : (
            <StatusMessage
              title="TMDB API key missing"
              message="Set NEXT_PUBLIC_TMDB_API in your local environment or Netlify site settings to search movies and TV shows."
            />
          )}
        </main>
      }
    >
      <SearchPageClient />
    </Suspense>
  );
}
