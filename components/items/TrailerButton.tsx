"use client";

import { useState } from "react";
import { Box, Button, Modal } from "@mui/material";
import YouTubeIcon from "@mui/icons-material/YouTube";

export default function TrailerButton({
  title,
  videoKey,
}: {
  title: string;
  videoKey: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <Button
        variant="contained"
        startIcon={<YouTubeIcon />}
        color="primary"
        onClick={() => setOpen(true)}
        aria-label={`Play trailer for ${title}`}
        sx={{ mt: 1 }}
      >
        Trailer
      </Button>
      <Modal
        open={open}
        onClick={() => setOpen(false)}
        aria-labelledby="trailer-modal-title"
        aria-describedby="trailer-modal-description"
      >
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
          onClick={() => setOpen(false)}
        >
          <iframe
            title={`Trailer for ${title}`}
            width="85%"
            height="85%"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            src={`https://www.youtube.com/embed/${videoKey}?autoplay=1&mute=1`}
          />
        </Box>
      </Modal>
    </div>
  );
}
