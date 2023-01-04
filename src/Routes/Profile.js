import { Box, Grid, Paper, Tab, Tabs, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import Mid from "../Components/Feed/Mid";
import ProfielDetails from "../Components/Profile/ProfielDetails";
import ProfileAvatar from "../Components/Profile/ProfileAvatar";
import { FeedContext } from "../Contexts/FeedContext";
import { UserContext } from "../Contexts/UserContext";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function Profile() {
  const { getMyPosts } = useContext(FeedContext);
  const { userData } = useContext(UserContext);

  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    getMyPosts().then((res) => {
      if (!res.success) {
        console.log(res?.error?.message);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userData]);

  return (
    <>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="Profile Details" />
          <Tab label="Your Posts" />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <Paper
          sx={{
            my: 2,
            mx: 21,
            p: 2,
          }}
          elevation={3}
        >
          <Grid
            container
            spacing={2}
            sx={{
              p: 1,
            }}
            justifyContent="center"
          >
            <ProfielDetails />
            <ProfileAvatar />
          </Grid>
        </Paper>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Paper elevation={3} sx={{ my: 2, mx: 21, p: 2 }}>
          <Typography variant="h5" sx={{ mx: 21, my: 2 }} align="center">
            Your Posts
          </Typography>
          <Grid
            container
            spacing={2}
            sx={{
              p: 1,
            }}
            justifyContent="center"
          >
            <Mid searched={true} style={{ height: "100%" }} />
          </Grid>
        </Paper>
      </TabPanel>
    </>
  );
}

export default Profile;
