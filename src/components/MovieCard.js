import React from "react";
import { Link } from "gatsby";
import { img_300, unavailable } from "../constants/links";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import { Box } from "@mui/system";

const MovieCard = ({ movie }) => {
  const {
    id,
    title,
    name,
    poster_path,
    overview,
    vote_average,
    release_date,
    first_air_date,
  } = movie;

  let type = "";

  if (title) {
    type = "movie";
  } else {
    type = "show";
  }

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  const year = new Date(release_date || first_air_date).getFullYear();

  const defaultTitle = title || name;
  const cardTitle = `${defaultTitle} (${year})`;
  const text = overview.split(".")[0];
  return (
    <Box
      onMouseEnter={handlePopoverOpen}
      onMouseLeave={handlePopoverClose}
      sx={{
        position: "relative",
        display: "inline-block",
        lineHeight: 0,
      }}>
      <img
        src={poster_path ? `${img_300}${poster_path}` : unavailable}
        alt={defaultTitle}
        width="100%"
      />
      <div className="movie-info">
        <p style={{ marginBottom: "0" }}>{defaultTitle}</p>
      </div>
      <div>
        <Popover
          id="mouse-over-popover"
          sx={{
            pointerEvents: "none",
          }}
          open={open}
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: "center",
            horizontal: "center",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
          onClose={handlePopoverClose}
          disableRestoreFocus>
          <Card sx={{ maxWidth: 300, pointerEvents: "auto" }}>
            <CardContent>
              <Typography variant="h6" component="h3" gutterBottom>
                {cardTitle}
                <Button
                  size="small"
                  variant="contained"
                  disabled
                  sx={{ ml: 1 }}>
                  TMDb: {vote_average}
                </Button>
              </Typography>
              <Typography variant="body2">{text}.</Typography>
              <Link to={`/${type}/${id}`} state={{ id: id }}>
                <Button
                  size="small"
                  variant="contained"
                  sx={{ backgroundColor: "black", color: "white", mt: 1 }}>
                  Learn More
                </Button>
              </Link>
            </CardContent>
          </Card>
        </Popover>
      </div>
    </Box>
  );
};

export default MovieCard;
