import type { Metadata } from "next";
import { Suspense } from "react";
import TrendingPageClient from "@/components/TrendingPageClient";
import { StatusMessage } from "@/components/StatusMessage";
import { hasTmdbApiKey } from "@/lib/tmdb";

export const metadata: Metadata = {
  title: "Trending",
};

export default function TrendingPage() {
  return (
    <Suspense
      fallback={
        <main className="main-page">
          {hasTmdbApiKey() ? (
            "Loading..."
          ) : (
            <StatusMessage
              title="TMDB API key missing"
              message="Set NEXT_PUBLIC_TMDB_API in your local environment or Netlify site settings to load trending movie and TV data."
            />
          )}
        </main>
      }
    >
      <TrendingPageClient />
    </Suspense>
  );
}
