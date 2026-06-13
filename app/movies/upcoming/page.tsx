import type { Metadata } from "next";
import MediaListPage from "@/components/items/MediaListPage";

export const metadata: Metadata = {
  title: "Upcoming Movies",
};

export default function UpcomingMoviesPage() {
  return (
    <MediaListPage
      mediaType="movie"
      filter="upcoming"
      title="Upcoming Movies"
    />
  );
}
