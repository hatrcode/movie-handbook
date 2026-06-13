"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import { Box } from "@mui/system";
import { img300, unavailable } from "@/lib/links";
import type { MediaItem } from "@/lib/tmdb";

export default function ItemCard({ movie }: { movie: MediaItem }) {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
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

  let type = "";

  if (media_type === "person") {
    type = "person";
  } else if (title || media_type === "movie") {
    type = "movie";
  } else {
    type = "show";
  }

  const imgUrl = poster_path || profile_path;
  const year =
    release_date || first_air_date
      ? new Date(release_date || first_air_date || "").getFullYear()
      : "";
  const label = title || name || "Untitled";
  const summary = overview ? `${overview.split(".")[0]}.` : "";

  return (
    <Box>
      <Box
        onMouseEnter={handlePopoverOpen}
        onMouseLeave={handlePopoverClose}
        sx={{
          position: "relative",
          display: "inline-block",
          lineHeight: 0,
        }}
      >
        <Image
          src={imgUrl ? `${img300}${imgUrl}` : unavailable}
          alt={label}
          width={150}
          height={225}
          style={{ width: 150, height: "auto" }}
        />
        <div className="movie-info">
          <p style={{ marginBottom: "0" }}>{label}</p>
        </div>
        {media_type !== "person" && type !== "person" && (
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
            disableRestoreFocus
          >
            <Card sx={{ maxWidth: 300, pointerEvents: "auto" }}>
              <CardContent>
                <Typography variant="h6" component="h3" gutterBottom>
                  {`${label}${year ? ` (${year})` : ""}`}
                  {typeof vote_average === "number" && (
                    <Button
                      size="small"
                      variant="contained"
                      disabled
                      sx={{ ml: 1 }}
                    >
                      TMDb: {vote_average}
                    </Button>
                  )}
                </Typography>
                {summary && <Typography variant="body2">{summary}</Typography>}
                <Link href={`/${type}/${id}`}>
                  <Button
                    size="small"
                    variant="contained"
                    sx={{ backgroundColor: "black", color: "white", mt: 1 }}
                  >
                    Learn More
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </Popover>
        )}
      </Box>
    </Box>
  );
}
