import { Box, Grid, Typography } from "@mui/material";
import { useState } from "react";
import PrAuth from "../Assets/pv.png";
import BG from "../Assets/pv_bg.png";
import Login from "../Components/Login";
import Register from "../Components/Register";
import ResetPass from "../Components/ResetPass";

function Auth() {
  const [comp, setComp] = useState("reg");
  return (
    <>
      <Box
        sx={{
          height: "100vh",
          background: "#1B2430",
          backgroundImage: { xs: `url(${BG})` },
          backgroundSize: "cover",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          p: { xs: 0, md: 40 },
        }}
      >
        <Grid
          container
          spacing={4}
          sx={{
            p: { xs: 2, md: 6 },
            justifyContent: "space-evenly",
            alignItems: "center",
            background: "rgba(255, 255, 255, 0.5)",
            backdropFilter: "blur(3px)",
            borderRadius: "20px",
            boxShadow: "0 10px 32px 0 rgba(31, 38, 135, 0.37)",
          }}
        >
          <Grid
            item
            md={6}
            sx={{
              display: { xs: "none", lg: "flex" },
              justifyContent: "center",
              alignItems: "center",
              p: "0 !important",
            }}
          >
            <img
              src={PrAuth}
              alt="wave"
              style={{
                maxWidth: "90%",
              }}
            />
          </Grid>

          <Grid
            item
            xs={12}
            md={4}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              minWidth: { xs: "100%", md: "400px" },
            }}
          >
            <Typography variant="h4" align="center">
              PurvaRachita
            </Typography>
            {comp === "login" && <Login setComp={setComp} />}
            {comp === "reg" && <Register setComp={setComp} />}
            {comp === "forgot" && <ResetPass setComp={setComp} />}
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

export default Auth;
