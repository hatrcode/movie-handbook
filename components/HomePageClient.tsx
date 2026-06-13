"use client";

import Link from "next/link";
import { Button } from "@mui/material";
import { useTmdbList } from "@/components/items/useTmdbList";
import HeroBanner from "@/components/ui/HeroBanner";
import LoadingSkeleton from "@/components/ui/LoadingSkeleton";
import MediaCard from "@/components/ui/MediaCard";
import PageShell from "@/components/ui/PageShell";
import SectionHeader from "@/components/ui/SectionHeader";
import SearchBar from "@/components/SearchBar";
import { StatusMessage } from "@/components/StatusMessage";
import {
  buildMediaListUrl,
  buildTrendingUrl,
  hasTmdbApiKey,
} from "@/lib/tmdb";

function MediaRow({
  title,
  eyebrow,
  href,
  url,
}: {
  title: string;
  eyebrow: string;
  href: string;
  url: string | null;
}) {
  const { content, loading, error } = useTmdbList(url);

  return (
    <section className="content-section">
      <SectionHeader
        eyebrow={eyebrow}
        title={title}
        action={<Link href={href}>View all</Link>}
      />
      {loading ? <LoadingSkeleton count={6} /> : null}
      {error && !loading ? (
        <StatusMessage title={`Unable to load ${title}`} message={error} />
      ) : null}
      {content.length > 0 ? (
        <div className="media-row">
          {content.slice(0, 10).map((item) => (
            <MediaCard item={item} compact key={`${title}-${item.id}`} />
          ))}
        </div>
      ) : null}
    </section>
  );
}

export default function HomePageClient() {
  const hasApiKey = hasTmdbApiKey();
  const trendingUrl = hasApiKey ? buildTrendingUrl("all", "week", 1) : null;
  const popularMoviesUrl = hasApiKey
    ? buildMediaListUrl("movie", "popular", 1)
    : null;
  const popularShowsUrl = hasApiKey ? buildMediaListUrl("tv", "popular", 1) : null;
  const { content, loading, error } = useTmdbList(trendingUrl);
  const heroItem =
    content.find((item) => item.poster_path && item.backdrop_path) || content[0];

  return (
    <PageShell className="home-shell">
      {!hasApiKey ? (
        <>
          <HeroBanner />
          <StatusMessage
            title="TMDB API key missing"
            message="Set NEXT_PUBLIC_TMDB_API in your local environment or Netlify site settings to load the cinematic homepage."
          />
        </>
      ) : (
        <>
          {loading ? <LoadingSkeleton count={6} /> : <HeroBanner item={heroItem} />}
          {error && !loading ? (
            <StatusMessage title="Unable to load homepage data" message={error} />
          ) : null}
          <MediaRow
            eyebrow="This week"
            title="Trending Now"
            href="/trending"
            url={trendingUrl}
          />
          <MediaRow
            eyebrow="Movies"
            title="Popular Movies"
            href="/movies"
            url={popularMoviesUrl}
          />
          <MediaRow
            eyebrow="Television"
            title="Popular Shows"
            href="/shows"
            url={popularShowsUrl}
          />
        </>
      )}
      <section className="search-cta glass-panel">
        <div>
          <p className="eyebrow">Find your next watch</p>
          <h2>Search across movies and shows</h2>
          <p>
            Jump straight to a title, then explore cast, trailers and similar
            recommendations.
          </p>
        </div>
        <SearchBar />
        <Link href="/search">
          <Button variant="outlined" color="inherit">
            Open Search
          </Button>
        </Link>
      </section>
    </PageShell>
  );
}
