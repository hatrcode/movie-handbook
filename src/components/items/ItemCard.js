import React, { useState } from "react";
import { Link } from "gatsby";
import { img_300, unavailable } from "../../constants/links";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import { Box } from "@mui/system";

const ItemCard = ({ movie }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  // Controller for Popover
  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handlePopoverClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);

  const {
    id,
    title,
    name,
    profile_path,
    media_type,
    poster_path,
    overview,
    vote_average,
    release_date,
    first_air_date,
  } = movie;

  // Set type
  let type = "";

  if (media_type === "person") {
    type = "person";
  } else if (title) {
    type = "movie";
  } else {
    type = "show";
  }

  const imgUrl = poster_path || profile_path;
  const year =
    release_date || first_air_date
      ? new Date(release_date || first_air_date).getFullYear()
      : "";

  return (
    <Box container>
      <Box
        onMouseEnter={handlePopoverOpen}
        onMouseLeave={handlePopoverClose}
        sx={{
          position: "relative",
          display: "inline-block",
          lineHeight: 0,
        }}>
        <img
          src={imgUrl ? `${img_300}${imgUrl}` : unavailable}
          alt={title || name}
          style={{ width: 150 }}
        />
        <div className="movie-info">
          <p style={{ marginBottom: "0" }}>{title || name}</p>
        </div>
        {media_type !== "person" && (
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
                    {`${title || name} (${year})`}
                    <Button
                      size="small"
                      variant="contained"
                      disabled
                      sx={{ ml: 1 }}>
                      TMDb: {vote_average}
                    </Button>
                  </Typography>
                  <Typography variant="body2">
                    {overview.split(".")[0]}.
                  </Typography>
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
        )}
      </Box>
    </Box>
  );
};

export default ItemCard;
