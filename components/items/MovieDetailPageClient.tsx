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
import {
  buildDetailUrl,
  hasTmdbApiKey,
  type MediaItem,
  type MovieDetails,
} from "@/lib/tmdb";
import { img500, img1920, unavailable } from "@/lib/links";
import { getYear } from "@/lib/date";

export default function MovieDetailPageClient({ id }: { id: string }) {
  const [content, setContent] = useState<MovieDetails | null>(null);
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
        const response = await fetch(buildDetailUrl("movie", id));
        const data = await response.json();

        if (!response.ok || data.success === false || !data.id) {
          throw new Error(data.status_message || "TMDB movie request failed.");
        }

        if (!ignore) {
          setContent(data);
        }
      } catch (err) {
        console.error(err);
        if (!ignore) {
          setContent(null);
          setError(
            err instanceof Error ? err.message : "Unable to load this movie."
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
          message="Set NEXT_PUBLIC_TMDB_API in your local environment or Netlify site settings to load movie details."
          actionHref="/movies"
          actionLabel="All movies"
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
          title="Unable to load this movie"
          message={error || "Sorry. We couldn't load this movie."}
          actionHref="/movies"
          actionLabel="All movies"
        />
      </PageShell>
    );
  }

  const {
    title,
    tagline,
    genres,
    backdrop_path,
    poster_path,
    overview,
    budget,
    revenue,
    status,
    vote_average,
    release_date,
    production_companies,
    runtime,
    keywords,
    credits,
    videos,
    similar,
  } = content;

  const year = release_date ? getYear(release_date) : "";
  const cardTitle = `${title || "Movie"}${year ? ` (${year})` : ""}`;
  const directorList = credits
    ? credits.crew.filter(
        (director) =>
          director.job === "Director" &&
          director.known_for_department === "Directing"
      )
    : [];
  const genreList = genres ? genres.map((genre) => genre.name) : [];
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
                  alt={`${title || "Movie"} poster`}
                  width={500}
                  height={750}
                  priority
                />
              </div>
            </Grid>
            <Grid size={{ xs: 12, sm: 8, md: 9 }}>
              <div className="detail-copy glass-panel">
                <p className="eyebrow">Movie</p>
                <Typography variant="h3" component="h1">
                  {cardTitle}
                </Typography>
                <div className="hero-meta">
                  {year ? <span>{year}</span> : null}
                  {runtime ? (
                    <span>
                      {runtime >= 60 ? `${Math.floor(runtime / 60)}h ` : ""}{runtime % 60}m
                    </span>
                  ) : null}
                  <RatingBadge rating={vote_average} />
                </div>
                {tagline ? <p className="detail-tagline">{tagline}</p> : null}
                {overview ? <p className="detail-overview">{overview}</p> : null}
                <div className="detail-facts">
                  {directorList.length > 0 ? (
                    <p>
                      <strong>Director</strong>{" "}
                      {directorList.map((director) => (
                        <span key={director.id}>{director.name}</span>
                      ))}
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
          {peopleList.length > 0 ? (
            <Grid size={{ xs: 12, md: 8 }}>
              <SectionHeader title="Top Cast" />
              <div className="scroller-wrap is-fading">
                <div className="scroller">
                  {peopleList.map((people) => (
                    <PeopleCard key={people.id} people={people} />
                  ))}
                </div>
              </div>
            </Grid>
          ) : null}
          <Grid size={{ xs: 12, md: 4 }}>
            <aside className="detail-info-panel glass-panel">
              <h2>Information</h2>
              {status ? (
                <p>
                  <strong>Status</strong>: {status}
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
                  {keywords.keywords.map((keyword) => (
                    <span className="keyword-pill" key={keyword.id}>
                      {keyword.name}
                    </span>
                  ))}
                </div>
              ) : null}
            </aside>
          </Grid>
        </Grid>
        {similar ? <MovieRecommendations similar={similar.results} /> : null}
      </section>
    </main>
  );
}

function MovieRecommendations({ similar }: { similar: MediaItem[] }) {
  return (
    <section className="content-section">
      <SectionHeader title="You may also like" />
      <div className="media-row">
        {similar.slice(0, 9).map((movie) => (
          <MediaCard
            item={{ ...movie, media_type: "movie" }}
            compact
            key={movie.id}
          />
        ))}
      </div>
      <div className="center-actions">
        <Link href="/movies">
          <Button variant="contained">All movies</Button>
        </Link>
      </div>
    </section>
  );
}
