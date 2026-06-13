import type { Metadata } from "next";
import MediaListPage from "@/components/items/MediaListPage";

export const metadata: Metadata = {
  title: "TV Shows Airing Today",
};

export default function ShowsAiringTodayPage() {
  return (
    <MediaListPage
      mediaType="tv"
      filter="airing_today"
      title="TV Shows Airing Today"
    />
  );
}
