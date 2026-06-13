import type { Metadata } from "next";
import { Suspense } from "react";
import TrendingPageClient from "@/components/TrendingPageClient";

export const metadata: Metadata = {
  title: "Trending",
};

export default function TrendingPage() {
  return (
    <Suspense fallback={<main className="main-page">Loading...</main>}>
      <TrendingPageClient />
    </Suspense>
  );
}
