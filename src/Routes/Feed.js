import { Grid } from "@mui/material";
import Mid from "../Components/Feed/Mid";
import Right from "../Components/Feed/Right";

function Feed() {
  return (
    <Grid container spacing={2} justifyContent="center">
      <Mid />
      <Right />
    </Grid>
  );
}

export default Feed;
