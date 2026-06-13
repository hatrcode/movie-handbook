"use client";

import Image from "next/image";
import Link from "next/link";
import RatingBadge from "@/components/ui/RatingBadge";
import { img300, unavailable } from "@/lib/links";
import { getYear } from "@/lib/date";
import type { MediaItem } from "@/lib/tmdb";

function getMediaHref(item: MediaItem) {
  if (item.media_type === "person") return null;
  if (item.media_type === "tv") return `/show/${item.id}`;
  if (item.media_type === "movie") return `/movie/${item.id}`;
  // no media_type (list endpoints): use title vs name as heuristic
  if (item.name && !item.title) return `/show/${item.id}`;
  return `/movie/${item.id}`;
}

export default function MediaCard({
  item,
  compact = false,
}: {
  item: MediaItem;
  compact?: boolean;
}) {
  const label = item.title || item.name || "Untitled";
  const href = getMediaHref(item);
  const imgUrl = item.poster_path || item.profile_path;
  const date = item.release_date || item.first_air_date;
  const year = date ? getYear(date) : null;
  const type = item.media_type === "tv" || (!item.title && item.name) ? "Show" : "Movie";
  const card = (
    <article className={`media-card ${compact ? "media-card-compact" : ""}`}>
      <div className="media-card-poster">
        <Image
          src={imgUrl ? `${img300}${imgUrl}` : unavailable}
          alt={`${label} poster`}
          width={300}
          height={450}
          sizes={compact ? "160px" : "(max-width: 700px) 45vw, 210px"}
        />
        <div className="media-card-glow" />
        <div className="media-card-score">
          <RatingBadge rating={item.vote_average} />
        </div>
        {item.overview && !compact && (
          <div className="media-card-overlay">
            <p>{item.overview}</p>
          </div>
        )}
      </div>
      <div className="media-card-body">
        <div className="media-card-meta">
          <span>{year || "TBA"}</span>
          <span>{type}</span>
        </div>
        <h3>{label}</h3>
      </div>
    </article>
  );

  if (!href) {
    return card;
  }

  return (
    <Link href={href} className="media-card-link" aria-label={`View ${label}`}>
      {card}
    </Link>
  );
}
