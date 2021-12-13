import React, { useState, useEffect } from "react";
import { Link } from "gatsby";
import { img_300, img_500, img_1920, unavailable } from "../../constants/links";
import Layout from "../../components/layout/Layout";
import Seo from "../../components/layout/SEO";
import { Typography, Button, Grid, Box, Modal, Container } from "@mui/material";
import YouTubeIcon from "@mui/icons-material/YouTube";
import PeopleCard from "../../components/items/PeopleCard";
import { dateConvert } from "../../config/dateConvert";

const TvTemplate = ({ params }) => {
  const [content, setContent] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  //   const siteUrl = location.href ? location.href : "";
  //   const itemID = siteUrl.substring(siteUrl.lastIndexOf("/") + 1);

  const url = `https://api.themoviedb.org/3/tv/${params.id}?api_key=${process.env.GATSBY_TMDB_API}&append_to_response=external_ids,keywords,credits,videos,similar`;

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
    const style = {
      position: "fixed",
      zIndex: 5,
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    };

    const {
      name,
      original_name,
      tagline,
      genres,
      backdrop_path,
      poster_path,
      overview,
      budget,
      revenue,
      status,
      networks,
      vote_average,
      first_air_date,
      last_air_date,
      created_by,
      production_companies,
      number_of_seasons,
      number_of_episodes,
      keywords,
      credits,
      videos,
      similar,
    } = content;

    console.log(content);

    const year = new Date(first_air_date).getFullYear();

    const cardTitle = `${name} (${year})`;

    const creatorList = created_by
      ? created_by.map((creator) => {
          return creator.name;
        })
      : null;

    const genreList = genres
      ? genres.map((gen) => {
          return gen.name;
        })
      : null;

    const networkList = networks
      ? networks.map((n) => {
          return n.name;
        })
      : null;

    const peopleList = credits ? credits.cast.slice(0, 8) : null;

    const videoList = videos.results.filter(
      (video) => video.type === "Trailer"
    );

    return (
      <Layout>
        <Seo title={name} />
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
                {/* Add backdrop image  */}
                <Grid item xs={12} sm={4} md={3}>
                  <div style={{ maxWidth: "100%", height: "auto" }}>
                    <img
                      src={
                        poster_path ? `${img_500}${poster_path}` : unavailable
                      }
                      alt={name}
                      width="100%"
                    />
                  </div>
                </Grid>

                <Grid item xs={12} sm={8} md={9}>
                  <Box
                    component="div"
                    sx={{
                      color: "white",
                      display: "flex",
                      flexDirection: "column",
                      gap: "1rem",
                    }}>
                    <Typography
                      variant="h4"
                      component="h1"
                      sx={{ color: "white" }}>
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
                      {creatorList.length > 0 ? (
                        <p>
                          <strong>Creator</strong>:{" "}
                          <span>{creatorList.join(", ")}</span>
                        </p>
                      ) : null}
                      {genreList.length > 0 ? (
                        <p>
                          <strong>Genre</strong>:{" "}
                          <span>{genreList.join(", ")}</span>
                        </p>
                      ) : null}
                    </div>
                    {videoList.length > 0 ? (
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
                          <Box sx={style} onClick={handleClose}>
                            <iframe
                              title={cardTitle}
                              width="85%"
                              height="85%"
                              src={`https://www.youtube.com/embed/${videoList[0].key}?autoplay=1&mute=1`}></iframe>
                          </Box>
                        </Modal>
                      </div>
                    ) : null}
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </div>
          {/* 2nd section including Cast, Information */}
          <Box
            component="div"
            sx={{
              p: { xs: "2rem 1rem", sm: "2rem", md: "3rem" },
            }}>
            <Grid container spacing={4}>
              {/* Cast section */}
              <Grid item xs={12} sm={8}>
                <Typography variant="h5" component="h2" gutterBottom>
                  Show Cast
                </Typography>
                {peopleList ? (
                  <div className="scroller-wrap is-fading">
                    <div className="scroller">
                      {peopleList.map((people) => (
                        <PeopleCard key={people.id} people={people} />
                      ))}
                    </div>
                  </div>
                ) : null}
              </Grid>

              {/* Information section */}
              <Grid item xs={12} sm={4}>
                <Typography variant="h5" component="h2" gutterBottom>
                  Information
                </Typography>
                {original_name ? (
                  <p>
                    <strong>Original name</strong>: {original_name}
                  </p>
                ) : null}
                {status ? (
                  <p>
                    <strong>Status</strong>: {status}
                  </p>
                ) : null}
                {creatorList ? (
                  <p>
                    <strong>Networks</strong>:{" "}
                    <span>{networkList.join(", ")}</span>
                  </p>
                ) : null}
                {first_air_date ? (
                  <p>
                    <strong>First air date</strong>:{" "}
                    {dateConvert(first_air_date)}
                  </p>
                ) : null}
                {last_air_date ? (
                  <p>
                    <strong>Last air date</strong>: {dateConvert(last_air_date)}
                  </p>
                ) : null}
                {number_of_seasons ? (
                  <p>
                    <strong>No. of seasons</strong>: {number_of_seasons}
                  </p>
                ) : null}
                {number_of_episodes ? (
                  <p>
                    <strong>No. of episodes</strong>: {number_of_episodes}
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
                    {keywords.results.map((k) => (
                      <Button variant="outlined" disabled key={k.id}>
                        {k.name}
                      </Button>
                    ))}
                  </div>
                ) : null}
              </Grid>
            </Grid>

            {/* Recommendation section */}
            {similar ? (
              <div>
                <hr style={{ margin: "1rem 0" }} />
                <Typography variant="h5" component="h2" gutterBottom>
                  You may also like
                </Typography>
                <div className="scroller-wrap is-fading">
                  <div className="scroller">
                    {similar.results.slice(0, 9).map((movie) => (
                      <Link to={`/tv/${movie.id}`}>
                        <Box
                          sx={{
                            position: "relative",
                            display: "inline-block",
                            lineHeight: 0,
                          }}>
                          <img
                            src={
                              movie.poster_path
                                ? `${img_300}${movie.poster_path}`
                                : unavailable
                            }
                            alt={movie.title}
                            width="100%"
                          />
                          <div className="movie-info">
                            <p style={{ marginBottom: "0" }}>{movie.title}</p>
                          </div>
                        </Box>
                      </Link>
                    ))}
                  </div>
                </div>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                  }}>
                  <Link to="/shows">
                    <Button
                      variant="contained"
                      sx={{ backgroundColor: "black", color: "white", mt: 2 }}>
                      All TV shows
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

export default TvTemplate;
