"use client";

import { useEffect } from "react";
import { Chip } from "@mui/material";
import { buildGenresUrl, type Genre, type MediaType } from "@/lib/tmdb";

export default function Genres({
  selectedGenres,
  setSelectedGenres,
  genres,
  setGenres,
  type,
  setPage,
}: {
  selectedGenres: Genre[];
  setSelectedGenres: (genres: Genre[]) => void;
  genres: Genre[];
  setGenres: (genres: Genre[]) => void;
  type: MediaType;
  setPage: (page: number) => void;
}) {
  const handleAdd = (genre: Genre) => {
    setSelectedGenres([...selectedGenres, genre]);
    setGenres(genres.filter((item) => item.id !== genre.id));
    setPage(1);
  };

  const handleRemove = (genre: Genre) => {
    setSelectedGenres(
      selectedGenres.filter((selected) => selected.id !== genre.id)
    );
    setGenres([...genres, genre]);
    setPage(1);
  };

  useEffect(() => {
    let ignore = false;

    async function fetchGenres() {
      try {
        const response = await fetch(buildGenresUrl(type));
        const data = await response.json();

        if (!ignore) {
          setGenres(data.genres || []);
        }
      } catch (err) {
        console.error(err);
        if (!ignore) {
          setGenres([]);
        }
      }
    }

    fetchGenres();

    return () => {
      ignore = true;
      setGenres([]);
    };
  }, [setGenres, type]);

  return (
    <div style={{ padding: "6px 0" }}>
      {selectedGenres.map((genre) => (
        <Chip
          style={{ margin: 2 }}
          label={genre.name}
          key={genre.id}
          color="primary"
          clickable
          size="small"
          onDelete={() => handleRemove(genre)}
        />
      ))}
      {genres.map((genre) => (
        <Chip
          style={{ margin: 2 }}
          label={genre.name}
          key={genre.id}
          clickable
          size="small"
          onClick={() => handleAdd(genre)}
        />
      ))}
    </div>
  );
}
