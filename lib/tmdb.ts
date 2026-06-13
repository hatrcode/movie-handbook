export type MediaType = "movie" | "tv";
export type TrendingMediaType = "all" | "movie" | "tv";

export type Genre = {
  id: number;
  name: string;
};

export type MediaItem = {
  id: number;
  title?: string;
  name?: string;
  profile_path?: string | null;
  media_type?: "movie" | "tv" | "person";
  poster_path?: string | null;
  overview?: string;
  vote_average?: number;
  release_date?: string;
  first_air_date?: string;
};

export type PersonCredit = {
  id: number;
  name: string;
  character?: string;
  profile_path?: string | null;
};

export type Video = {
  key: string;
  type: string;
};

export type MovieDetails = {
  id: number;
  title?: string;
  tagline?: string;
  genres?: Genre[];
  backdrop_path?: string | null;
  poster_path?: string | null;
  overview?: string;
  budget?: number;
  revenue?: number;
  status?: string;
  vote_average?: number;
  release_date?: string;
  production_companies?: { id: number; name: string }[];
  runtime?: number;
  keywords?: { keywords: Genre[] };
  credits?: {
    cast: PersonCredit[];
    crew: {
      id: number;
      name: string;
      job: string;
      known_for_department: string;
    }[];
  };
  videos?: { results: Video[] };
  similar?: { results: MediaItem[] };
};

export type ShowDetails = {
  id: number;
  name?: string;
  original_name?: string;
  tagline?: string;
  genres?: Genre[];
  backdrop_path?: string | null;
  poster_path?: string | null;
  overview?: string;
  budget?: number;
  revenue?: number;
  status?: string;
  networks?: { id: number; name: string }[];
  vote_average?: number;
  first_air_date?: string;
  last_air_date?: string;
  created_by?: { id: number; name: string }[];
  production_companies?: { id: number; name: string }[];
  number_of_seasons?: number;
  number_of_episodes?: number;
  keywords?: { results: Genre[] };
  credits?: { cast: PersonCredit[] };
  videos?: { results: Video[] };
  similar?: { results: MediaItem[] };
};

const baseUrl = "https://api.themoviedb.org/3";

export function getTmdbApiKey() {
  return process.env.NEXT_PUBLIC_TMDB_API || "";
}

export function getGenreQuery(selectedGenres: Genre[]) {
  return selectedGenres.map((genre) => genre.id).join(",");
}

export function buildMediaListUrl(
  mediaType: MediaType,
  filter: string,
  page: number,
  selectedGenres: Genre[] = []
) {
  const params = new URLSearchParams({
    api_key: getTmdbApiKey(),
    include_adult: "false",
    page: String(page),
  });

  const genreQuery = getGenreQuery(selectedGenres);

  if (genreQuery) {
    params.set("with_genres", genreQuery);
  }

  return `${baseUrl}/${mediaType}/${filter}?${params.toString()}`;
}

export function buildGenresUrl(mediaType: MediaType) {
  const params = new URLSearchParams({
    api_key: getTmdbApiKey(),
    language: "en-US",
  });

  return `${baseUrl}/genre/${mediaType}/list?${params.toString()}`;
}

export function buildTrendingUrl(
  mediaType: TrendingMediaType,
  time: string,
  page: number
) {
  const params = new URLSearchParams({
    api_key: getTmdbApiKey(),
    language: "en-US",
    sort_by: "popularity.desc",
    include_adult: "false",
    include_video: "false",
    page: String(page),
  });

  return `${baseUrl}/trending/${mediaType}/${time}?${params.toString()}`;
}

export function buildSearchUrl(query: string) {
  const params = new URLSearchParams({
    api_key: getTmdbApiKey(),
    language: "en-US",
    query,
    page: "1",
    include_adult: "false",
  });

  return `${baseUrl}/search/multi?${params.toString()}`;
}

export function buildDetailUrl(mediaType: MediaType, id: string) {
  const params = new URLSearchParams({
    api_key: getTmdbApiKey(),
    append_to_response: "external_ids,keywords,credits,videos,similar",
  });

  return `${baseUrl}/${mediaType}/${id}?${params.toString()}`;
}
