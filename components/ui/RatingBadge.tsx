const RADIUS = 14;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

function scoreColor(score: number) {
  if (score >= 7) return "#4ade80";
  if (score >= 4) return "#facc15";
  return "#f87171";
}

export default function RatingBadge({ rating }: { rating?: number }) {
  if (typeof rating !== "number" || Number.isNaN(rating)) {
    return null;
  }

  const score = Math.min(10, Math.max(0, rating));
  const color = scoreColor(score);
  const filled = (score / 10) * CIRCUMFERENCE;
  const gap = CIRCUMFERENCE - filled;

  return (
    <span className="rating-badge" aria-label={`Score ${score.toFixed(1)} out of 10`}>
      <svg width="36" height="36" viewBox="0 0 36 36" aria-hidden="true">
        <circle cx="18" cy="18" r={RADIUS} fill="rgba(0,0,0,0.82)" />
        <circle
          cx="18" cy="18" r={RADIUS}
          fill="none"
          stroke="rgba(255,255,255,0.1)"
          strokeWidth="2.5"
        />
        <circle
          cx="18" cy="18" r={RADIUS}
          fill="none"
          stroke={color}
          strokeWidth="2.5"
          strokeDasharray={`${filled} ${gap}`}
          strokeLinecap="round"
          transform="rotate(-90 18 18)"
        />
        <text
          x="18" y="18"
          textAnchor="middle"
          dominantBaseline="central"
          fill="#fff"
          fontSize="9.5"
          fontWeight="700"
          fontFamily="system-ui, sans-serif"
        >
          {score.toFixed(1)}
        </text>
      </svg>
    </span>
  );
}
