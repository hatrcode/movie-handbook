import MediaCard from "@/components/ui/MediaCard";
import type { MediaItem } from "@/lib/tmdb";

export default function ItemCard({ movie }: { movie: MediaItem }) {
  return <MediaCard item={movie} />;
}
