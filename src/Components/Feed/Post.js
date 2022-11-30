import { DeleteForever } from "@mui/icons-material";
import DownloadIcon from "@mui/icons-material/Download";
import {
  Avatar,
  Button,
  Grid,
  IconButton,
  List,
  ListItem,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { useSnackbar } from "notistack";
import { useContext, useState } from "react";
import AvatarImage from "../../assets/avatar.png";
import { FeedContext } from "../../Contexts/FeedContext";
import { UserContext } from "../../Contexts/UserContext";

function Post({ post }) {
  // eslint-disable-next-line no-unused-vars
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const { userData } = useContext(UserContext);

  const [newComment, setNewComment] = useState("");
  const [showComments, setShowComments] = useState(false);

  const { addComment, deletePost } = useContext(FeedContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newComment) {
      enqueueSnackbar("Comment cannot be empty", { variant: "error" });
      return;
    }
    const res = await addComment(post._id, newComment);
    if (res.success) {
      setNewComment("");
      enqueueSnackbar("Comment added successfully", { variant: "success" });
    } else {
      enqueueSnackbar(res.error, { variant: "error" });
    }
  };

  const handleDelete = async (e) => {
    e.preventDefault();

    // confirm delete
    const confirm = window.confirm(
      "Are you sure you want to delete this post?"
    );
    if (!confirm) return;

    const res = await deletePost(post._id);

    if (res.success) {
      enqueueSnackbar("Post deleted successfully", { variant: "success" });
    } else {
      enqueueSnackbar(res.error, { variant: "error" });
    }
  };

  return (
    <Paper
      sx={{
        my: 2,
        p: 1,
        backgroundColor: "rgba(255, 255, 255, 0.2)",
        backdropFilter: "blur(10px)",
        borderRadius: "20px",
        border: "1px solid rgba(255, 255, 255, 0.2)",
      }}
      elevation={3}
    >
      <Grid container justifyContent="space-between" alignItems="center">
        <Grid item>
          <Grid container alignItems="center">
            <Avatar
              src={post?.avatar || AvatarImage}
              sx={{ width: 40, height: 40, mr: 1 }}
            />
            <Typography variant="h6">{post.name}</Typography>
          </Grid>
        </Grid>
        <Grid item>
          {userData?._id === post?.user && (
            <IconButton onClick={handleDelete}>
              <DeleteForever color="secondary" />
            </IconButton>
          )}
        </Grid>
      </Grid>
      <Typography variant="body1">
        {post?.description || "No description provided"}
      </Typography>
      <List>
        {post?.files &&
          post?.files.map((file, i) => {
            const extension = file?.name.split(".").pop();

            if (
              extension === "jpg" ||
              extension === "jpeg" ||
              extension === "png"
            )
              return (
                <ListItem key={i}>
                  <img
                    src={file?.url}
                    alt="post"
                    style={{ maxWidth: "100%" }}
                  />
                </ListItem>
              );

            return (
              <ListItem key={file._id}>
                <Typography variant="body1">{file.name}</Typography>
                <IconButton href={file?.url} rel="noreferrer">
                  <DownloadIcon
                    sx={{
                      color: "secondary.main",
                    }}
                  />
                </IconButton>
              </ListItem>
            );
          })}
      </List>

      <Box
        sx={{
          my: 2,
          p: 1,
        }}
      >
        <Grid container component="form" onSubmit={handleSubmit}>
          <TextField
            label="Add a comment, Press Enter to submit, Shift + Enter to add a line"
            variant="outlined"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            sx={{
              mt: 1,
              mr: 1,
              flexGrow: 1,
            }}
          />
          <Button
            type="submit"
            variant="contained"
            sx={{
              mt: 1,
            }}
            color="secondary"
          >
            Add Comment
          </Button>
        </Grid>
        {showComments
          ? post?.comments && (
              <>
                <Typography
                  variant="outlined"
                  onClick={() => setShowComments(false)}
                  gutterBottom
                  sx={{
                    cursor: "pointer",
                    color: "primary.main",
                  }}
                >
                  Hide Comments
                </Typography>
                {post?.comments?.map((comment, index) => (
                  <div key={index}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        borderTop: "1px solid #ccc",
                        padding: 1,
                      }}
                    >
                      <Avatar
                        src={comment?.avatar || AvatarImage}
                        sx={{
                          width: 30,
                          height: 30,
                          m: 1,
                        }}
                      />
                      <Typography
                        variant="h6"
                        sx={{
                          fontWeight: "bold",
                        }}
                      >
                        {comment?.name || "Anonymous User"}
                      </Typography>
                    </div>
                    <Typography variant="body1" sx={{ ml: 6 }}>
                      {comment?.text || "No comment data"}
                    </Typography>
                  </div>
                ))}
              </>
            )
          : post?.comments?.length > 0 && (
              <Typography
                variant="outlined"
                onClick={() => setShowComments(true)}
                gutterBottom
                sx={{
                  cursor: "pointer",
                  color: "primary.main",
                }}
              >
                Show Comments
              </Typography>
            )}
      </Box>
    </Paper>
  );
}

export default Post;
