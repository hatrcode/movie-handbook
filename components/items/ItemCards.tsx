import MediaCard from "@/components/ui/MediaCard";
import type { MediaItem } from "@/lib/tmdb";

export default function ItemCards({ content }: { content: MediaItem[] }) {
  return (
    <div className="item-list">
      {content.map((movie) => (
        <MediaCard item={movie} key={`${movie.media_type || "item"}-${movie.id}`} />
      ))}
    </div>
  );
}
