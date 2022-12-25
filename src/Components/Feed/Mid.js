import { SentimentVeryDissatisfied } from "@mui/icons-material";
import { Grid, Typography } from "@mui/material";
import { useContext, useEffect } from "react";
import { FeedContext } from "../../Contexts/FeedContext";
import { UserContext } from "../../Contexts/UserContext";
import Post from "./Post";
import PostForm from "./PostForm";

function Mid({ searched = false, style = {}, allPosts = null }) {
  const { userData } = useContext(UserContext);
  const { getPosts, feedPosts } = useContext(FeedContext);

  useEffect(() => {
    if (!searched)
      getPosts()
        .then((res) => {
          if (!res.success) {
            console.log(res.error);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userData]);

  return (
    <Grid
      item
      xs={12}
      md={7}
      sx={{
        height: "calc(100vh - 64px)",
        overflowY: "auto",
        ...style,
      }}
    >
      <Grid container direction={"column"}>
        {!searched && <PostForm />}
        {allPosts &&
          allPosts.map((post) => <Post key={post._id} post={post} />)}
        {!allPosts &&
          feedPosts &&
          feedPosts.map((post) => <Post key={post._id} post={post} />)}
      </Grid>
      {feedPosts?.length === 0 && allPosts?.length === 0 ? (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            // height: "100%",
          }}
        >
          <SentimentVeryDissatisfied
            sx={{
              fontSize: 100,
              color: "text.secondary",
            }}
          />
          <Typography
            variant="h6"
            sx={{
              textAlign: "center",
              mt: 2,
              color: "text.secondary",
            }}
          >
            No posts found
          </Typography>
        </div>
      ) : (
        <Typography
          variant="h6"
          sx={{
            textAlign: "center",
            mt: 2,
            color: "text.secondary",
          }}
        >
          No more posts to show
        </Typography>
      )}
    </Grid>
  );
}

export default Mid;
