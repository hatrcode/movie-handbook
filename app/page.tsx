import type { Metadata } from "next";
import HomePageClient from "@/components/HomePageClient";

export const metadata: Metadata = {
  title: "Movie Handbook",
};

export default function HomePage() {
  return <HomePageClient />;
}
