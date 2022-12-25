import { Download as DownloadIcon } from "@mui/icons-material";
import { Grid, IconButton, Typography } from "@mui/material";

export default function PostDecsription({ post }) {
  return (
    <>
      <Typography
        variant="body1"
        sx={{
          ml: 1,
        }}
      >
        {post?.description || "No description provided"}
      </Typography>
      <Grid container justifyContent="flex-start" alignItems="center">
        {post?.files &&
          post?.files.map((file) => {
            // if file extension is image then show image
            if (
              file?.url?.includes(".jpg") ||
              file?.url?.includes(".png") ||
              file?.url?.includes(".jpeg")
            ) {
              return (
                <img
                  src={file?.url}
                  alt={file?.name}
                  key={file._id}
                  style={{
                    maxWidth: "50%",
                    maxHeight: "50%",
                    margin: "0.5rem",
                  }}
                />
              );
            }
            return (
              <Grid item key={file._id} xs={12}>
                <IconButton
                  rel="noreferrer"
                  variant="contained"
                  key={file._id}
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    m: 1,
                    borderRadius: 1,
                  }}
                  href={file?.url}
                >
                  <Typography variant="body2">{file?.name}</Typography>
                  <DownloadIcon color="secondary" />
                </IconButton>
              </Grid>
            );
          })}
      </Grid>
    </>
  );
}
