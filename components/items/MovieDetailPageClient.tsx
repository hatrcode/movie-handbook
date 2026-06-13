"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Typography, Button, Grid, Box, Container } from "@mui/material";
import PeopleCard from "@/components/items/PeopleCard";
import TrailerButton from "@/components/items/TrailerButton";
import { StatusMessage } from "@/components/StatusMessage";
import {
  buildDetailUrl,
  hasTmdbApiKey,
  type MediaItem,
  type MovieDetails,
} from "@/lib/tmdb";
import { img300, img500, img1920, unavailable } from "@/lib/links";

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
      <main className="main-page">
        <StatusMessage
          title="TMDB API key missing"
          message="Set NEXT_PUBLIC_TMDB_API in your local environment or Netlify site settings to load movie details."
          actionHref="/movies"
          actionLabel="All movies"
        />
      </main>
    );
  }

  if (loading) {
    return (
      <Container>
        <h2>Loading...</h2>
      </Container>
    );
  }

  if (!content) {
    return (
      <main className="main-page">
        <StatusMessage
          title="Unable to load this movie"
          message={error || "Sorry. We couldn't load this movie."}
          actionHref="/movies"
          actionLabel="All movies"
        />
      </main>
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

  const year = release_date ? new Date(release_date).getFullYear() : "";
  const cardTitle = `${title || "Movie"}${year ? ` (${year})` : ""}`;
  const directorList = credits
    ? credits.crew.filter(
        (director) =>
          director.job === "Executive Producer" &&
          director.known_for_department === "Directing"
      )
    : [];
  const genreList = genres ? genres.map((genre) => genre.name) : [];
  const peopleList = credits ? credits.cast.slice(0, 8) : [];
  const videoList = videos
    ? videos.results.filter((video) => video.type === "Trailer")
    : [];

  return (
    <main>
      <div
        style={{
          minHeight: "100%",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundImage: backdrop_path
            ? `url(${img1920}${backdrop_path})`
            : undefined,
        }}
      >
        <Box
          component="div"
          sx={{
            p: { xs: "2rem 1rem", sm: "2rem", md: "3rem" },
            backgroundImage:
              "linear-gradient(to right, rgba(9.02%, 5.10%, 5.49%, 1.00) 150px, rgba(9.02%, 5.10%, 5.49%, 0.84) 100%)",
          }}
        >
          <Grid container spacing={3}>
            <Grid size={{ xs: 12, sm: 4, md: 3 }}>
              <div style={{ maxWidth: "100%", height: "auto" }}>
                <Image
                  src={poster_path ? `${img500}${poster_path}` : unavailable}
                  alt={title || "Movie poster"}
                  width={500}
                  height={750}
                  style={{ width: "100%", height: "auto" }}
                />
              </div>
            </Grid>
            <Grid size={{ xs: 12, sm: 8, md: 9 }}>
              <Box component="div" sx={{ color: "white" }}>
                <Typography
                  variant="h4"
                  component="h1"
                  sx={{ color: "white" }}
                  gutterBottom
                >
                  {cardTitle}{" "}
                  {typeof vote_average === "number" && (
                    <Button variant="outlined" color="warning">
                      IMDb: {vote_average}
                    </Button>
                  )}
                </Typography>
                {tagline ? (
                  <Typography
                    variant="body2"
                    sx={{ fontStyle: "italic", color: "gray" }}
                    gutterBottom
                  >
                    {tagline}
                  </Typography>
                ) : null}
                {overview ? <p>{overview}</p> : null}
                <div>
                  {year ? (
                    <p>
                      <strong>Released</strong>: {year}
                    </p>
                  ) : null}
                  {runtime ? (
                    <p>
                      <strong>Duration</strong>: {Math.floor(runtime / 60)}h{" "}
                      {runtime % 60}m
                    </p>
                  ) : null}
                </div>
                <div>
                  {directorList.length > 0 ? (
                    <p>
                      <strong>Director</strong>:{" "}
                      {directorList.map((director) => (
                        <span key={director.id}>{director.name}</span>
                      ))}
                    </p>
                  ) : null}
                  {genreList.length > 0 ? (
                    <p>
                      <strong>Genre</strong>:{" "}
                      <span>{genreList.join(", ")}</span>
                    </p>
                  ) : null}
                </div>
                {videoList.length > 0 ? (
                  <TrailerButton title={cardTitle} videoKey={videoList[0].key} />
                ) : null}
              </Box>
            </Grid>
          </Grid>
        </Box>
      </div>
      <Box
        component="div"
        sx={{
          p: { xs: "2rem 1rem", sm: "2rem", md: "3rem" },
        }}
      >
        <Grid container spacing={4}>
          {peopleList.length > 0 ? (
            <Grid size={{ xs: 12, sm: 8 }}>
              <Typography variant="h5" component="h2" gutterBottom>
                Top Cast
              </Typography>
              <div className="scroller-wrap is-fading">
                <div className="scroller">
                  {peopleList.map((people) => (
                    <PeopleCard key={people.id} people={people} />
                  ))}
                </div>
              </div>
            </Grid>
          ) : null}
          <Grid size={{ xs: 12, sm: 4 }}>
            {status ? (
              <p>
                <strong>Status</strong>: {status}
              </p>
            ) : null}
            {budget ? (
              <p>
                <strong>Budget</strong>: ${budget.toLocaleString("en-US")}
              </p>
            ) : null}
            {revenue ? (
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
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "10px",
                  marginTop: "0.5rem",
                }}
              >
                {keywords.keywords.map((keyword) => (
                  <Button variant="outlined" disabled key={keyword.id}>
                    {keyword.name}
                  </Button>
                ))}
              </div>
            ) : null}
          </Grid>
        </Grid>
        {similar ? <MovieRecommendations similar={similar.results} /> : null}
      </Box>
    </main>
  );
}

function MovieRecommendations({ similar }: { similar: MediaItem[] }) {
  return (
    <div>
      <hr style={{ margin: "1rem 0" }} />
      <Typography variant="h5" component="h2" gutterBottom>
        You may also like
      </Typography>
      <div className="scroller-wrap is-fading">
        <div className="scroller">
          {similar.slice(0, 9).map((movie) => (
            <Box
              key={movie.id}
              sx={{ minWidth: { xs: 100, sm: 150, md: 175 } }}
            >
              <Link href={`/movie/${movie.id}`}>
                <Box
                  sx={{
                    position: "relative",
                    display: "inline-block",
                    lineHeight: 0,
                  }}
                >
                  <Image
                    src={
                      movie.poster_path
                        ? `${img300}${movie.poster_path}`
                        : unavailable
                    }
                    alt={movie.title || "Similar movie"}
                    width={300}
                    height={450}
                    style={{ width: "100%", height: "auto" }}
                  />
                  <div className="movie-info">
                    <p style={{ marginBottom: "0" }}>{movie.title}</p>
                  </div>
                </Box>
              </Link>
            </Box>
          ))}
        </div>
      </div>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Link href="/movies">
          <Button
            variant="contained"
            sx={{ backgroundColor: "black", color: "white", mt: 2 }}
          >
            All movies
          </Button>
        </Link>
      </Box>
    </div>
  );
}
