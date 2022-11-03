import { AppBar, Container, Toolbar, Typography } from "@mui/material";

function Bar() {
  return (
    <AppBar position="static" sx={{ backgroundColor: "#005FAF" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            PurvaRachita
          </Typography>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Bar;
