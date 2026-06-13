import type { Metadata } from "next";
import MediaListPage from "@/components/items/MediaListPage";

export const metadata: Metadata = {
  title: "Top Rated Movies",
};

export default function TopRatedMoviesPage() {
  return (
    <MediaListPage
      mediaType="movie"
      filter="top_rated"
      title="Top Rated Movies"
    />
  );
}
