import { Button, Grid, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import HomeImage from "../assets/pr_auth.svg";

function Home() {
  return (
    <Grid container spacing={3} direction="column">
      <Grid item>
        <Grid
          container
          spacing={3}
          direction="row"
          justifyContent="center"
          alignItems="center"
          sx={{
            height: "80ch",
            backgroundColor: "rgba(0, 0, 0, 0.1)",
          }}
        >
          <Grid item xs={12} sm={5}>
            <Typography variant="h3" gutterBottom>
              PurvaRachita
            </Typography>
            <Typography variant="h5" gutterBottom>
              Door to your dream home
            </Typography>
            <Typography variant="h6" gutterBottom>
              PurvaRachita is a platform to help you build your dream home with
              the help of a community of architects and interior designers.
            </Typography>
            <Button
              variant="contained"
              color="secondary"
              size="large"
              component={Link}
              to="/build"
              sx={{
                mt: 2,
                mr: 2,
              }}
            >
              Build Now
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              size="large"
              component={Link}
              to="/community"
              sx={{
                mt: 2,
              }}
            >
              Community
            </Button>
          </Grid>
          <Grid item xs={12} sm={5}>
            <img src={HomeImage} alt="home" style={{ maxWidth: "100%" }} />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default Home;
