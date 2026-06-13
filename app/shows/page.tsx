import type { Metadata } from "next";
import MediaListPage from "@/components/items/MediaListPage";

export const metadata: Metadata = {
  title: "Popular TV Shows",
};

export default function ShowsPage() {
  return (
    <MediaListPage mediaType="tv" filter="popular" title="Popular TV Shows" />
  );
}
