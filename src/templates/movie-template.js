import React from "react";
import { Link } from "gatsby";
import { useFetch } from "../hooks/useFetch";
import { img_link, unavailable } from "../config/links";
import Layout from "../components/layout/Layout";
import Seo from "../components/layout/SEO";
import { Typography, Button, Grid, Box } from "@mui/material";
import { singleMovie } from "../constants/singleMovie";
import YouTubeIcon from "@mui/icons-material/YouTube";

const MovieTemplate = ({ media_type, id }) => {
  // const url = `https://api.themoviedb.org/3/${media_type}/${id}?api_key=${process.env.GATSBY_TMDB_API}&language=en-US&append_to_response=external_ids,keywords,credits,videos,similar`;
  // const { content, loading } = useFetch(url);

  const {
    id,
    title,
    name,
    tagline,
    genres,
    poster_path,
    overview,
    budget,
    revenue,
    status,
    vote_average,
    release_date,
    first_air_date,
    production_countries,
    production_companies,
    runtime,
    keywords,
    credits,
    videos,
    similar,
    number_of_seasons,
  } = singleMovie;

  let type = "";

  if (media_type === "movie") {
    type = "movies";
  } else {
    type = "series";
  }

  const year = new Date(release_date).getFullYear();

  const defaultTitle = title || name;
  const cardTitle = `${defaultTitle} (${year})`;

  const actorList = credits.cast.filter(
    (actor) => actor.known_for_department == "Acting"
  );

  const directorList = credits.crew.filter(
    (director) =>
      director.job == "Executive Producer" &&
      director.known_for_department == "Directing"
  );

  const genreList = genres.map((gen) => {
    return gen.name;
  });

  console.log("actor", actorList);
  console.log("director", directorList);

  return (
    <Layout>
      <Seo title="Movies" />
      <Box sx={{ p: { xs: "2rem 1rem", sm: "3rem" }, minHeight: "100%" }}>
        {/* <iframe
          width="420"
          height="315"
          src={`https://www.youtube.com/embed/${videos.results[0].key}`}></iframe> */}
        <Grid container spacing={2}>
          <Grid item xs={12} sm="auto">
            <img
              src={poster_path ? `${img_link}${poster_path}` : unavailable}
              alt={title || name}
            />
          </Grid>
          <Grid item xs={12} sm={9}>
            <Box component="div">
              <Typography variant="h4" component="h2" gutterBottom>
                {cardTitle}{" "}
                <Button variant="outlined">IMDb: {vote_average}</Button>
              </Typography>
              {tagline && <p>{tagline}</p>}
              <Typography variant="body1" gutterBottom>
                {overview}
              </Typography>
              <div>
                <p>
                  <strong>Released</strong>: {year}
                </p>
                {runtime && (
                  <p>
                    <strong>Duration</strong>: {Math.floor(runtime / 60)}h{" "}
                    {runtime % 60}m
                  </p>
                )}
              </div>
              <div>
                {directorList && (
                  <p>
                    <strong>Director</strong>:{" "}
                    {directorList.map((d) => (
                      <span>{d.name}</span>
                    ))}
                  </p>
                )}
                {genreList && (
                  <p>
                    <strong>Genre</strong>: <span>{genreList.join(", ")}</span>
                  </p>
                )}
              </div>
              <Button
                variant="contained"
                startIcon={<YouTubeIcon />}
                color="primary"
                target="__blank"
                href={`https://www.youtube.com/watch?v=${videos.results[0].key}`}>
                Trailer
              </Button>
            </Box>
          </Grid>
        </Grid>
        <hr style={{ margin: "1rem auto" }} />
        <Grid container spacing={2}>
          <Grid item xs={12} sm={9}>
            <Box>
              <p>Actors: </p>
            </Box>
          </Grid>
          <Grid item xs={12} sm={3}>
            {status && (
              <p>
                <strong>Status</strong>: {status}
              </p>
            )}
            {budget && (
              <p>
                <strong>Budget</strong>: ${budget.toLocaleString("en-US")}
              </p>
            )}
            {revenue && (
              <p>
                <strong>Revenue</strong>: ${revenue.toLocaleString("en-US")}
              </p>
            )}
            {production_companies && (
              <div>
                <p>
                  <strong>Production companies</strong>
                </p>
                {production_companies.map((pc) => (
                  <li key={pc.id}>{pc.name}</li>
                ))}
              </div>
            )}
            {keywords && (
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "10px",
                  marginTop: "0.5rem",
                }}>
                {keywords.keywords.map((k) => (
                  <Button variant="outlined" key={k.id}>
                    {k.name}
                  </Button>
                ))}
              </div>
            )}
          </Grid>
        </Grid>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
          }}>
          <Link to={`/${type}`}>
            <Button variant="contained">All {type}</Button>
          </Link>
        </Box>
      </Box>
    </Layout>
  );
};

export default MovieTemplate;
