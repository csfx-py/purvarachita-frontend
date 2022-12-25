import Record from "../Assets/record.svg";
import "../404.css";
import { Button, Grid, Typography } from "@mui/material";
import { useState } from "react";
import lofi from "../Assets/lofi.mp3";

function Err() {
  const [isPlaying, setIsPlaying] = useState(false);

  const controlAudio = (control) => {
    const audio = document.querySelector("audio");
    if (control === "play") {
      audio.play();
      setIsPlaying(true);
    } else {
      audio.pause();
      setIsPlaying(false);
    }
  };

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      sx={{ height: "100vh" }}
    >
      <audio src={lofi} style={{ display: "none" }}></audio>
      <Grid
        item
        xs={12}
        md={6}
        sx={{
          display: "flex",
        }}
        justifyContent="center"
        alignItems="center"
      >
        <img
          src={Record}
          alt="Record"
          style={{
            width: "100%",
            height: "auto",
            maxWidth: "500px",
            maxHeight: "500px",
            animation: isPlaying ? "spin 10s linear infinite" : "none",
          }}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <Typography variant="h1" component="h1" gutterBottom>
          404
        </Typography>
        <Typography variant="h2" component="h2" gutterBottom>
          Page Not Found
        </Typography>
        <Typography variant="h3" component="h3" gutterBottom>
          The page you are looking for does not exist. How you got here is a
          mystery. But you can click the button below to go back to the
          homepage, Or listen to some music while you're at it.
        </Typography>
        <Button
          variant="contained"
          color="primary"
          href="/"
          sx={{
            mr: 2,
          }}
        >
          Go Home
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => {
            setIsPlaying(!isPlaying);
            controlAudio(isPlaying ? "pause" : "play");
          }}
        >
          {isPlaying ? "Stop" : "Play"} Music
        </Button>
      </Grid>
    </Grid>
  );
}

export default Err;
