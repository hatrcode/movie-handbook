import React from "react";
import { Link } from "gatsby";
import { useFetch } from "../hooks/useFetch";
import { img_500, img_1920, unavailable } from "../constants/links";
import Layout from "../components/layout/Layout";
import Seo from "../components/layout/SEO";
import { Typography, Button, Grid, Box } from "@mui/material";
import { singleMovie } from "../constants/singleMovie";
import YouTubeIcon from "@mui/icons-material/YouTube";
import PeopleCard from "../components/PeopleCard";
import MovieCard from "../components/MovieCard";

const MovieTemplate = ({ media_type, media_id }) => {
  // const url = `https://api.themoviedb.org/3/${media_type}/${media_id}?api_key=${process.env.GATSBY_TMDB_API}&language=en-US&append_to_response=external_ids,keywords,credits,videos,similar`;
  // const { content, loading } = useFetch(url);

  const {
    title,
    name,
    tagline,
    genres,
    backdrop_path,
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
    number_of_seasons,
    number_of_episodes,
    keywords,
    credits,
    videos,
    similar,
  } = singleMovie;

  let type = "";

  if (media_type === "movie") {
    type = "movies";
  } else {
    type = "series";
  }

  const year = new Date(release_date || first_air_date).getFullYear();

  const defaultTitle = title || name;
  const cardTitle = `${defaultTitle} (${year})`;

  // const actorList = credits.cast.filter(
  //   (actor) => actor.known_for_department == "Acting"
  // );

  const directorList = credits.crew.filter(
    (director) =>
      director.job == "Executive Producer" &&
      director.known_for_department == "Directing"
  );

  const genreList = genres.map((gen) => {
    return gen.name;
  });

  console.log("director", directorList);

  const peopleList = credits.cast.slice(0, 8);

  return (
    <Layout>
      <Seo title="Movies" />
      <div
        style={{
          minHeigh: "100%",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundImage: `url(${img_1920}${backdrop_path})`,
        }}>
        <Box
          component="div"
          sx={{
            p: { xs: "2rem 1rem", sm: "2rem", md: "3rem" },
            backgroundImage:
              "linear-gradient(to right, rgba(9.02%, 5.10%, 5.49%, 1.00) 150px, rgba(9.02%, 5.10%, 5.49%, 0.84) 100%)",
          }}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={4} md={3}>
              <div style={{ maxWidth: "100%", height: "auto" }}>
                <img
                  src={poster_path ? `${img_500}${poster_path}` : unavailable}
                  alt={title || name}
                  width="100%"
                />
              </div>
            </Grid>
            <Grid item xs={12} sm={8} md={9}>
              <Box component="div" sx={{ color: "white" }}>
                <Typography
                  variant="h4"
                  component="h1"
                  sx={{ color: "white" }}
                  gutterBottom>
                  {cardTitle}{" "}
                  <Button variant="outlined">IMDb: {vote_average}</Button>
                </Typography>
                {tagline && <p>{tagline}</p>}
                <p>{overview}</p>
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
                {number_of_seasons && (
                  <p>
                    <strong>No. of seasons</strong>: {number_of_seasons}
                  </p>
                )}
                {number_of_episodes && (
                  <p>
                    <strong>No. of episodes</strong>: {number_of_seasons}
                  </p>
                )}
                <div>
                  {directorList && (
                    <p>
                      <strong>Director</strong>:{" "}
                      {directorList.map((dr) => (
                        <span key={dr.id}>{dr.name}</span>
                      ))}
                    </p>
                  )}
                  {genreList && (
                    <p>
                      <strong>Genre</strong>:{" "}
                      <span>{genreList.join(", ")}</span>
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
        </Box>
      </div>
      <Box
        component="div"
        sx={{
          p: { xs: "2rem 1rem", sm: "2rem", md: "3rem" },
        }}>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={8}>
            <Typography variant="h5" component="h2" gutterBottom>
              Top Cast
            </Typography>
            <div className="scroller-wrap is-fading">
              <div className="scroller">
                {peopleList.map((people) => (
                  <PeopleCard key={people.id} people={people} />
                ))}
              </div>
            </div>
            <div className="scroller">
              {similar.results.map((movie) => (
                <MovieCard movie={movie} key={movie.id} />
              ))}
            </div>
            {/* <Box
              sx={{
                display: "flex",
                justifyContent: "center",
              }}>
              <Link to={`/${type}`}>
                <Button variant="contained">All {type}</Button>
              </Link>
            </Box> */}
          </Grid>
          <Grid item xs={12} sm={4}>
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
      </Box>
    </Layout>
  );
};

export default MovieTemplate;
