import type { Metadata } from "next";
import MediaListPage from "@/components/items/MediaListPage";

export const metadata: Metadata = {
  title: "Top Rated TV Shows",
};

export default function TopRatedShowsPage() {
  return (
    <MediaListPage
      mediaType="tv"
      filter="top_rated"
      title="Top Rated TV Shows"
    />
  );
}
