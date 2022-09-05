import * as React from 'react';
import {
    AppBar,
    Box,
    Toolbar,
    IconButton,
    Typography,
    Menu,
    Container,
    MenuItem,
    Button
} from '@mui/material/';
import MenuIcon from '@mui/icons-material/Menu';
import {Link} from "react-router-dom";
import './css/NavBar.css';

const pages = ["home","contribute", "problems", "login", "signup"];

const NavBar = () => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: '#6E6E30'}}>
      <Container maxWidth="xl">
        <Toolbar
          disableGutters
          sx={{
            display: { xs: "flex" },
            flexDirection: "row",
            backgroundColor: '#6E6E30',
            justifyContent: "space-between"
          }}
        >
          <Box
          component="img"
          className="logo"
          src="/logo192.png"
          />
          <Typography
            className="appName"
            variant="h2"
            noWrap
            component="div"
            color="black"
            sx={{ mr: 2, display: { xs: "none", md: "flex" } }}
          >
            PeerPrep
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
            <MenuIcon/>
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left"
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left"
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" }
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">
                      <Link to={`/${page}`}>{page}</Link>
                    </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Typography
            variant="h6"
            noWrap
            component="div"
            color="black"
            sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}
          >
            PeerPrep
          </Typography>

          <Box
            sx={{
              display: { xs: "none", md: "flex" }
            }}
          >
            {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: "black", display: "block" }}
              >
                <Link to={`/${page}`}>{page}</Link>
              </Button>
            ))}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default NavBar;
