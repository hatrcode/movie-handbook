import Link from "next/link";
import Image from "next/image";
import { Button } from "@mui/material";
import RatingBadge from "@/components/ui/RatingBadge";
import { img500, img1920, unavailable } from "@/lib/links";
import type { MediaItem } from "@/lib/tmdb";

function getHref(item: MediaItem) {
  return item.title || item.media_type === "movie"
    ? `/movie/${item.id}`
    : `/show/${item.id}`;
}

export default function HeroBanner({ item }: { item?: MediaItem }) {
  const fallback = !item;
  const title = item?.title || item?.name || "Movie Handbook";
  const description =
    item?.overview ||
    "Discover films and shows with cinematic previews, ratings, cast details, trailers and recommendations powered by TMDB.";
  const date = item?.release_date || item?.first_air_date;
  const year = date ? new Date(date).getFullYear() : "Curated";
  const mediaType = item?.media_type === "tv" || (!item?.title && item?.name) ? "Show" : "Movie";
  const href = item ? getHref(item) : "/trending";

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
          <p className="eyebrow">{fallback ? "Cinema starts here" : "Featured now"}</p>
          <h1>{title}</h1>
          <div className="hero-meta">
            <span>{year}</span>
            <span>{mediaType}</span>
            <RatingBadge rating={item?.vote_average} />
          </div>
          <p>{description}</p>
          <div className="hero-actions">
            <Link href={href}>
              <Button variant="contained" color="primary">
                View Details
              </Button>
            </Link>
            <Link href="/trending">
              <Button variant="outlined" color="inherit">
                Browse Trending
              </Button>
            </Link>
          </div>
        </div>
        <div className="hero-poster" aria-hidden={fallback}>
          <Image
            src={item?.poster_path ? `${img500}${item.poster_path}` : unavailable}
            alt={`${title} poster`}
            width={500}
            height={750}
            priority
          />
        </div>
      </div>
    </section>
  );
}
