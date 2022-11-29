import { Grid, Paper, Typography } from "@mui/material";
import { useContext } from "react";
import { UserContext } from "../../Contexts/UserContext";
import AvatarImg from "../../assets/avatar.png";

function Right() {
  const { userData } = useContext(UserContext);
  return (
    <Grid
      item
      md={3}
      sx={{
        display: { xs: "none", md: "block" },
      }}
    >
      <Paper
        elevation={3}
        sx={{
          p: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <img
          src={userData?.avatar || AvatarImg}
          alt="avatar"
          style={{
            // width 100% and make it square 
              height: "400px",
              width: "400px",
              maxWidth: "100%",
              borderRadius: "50%",
              alignSelf: "center",
              objectFit: "cover",
          }}
        />
        <Typography variant="h6">{userData?.name}</Typography>
        <Typography variant="subtitle1">{userData?.email}</Typography>
        <Typography variant="subtitle2">
          Number of Posts: {userData?.posts?.length}
        </Typography>
      </Paper>
    </Grid>
  );
}

export default Right;
