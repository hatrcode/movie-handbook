import type { Metadata } from "next";
import { Typography } from "@mui/material";
import SearchBar from "@/components/SearchBar";

export const metadata: Metadata = {
  title: "Movie Handbook",
};

export default function HomePage() {
  return (
    <main className="main-page">
      <Typography variant="h3" component="h1" gutterBottom align="center">
        Movie Handbook
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        Search your favorite movies.
      </Typography>
      <div style={{ marginTop: "1rem" }}>
        <SearchBar />
      </div>
    </main>
  );
}
