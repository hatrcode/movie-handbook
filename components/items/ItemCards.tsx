import ItemCard from "@/components/items/ItemCard";
import type { MediaItem } from "@/lib/tmdb";

export default function ItemCards({ content }: { content: MediaItem[] }) {
  return (
    <div className="item-list">
      {content.map((movie) => (
        <ItemCard movie={movie} key={`${movie.media_type || "item"}-${movie.id}`} />
      ))}
    </div>
  );
}
