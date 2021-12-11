import React, { useState, useEffect } from "react";
import { Link } from "gatsby";
import { img_500, img_1920, unavailable } from "../../constants/links";
import Layout from "../../components/layout/Layout";
import Seo from "../../components/layout/SEO";
import { Typography, Button, Grid, Box, Modal, Container } from "@mui/material";
import YouTubeIcon from "@mui/icons-material/YouTube";
import PeopleCard from "../../components/PeopleCard";
import MovieCard from "../../components/MovieCard";

const MovieTrial = ({ params }) => {
  const [content, setContent] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  //   const siteUrl = location.href ? location.href : null;
  //   const itemID = siteUrl.substring(siteUrl.lastIndexOf("/") + 1);

  const url = `https://api.themoviedb.org/3/movie/${params.id}?api_key=${process.env.GATSBY_TMDB_API}&append_to_response=external_ids,keywords,credits,videos,similar`;

  // fetch content
  const fetchData = async () => {
    const response = await fetch(url);
    const data = await response.json();
    setContent(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line
  }, [url]);

  console.log("content", content);

  // Show loading before finish fetching data, or normal page after finished.
  if (loading) {
    return (
      <Layout>
        <Seo title="Movie" />
        <Container>
          <h2>Loading...</h2>
        </Container>
      </Layout>
    );
  } else {
    const {
      title,
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
      production_companies,
      runtime,
      keywords,
      credits,
      videos,
      similar,
    } = content;

    const year = new Date(release_date).getFullYear();

    const cardTitle = `${title} (${year})`;

    const directorList = credits
      ? credits.crew.filter(
          (director) =>
            director.job === "Executive Producer" &&
            director.known_for_department === "Directing"
        )
      : null;

    const genreList = genres
      ? genres.map((gen) => {
          return gen.name;
        })
      : null;

    const peopleList = credits ? credits.cast.slice(0, 8) : null;

    const videoList = videos.results.filter(
      (video) => video.type === "Trailer"
    );

    return (
      <Layout>
        <Seo title={title} />
        <div>
          <div
            style={{
              minHeight: "100%",
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
                      src={
                        poster_path ? `${img_500}${poster_path}` : unavailable
                      }
                      alt={title}
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
                      <Button variant="outlined" color="warning">
                        IMDb: {vote_average}
                      </Button>
                    </Typography>
                    {tagline ? (
                      <Typography
                        variant="body2"
                        sx={{ fontStyle: "italic", color: "gray" }}
                        gutterBottom>
                        {tagline}
                      </Typography>
                    ) : null}
                    {overview ? <p>{overview}</p> : null}
                    <div>
                      {year ? (
                        <p>
                          <strong>Released</strong>: {year}
                        </p>
                      ) : null}
                      {runtime ? (
                        <p>
                          <strong>Duration</strong>: {Math.floor(runtime / 60)}h{" "}
                          {runtime % 60}m
                        </p>
                      ) : null}
                    </div>
                    <div>
                      {directorList.lenght > 0 ? (
                        <p>
                          <strong>Director</strong>:{" "}
                          {directorList.map((dr) => (
                            <span key={dr.id}>{dr.name}</span>
                          ))}
                        </p>
                      ) : null}
                      {genreList.lenght > 0 ? (
                        <p>
                          <strong>Genre</strong>:{" "}
                          <span>{genreList.join(", ")}</span>
                        </p>
                      ) : null}
                    </div>
                    {videoList.lenght > 0 ? (
                      <div>
                        <Button
                          variant="contained"
                          startIcon={<YouTubeIcon />}
                          color="primary"
                          onClick={handleOpen}
                          sx={{ mt: 1 }}>
                          Trailer
                        </Button>
                        <Modal
                          open={open}
                          onClick={handleClose}
                          aria-labelledby="modal-modal-title"
                          aria-describedby="modal-modal-description">
                          <Box
                            sx={{
                              position: "fixed",
                              zIndex: 5,
                              top: 0,
                              left: 0,
                              width: "100%",
                              height: "100%",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                            onClick={handleClose}>
                            <iframe
                              title={cardTitle}
                              width="85%"
                              height="85%"
                              src={`https://www.youtube.com/embed/${videos.results[0].key}?autoplay=1&mute=1`}></iframe>
                          </Box>
                        </Modal>
                      </div>
                    ) : null}
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
              {peopleList ? (
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
                </Grid>
              ) : null}
              <Grid item xs={12} sm={4}>
                {status ? (
                  <p>
                    <strong>Status</strong>: {status}
                  </p>
                ) : null}
                {budget ? (
                  <p>
                    <strong>Budget</strong>: ${budget.toLocaleString("en-US")}
                  </p>
                ) : null}
                {revenue ? (
                  <p>
                    <strong>Revenue</strong>: ${revenue.toLocaleString("en-US")}
                  </p>
                ) : null}
                {production_companies ? (
                  <div>
                    <p>
                      <strong>Production companies</strong>
                    </p>
                    {production_companies.map((pc) => (
                      <li key={pc.id}>{pc.name}</li>
                    ))}
                  </div>
                ) : null}
                {keywords ? (
                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: "10px",
                      marginTop: "0.5rem",
                    }}>
                    {keywords.keywords.map((k) => (
                      <Button variant="outlined" disabled key={k.id}>
                        {k.name}
                      </Button>
                    ))}
                  </div>
                ) : null}
              </Grid>
            </Grid>
            {similar ? (
              <div>
                <hr style={{ margin: "1rem 0" }} />
                <Typography variant="h5" component="h2" gutterBottom>
                  You may also like
                </Typography>
                <div className="scroller-wrap is-fading">
                  <div className="scroller">
                    {similar.results.slice(0, 9).map((movie) => (
                      <Box
                        container
                        key={movie.id}
                        sx={{ minWidth: { xs: 100, sm: 150, md: 175 } }}>
                        <MovieCard movie={movie} />
                      </Box>
                    ))}
                  </div>
                </div>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                  }}>
                  <Link to="/movies">
                    <Button
                      variant="contained"
                      sx={{ backgroundColor: "black", color: "white", mt: 2 }}>
                      All movies
                    </Button>
                  </Link>
                </Box>
              </div>
            ) : null}
          </Box>
        </div>
      </Layout>
    );
  }
};

export default MovieTrial;
