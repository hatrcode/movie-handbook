export default function RatingBadge({ rating }: { rating?: number }) {
  if (typeof rating !== "number" || Number.isNaN(rating)) {
    return null;
  }

  return <span className="rating-badge">TMDB {rating.toFixed(1)}</span>;
}
