"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button, Grid, Typography } from "@mui/material";
import PeopleCard from "@/components/items/PeopleCard";
import TrailerButton from "@/components/items/TrailerButton";
import { StatusMessage } from "@/components/StatusMessage";
import LoadingSkeleton from "@/components/ui/LoadingSkeleton";
import MediaCard from "@/components/ui/MediaCard";
import PageShell from "@/components/ui/PageShell";
import RatingBadge from "@/components/ui/RatingBadge";
import SectionHeader from "@/components/ui/SectionHeader";
import { dateConvert, getYear } from "@/lib/date";
import {
  buildDetailUrl,
  hasTmdbApiKey,
  type MediaItem,
  type ShowDetails,
} from "@/lib/tmdb";
import { img500, img1920, unavailable } from "@/lib/links";

export default function ShowDetailPageClient({ id }: { id: string }) {
  const [content, setContent] = useState<ShowDetails | null>(null);
  const hasApiKey = hasTmdbApiKey();
  const [loading, setLoading] = useState(hasApiKey);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!hasApiKey) {
      return;
    }

    let ignore = false;

    async function fetchData() {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(buildDetailUrl("tv", id));
        const data = await response.json();

        if (!response.ok || data.success === false || !data.id) {
          throw new Error(data.status_message || "TMDB TV request failed.");
        }

        if (!ignore) {
          setContent(data);
        }
      } catch (err) {
        console.error(err);
        if (!ignore) {
          setContent(null);
          setError(
            err instanceof Error ? err.message : "Unable to load this TV show."
          );
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    }

    fetchData();

    return () => {
      ignore = true;
    };
  }, [hasApiKey, id]);

  if (!hasApiKey) {
    return (
      <PageShell>
        <StatusMessage
          title="TMDB API key missing"
          message="Set NEXT_PUBLIC_TMDB_API in your local environment or Netlify site settings to load TV show details."
          actionHref="/shows"
          actionLabel="All TV shows"
        />
      </PageShell>
    );
  }

  if (loading) {
    return (
      <PageShell>
        <LoadingSkeleton />
      </PageShell>
    );
  }

  if (!content) {
    return (
      <PageShell>
        <StatusMessage
          title="Unable to load this TV show"
          message={error || "Sorry. We couldn't load this TV show."}
          actionHref="/shows"
          actionLabel="All TV shows"
        />
      </PageShell>
    );
  }

  const {
    name,
    original_name,
    tagline,
    genres,
    backdrop_path,
    poster_path,
    overview,
    budget,
    revenue,
    status,
    networks,
    vote_average,
    first_air_date,
    last_air_date,
    created_by,
    production_companies,
    number_of_seasons,
    number_of_episodes,
    keywords,
    credits,
    videos,
    similar,
  } = content;

  const year = first_air_date ? getYear(first_air_date) : "";
  const cardTitle = `${name || "TV Show"}${year ? ` (${year})` : ""}`;
  const creatorList = created_by ? created_by.map((creator) => creator.name) : [];
  const genreList = genres ? genres.map((genre) => genre.name) : [];
  const networkList = networks ? networks.map((network) => network.name) : [];
  const peopleList = credits ? credits.cast.slice(0, 8) : [];
  const videoList = videos
    ? videos.results.filter((video) => video.type === "Trailer")
    : [];

  return (
    <main className="detail-page">
      <section className="detail-hero">
        {backdrop_path ? (
          <div
            className="detail-backdrop"
            style={{ backgroundImage: `url(${img1920}${backdrop_path})` }}
          />
        ) : null}
        <div className="detail-overlay" />
        <div className="detail-content page-container">
          <Grid container spacing={4} alignItems="center">
            <Grid size={{ xs: 12, sm: 4, md: 3 }}>
              <div className="detail-poster">
                <Image
                  src={poster_path ? `${img500}${poster_path}` : unavailable}
                  alt={`${name || "TV show"} poster`}
                  width={500}
                  height={750}
                  priority
                />
              </div>
            </Grid>
            <Grid size={{ xs: 12, sm: 8, md: 9 }}>
              <div className="detail-copy glass-panel">
                <p className="eyebrow">TV Show</p>
                <Typography variant="h3" component="h1">
                  {cardTitle}
                </Typography>
                <div className="hero-meta">
                  {year ? <span>{year}</span> : null}
                  {number_of_seasons ? <span>{number_of_seasons} seasons</span> : null}
                  <RatingBadge rating={vote_average} />
                </div>
                {tagline ? <p className="detail-tagline">{tagline}</p> : null}
                {overview ? <p className="detail-overview">{overview}</p> : null}
                <div className="detail-facts">
                  {creatorList.length > 0 ? (
                    <p>
                      <strong>Creator</strong> {creatorList.join(", ")}
                    </p>
                  ) : null}
                  {genreList.length > 0 ? (
                    <p>
                      <strong>Genre</strong> <span>{genreList.join(", ")}</span>
                    </p>
                  ) : null}
                </div>
                {videoList.length > 0 ? (
                  <TrailerButton title={cardTitle} videoKey={videoList[0].key} />
                ) : null}
              </div>
            </Grid>
          </Grid>
        </div>
      </section>
      <section className="detail-section page-container">
        <Grid container spacing={4}>
          <Grid size={{ xs: 12, md: 8 }}>
            <SectionHeader title="Show Cast" />
            {peopleList.length > 0 ? (
              <div className="scroller-wrap is-fading">
                <div className="scroller">
                  {peopleList.map((people) => (
                    <PeopleCard key={people.id} people={people} />
                  ))}
                </div>
              </div>
            ) : null}
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <aside className="detail-info-panel glass-panel">
              <h2>Information</h2>
              {original_name ? (
                <p>
                  <strong>Original name</strong>: {original_name}
                </p>
              ) : null}
              {status ? (
                <p>
                  <strong>Status</strong>: {status}
                </p>
              ) : null}
              {networkList.length > 0 ? (
                <p>
                  <strong>Networks</strong>: {networkList.join(", ")}
                </p>
              ) : null}
              {first_air_date ? (
                <p>
                  <strong>First air date</strong>: {dateConvert(first_air_date)}
                </p>
              ) : null}
              {last_air_date ? (
                <p>
                  <strong>Last air date</strong>: {dateConvert(last_air_date)}
                </p>
              ) : null}
              {number_of_episodes != null ? (
                <p>
                  <strong>Episodes</strong>: {number_of_episodes}
                </p>
              ) : null}
              {budget != null ? (
                <p>
                  <strong>Budget</strong>: ${budget.toLocaleString("en-US")}
                </p>
              ) : null}
              {revenue != null ? (
                <p>
                  <strong>Revenue</strong>: ${revenue.toLocaleString("en-US")}
                </p>
              ) : null}
              {production_companies ? (
                <div>
                  <p>
                    <strong>Production companies</strong>
                  </p>
                  <ul>
                    {production_companies.map((company) => (
                      <li key={company.id}>{company.name}</li>
                    ))}
                  </ul>
                </div>
              ) : null}
              {keywords ? (
                <div className="keyword-list">
                  {keywords.results.map((keyword) => (
                    <span className="keyword-pill" key={keyword.id}>
                      {keyword.name}
                    </span>
                  ))}
                </div>
              ) : null}
            </aside>
          </Grid>
        </Grid>
        {similar ? <ShowRecommendations similar={similar.results} /> : null}
      </section>
    </main>
  );
}

function ShowRecommendations({ similar }: { similar: MediaItem[] }) {
  return (
    <section className="content-section">
      <SectionHeader title="You may also like" />
      <div className="media-row">
        {similar.slice(0, 9).map((show) => (
          <MediaCard item={{ ...show, media_type: "tv" }} compact key={show.id} />
        ))}
      </div>
      <div className="center-actions">
        <Link href="/shows">
          <Button variant="contained">All TV shows</Button>
        </Link>
      </div>
    </section>
  );
}
