import type { Metadata } from "next";
import MediaListPage from "@/components/items/MediaListPage";

export const metadata: Metadata = {
  title: "Top-rate Movies",
};

export default function TopRatedMoviesPage() {
  return (
    <MediaListPage
      mediaType="movie"
      filter="top_rated"
      title="Top-rate Movies"
    />
  );
}
