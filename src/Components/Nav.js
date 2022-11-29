import {
  AppBar,
  Avatar,
  Box,
  Button,
  Container,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import AvatarImage from "../assets/avatar.png";
import { UserContext } from "../Contexts/UserContext";
import MenuIcon from "@mui/icons-material/Menu";

function Nav() {
  const { userData, logout } = useContext(UserContext);
  const navigate = useNavigate();

  const [anchorElUser, setAnchorElUser] = useState(null);
  const [anchorElNav, setAnchorElNav] = useState(null);

  const settings = [
    {
      name: "Profile",
      handler: () => {
        setAnchorElUser(null);
        navigate("/profile");
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
            href="/"
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
            </Menu>
          </Box>
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
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
          <Box sx={{ flexGrow: 0 }}>
            {userData ? (
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar
                    alt={userData?.name}
                    src={userData?.avatar ? userData?.avatar : AvatarImage}
                  />
                </IconButton>
              </Tooltip>
            ) : (
              <Button
                onClick={(e) => {
                  navigate("/auth");
                }}
                sx={{
                  fontWeight: 700,
                  letterSpacing: ".1rem",
                  textDecoration: "none",
                  my: 2,
                  color: "white",
                  display: "block",
                }}
              >
                Login
              </Button>
            )}
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
              {settings.map((setting) => (
                <MenuItem key={setting.name} onClick={setting.handler}>
                  <Typography textAlign="center">{setting.name}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Nav;
