import type { Metadata } from "next";
import MediaListPage from "@/components/items/MediaListPage";

export const metadata: Metadata = {
  title: "Popular movies",
};

export default function MoviesPage() {
  return (
    <MediaListPage mediaType="movie" filter="popular" title="Popular movies" />
  );
}
