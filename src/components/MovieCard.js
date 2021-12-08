import React from "react";
import { img_300, unavailable } from "../constants/links";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import IconButton from "@mui/material/IconButton";
import InfoIcon from "@mui/icons-material/Info";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import { Box } from "@mui/system";

const MovieCard = ({ movie }) => {
  const {
    title,
    name,
    poster_path,
    overview,
    vote_average,
    release_date,
    first_air_date,
  } = movie;

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
    <Box container sx={{ width: { xs: 150, sm: 185 } }}>
      <ImageListItem
        onMouseEnter={handlePopoverOpen}
        onMouseLeave={handlePopoverClose}>
        <img
          src={poster_path ? `${img_300}${poster_path}` : unavailable}
          alt={title}
          loading="lazy"
        />
        <ImageListItemBar
          subtitle={cardTitle}
          sx={{ fontSize: "0.5rem" }}
          actionIcon={
            <IconButton
              sx={{ color: "rgba(255, 255, 255, 0.54)" }}
              aria-label={`info about ${title || name} `}>
              <InfoIcon />
            </IconButton>
          }
        />
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
                {/* <Button
                  size="small"
                  variant="contained"
                  sx={{ backgroundColor: "black", color: "white", mt: 1 }}>
                  Learn More
                </Button> */}
              </CardContent>
            </Card>
          </Popover>
        </div>
      </ImageListItem>
    </Box>
  );
};

export default MovieCard;
