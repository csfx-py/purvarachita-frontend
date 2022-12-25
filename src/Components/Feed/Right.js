import { Grid, Paper, Typography } from "@mui/material";
import { useContext } from "react";
import AvatarImg from "../../Assets/avatar.png";
import { UserContext } from "../../Contexts/UserContext";

function Right({ searchedUser = null }) {
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
          src={
            searchedUser
              ? searchedUser?.avatar || AvatarImg
              : userData?.avatar || AvatarImg
          }
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
        <Typography variant="h6">
          {searchedUser
            ? searchedUser?.name || "Anonymous"
            : userData?.name || "Anonymous"}
        </Typography>
        <Typography variant="subtitle1">
          {searchedUser
            ? searchedUser?.email || "Anon@Anon.com"
            : userData?.email || "Anon@Anon.com"}
        </Typography>
        <Typography variant="subtitle2">
          Number of Posts:
          {searchedUser
            ? searchedUser?.numPosts || 0
            : userData?.posts?.length || 0}
        </Typography>
      </Paper>
    </Grid>
  );
}

export default Right;
