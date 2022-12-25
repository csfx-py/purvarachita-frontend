import { Button, Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { Link } from "react-router-dom";
import HomeImage from "../Assets/pr_auth.svg";
import PrBuilder from "../Assets/pr_builder.png";
import PrBuilder2d from "../Assets/pr_builder2d.png";
import PrCommunity from "../Assets/pr_community.png";

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
      <Grid item>
        <Grid
          container
          spacing={5}
          direction="row"
          justifyContent="center"
          alignItems="center"
          sx={{
            p: 5,
            my: 5,
          }}
        >
          <Grid item xs={12} sm={5}>
            <img
              src={PrBuilder2d}
              alt="home"
              style={{ maxWidth: "100%", marginBottom: "2rem" }}
            />
            <img src={PrBuilder} alt="home" style={{ maxWidth: "100%" }} />
          </Grid>
          <Grid item xs={12} sm={5}>
            <Typography variant="h3" gutterBottom>
              Build
            </Typography>
            <Typography variant="h5" gutterBottom>
              Build your dream home
            </Typography>
            <Typography variant="h6" gutterBottom>
              PurvaRachita is a platform to help you build your dream home with
              2d/3d interface that helps you visualize your dream home.
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
          </Grid>
        </Grid>
      </Grid>
      <Grid item>
        <Grid
          container
          spacing={5}
          direction="row"
          justifyContent="center"
          alignItems="center"
          sx={{
            p: 5,
            minHeight: "80ch",
            backgroundColor: "rgba(0, 0, 0, 0.1)",
          }}
        >
          <Grid item xs={12} sm={5}>
            <Typography variant="h3" gutterBottom>
              PurvaRachita Community
            </Typography>
            <Typography variant="h5" gutterBottom>
              Join the community
            </Typography>
            <Typography variant="h6" gutterBottom>
              The get help from the community of architects and interior
              designers to build your dream home.
            </Typography>
            <Button
              variant="contained"
              color="secondary"
              size="large"
              component={Link}
              to="/community"
              sx={{
                mt: 2,
                mr: 2,
              }}
            >
              Join Now
            </Button>
          </Grid>
          <Grid item xs={12} sm={5}>
            <img src={PrCommunity} alt="home" style={{ maxWidth: "100%" }} />
          </Grid>
        </Grid>
      </Grid>
      <Box
        sx={{
          backgroundColor: "secondary.main",
          p: "2rem",
          textAlign: "center",
        }}
      >
        <Typography variant="h6" gutterBottom>
          PurvaRachita
        </Typography>
        <Typography variant="body1" gutterBottom>
          © 2022 PurvaRachita. All rights reserved.
        </Typography>
      </Box>
    </Grid>
  );
}

export default Home;
