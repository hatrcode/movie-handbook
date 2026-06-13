export default function LoadingSkeleton({ count = 8 }: { count?: number }) {
  return (
    <div className="item-list" role="status" aria-label="Loading content">
      {Array.from({ length: count }).map((_, index) => (
        <div className="media-card media-card-skeleton" key={index}>
          <div className="skeleton-poster" />
          <div className="skeleton-line" />
          <div className="skeleton-line short" />
        </div>
      ))}
    </div>
  );
}
