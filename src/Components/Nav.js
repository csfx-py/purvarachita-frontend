import { Menu as MenuIcon, Search } from "@mui/icons-material";
import {
  AppBar,
  Avatar,
  Box,
  Button,
  Container,
  IconButton,
  InputAdornment,
  Menu,
  MenuItem,
  TextField,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import { useSnackbar } from "notistack";
import { useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AvatarImage from "../Assets/avatar.png";
import { FeedContext } from "../Contexts/FeedContext";
import { UserContext } from "../Contexts/UserContext";

function Nav() {
  // eslint-disable-next-line no-unused-vars
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const navigate = useNavigate();

  const { pathname } = useLocation();

  const { userData, logout } = useContext(UserContext);
  const { searchPosts } = useContext(FeedContext);

  const [anchorElUser, setAnchorElUser] = useState(null);
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [query, setQuery] = useState("");

  const settings = [
    {
      name: "Profile",
      handler: () => {
        setAnchorElUser(null);
        navigate("/profile");
      },
    },
    {
      name: "Manage Users",
      handler: () => {
        setAnchorElUser(null);
        navigate("/admin/users");
      },
      style: {
        display: userData?.role === "admin" ? "flex" : "none",
      },
    },
    {
      name: "Manage Posts",
      handler: () => {
        setAnchorElUser(null);
        navigate("/admin/posts");
      },
      style: {
        display: userData?.role === "admin" ? "flex" : "none",
      },
    },
    {
      name: "Logout",
      handler: () => {
        setAnchorElUser(null);
        logout();
      },
    },
  ];

  const pages = [
    {
      name: "Home",
      handler: () => {
        setAnchorElNav(null);
        navigate("/");
      },
    },
    {
      name: "Build",
      handler: () => {
        setAnchorElNav(null);
        navigate("/build");
      },
    },
    {
      name: "Community",
      handler: () => {
        setAnchorElNav(null);
        navigate("/community");
      },
    },
  ];

  const searchBarAvailable = [
    "/community",
    "/search",
    "/profile/:userId",
    "/post/:postId",
  ];
  const handleOpenUserMenu = (e) => {
    setAnchorElUser(e.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleOpenNavMenu = (e) => {
    setAnchorElNav(e.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleSearch = async (e) => {
    e.preventDefault();

    if (!query) {
      enqueueSnackbar("Please enter a search query", { variant: "error" });
      return;
    }

    const res = await searchPosts(query);

    if (!res.success) {
      enqueueSnackbar(res?.error?.message, { variant: "error" });
      return;
    }

    navigate("/search");
  };

  return (
    <AppBar
      component="nav"
      position="sticky"
      sx={{
        zIndex: 99,
      }}
      color="secondary"
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href={userData ? "/community" : "/"}
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontWeight: 700,
              letterSpacing: ".1rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            PurvaRachita
          </Typography>

          {userData && searchBarAvailable.includes(pathname) && (
            <form
              noValidate
              autoComplete="off"
              style={{
                display: "flex",
                flexGrow: 1,
              }}
              onSubmit={handleSearch}
            >
              <TextField
                sx={{ ml: 1, flexGrow: 1 }}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                variant="outlined"
                label="Search Posts"
                size="small"
                placeholder="Search Posts"
                InputProps={{
                  sx: {
                    // color: "white",
                    backgroundColor: "rgba(255, 255, 255, 1)",
                    // "&::placeholder": {
                    //   color: "white",
                    // },
                  },
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        type="submit"
                        size="large"
                        sx={{
                          mt: 1,
                        }}
                        color="primary"
                      >
                        <Search color="secondary" />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </form>
          )}

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page.name} onClick={page.handler}>
                  <Typography
                    textAlign="center"
                    sx={{
                      fontWeight: 700,
                      letterSpacing: ".1rem",
                      color: "inherit",
                      textDecoration: "none",
                    }}
                  >
                    {page.name}
                  </Typography>
                </MenuItem>
              ))}
              {userData && searchBarAvailable.includes(pathname) && (
                <MenuItem>
                  <form
                    noValidate
                    autoComplete="off"
                    style={{
                      display: "flex",
                      flexGrow: 1,
                    }}
                    onSubmit={handleSearch}
                  >
                    <TextField
                      sx={{ ml: 1, flex: 1 }}
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      variant="standard"
                      size="small"
                      placeholder="Search Posts"
                      InputProps={{
                        sx: {
                          color: "white",
                          // backgroundColor: "rgba(255, 255, 255, 0.1)",
                          p: "10px",
                          "&::placeholder": {
                            color: "white",
                          },
                        },
                      }}
                    />
                    <IconButton
                      type="submit"
                      sx={{
                        p: "10px",
                      }}
                      aria-label="search"
                    >
                      <Search
                        sx={{
                          color: "white",
                        }}
                      />
                    </IconButton>
                  </form>
                </MenuItem>
              )}
            </Menu>
          </Box>
          <Typography
            variant="h5"
            noWrap
            component="a"
            href={userData ? "/community" : "/"}
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontWeight: 700,
              letterSpacing: ".1rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            PurvaRachita
          </Typography>
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
              justifyContent: "flex-end",
              mr: 2,
            }}
          >
            {pages.map((page) => (
              <Button
                key={page.name}
                onClick={page.handler}
                sx={{
                  fontWeight: 700,
                  letterSpacing: ".1rem",
                  textDecoration: "none",
                  my: 2,
                  color: "white",
                  display: "block",
                }}
              >
                {page.name}
              </Button>
            ))}
          </Box>
          {userData && (
            <Box sx={{ ml: "auto" }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar
                    alt="Remy Sharp"
                    src={userData?.avatar || AvatarImage}
                  />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting, index) => (
                  <MenuItem
                    key={index}
                    onClick={handleCloseUserMenu}
                    sx={setting.style}
                  >
                    <Typography variant="h6" onClick={setting.handler}>
                      {setting.name}
                    </Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Nav;
