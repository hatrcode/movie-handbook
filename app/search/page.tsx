import type { Metadata } from "next";
import { Suspense } from "react";
import SearchPageClient from "@/components/SearchPageClient";

export const metadata: Metadata = {
  title: "Search",
};

export default function SearchPage() {
  return (
    <Suspense fallback={<main className="main-page">Loading...</main>}>
      <SearchPageClient />
    </Suspense>
  );
}
