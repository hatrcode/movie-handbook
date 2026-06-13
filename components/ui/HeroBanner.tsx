import Link from "next/link";
import Image from "next/image";
import { Button } from "@mui/material";
import RatingBadge from "@/components/ui/RatingBadge";
import { img500, img1920, unavailable } from "@/lib/links";
import { getYear } from "@/lib/date";
import type { MediaItem } from "@/lib/tmdb";

function getHref(item: MediaItem) {
  if (item.media_type === "tv") return `/show/${item.id}`;
  if (item.media_type === "movie") return `/movie/${item.id}`;
  if (item.name && !item.title) return `/show/${item.id}`;
  return `/movie/${item.id}`;
}

export default function HeroBanner({ item }: { item?: MediaItem }) {
  const fallback = !item;
  const title = item?.title || item?.name || "Find your next film night in seconds.";
  const description =
    item?.overview ||
    "Search movies and TV shows, explore what's trending, and jump into ratings, trailers and recommendations without the clutter.";
  const date = item?.release_date || item?.first_air_date;
  const year = date ? getYear(date) : null;
  const mediaType = item?.media_type === "tv" || (!item?.title && item?.name) ? "Show" : "Movie";
  const href = item ? getHref(item) : "/movies";

  return (
    <section className="hero-banner">
      {item?.backdrop_path ? (
        <div
          className="hero-backdrop"
          style={{ backgroundImage: `url(${img1920}${item.backdrop_path})` }}
        />
      ) : null}
      <div className="hero-overlay" />
      <div className="hero-content">
        <div className="hero-copy">
          <p className="eyebrow">{fallback ? "Movie discovery" : "Featured now"}</p>
          <h1>{title}</h1>
          {!fallback && (
            <div className="hero-meta">
              {year ? <span>{year}</span> : null}
              <span>{mediaType}</span>
              <RatingBadge rating={item?.vote_average} />
            </div>
          )}
          <p>{description}</p>
          <div className="hero-actions">
            <Link href={href}>
              <Button variant="contained" color="primary">
                {fallback ? "Browse Movies" : "View Details"}
              </Button>
            </Link>
            <Link href="/trending">
              <Button variant="outlined" color="inherit">
                {fallback ? "What's Trending" : "Browse Trending"}
              </Button>
            </Link>
          </div>
        </div>
        <div className="hero-poster" aria-hidden={fallback}>
          <Image
            src={item?.poster_path ? `${img500}${item.poster_path}` : unavailable}
            alt={fallback ? "Movie Handbook" : `${title} poster`}
            width={500}
            height={750}
            priority
          />
        </div>
      </div>
    </section>
  );
}
