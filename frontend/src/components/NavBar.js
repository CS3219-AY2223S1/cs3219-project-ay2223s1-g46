import * as React from "react"
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Container,
  MenuItem,
  Button,
} from "@mui/material/"
import MenuIcon from "@mui/icons-material/Menu"
import { Link } from "react-router-dom"
import "./css/NavBar.css"

// const pages = ["contribute", "problems", "login", "signup", "profile"]

const NavBar = ({ user }) => {
  const [anchorElNav, setAnchorElNav] = React.useState(null)

  const loggedOutPages = ["login", "signup"]
  // only teaching team and admin can access questions page
  const loggedInPages =
    user && user.role === "Student"
      ? ["contribute", "problems", "profile"]
      : ["contribute", "problems", "questions", "profile"]

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget)
  }

  const handleCloseNavMenu = () => {
    setAnchorElNav(null)
  }
  // background color was #6E6E30
  return (
    <AppBar position="static" sx={{ backgroundColor: "#54c9bf" }} elevation={2}>
      <Container maxWidth="xl">
        <Toolbar
          disableGutters
          sx={{
            display: { xs: "flex" },
            flexDirection: "row",
            backgroundColor: "#54c9bf",
            justifyContent: "space-between",
          }}
        >
          <Typography
            className="appName"
            variant="h2"
            noWrap
            component="div"
            color="black"
            sx={{ mr: 2, display: { xs: "none", md: "flex" } }}
          >
            <Link to={"/"} style={{ textDecoration: "none", color: "black" }}>
              PeerPrep
            </Link>
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
              {user && user.username
                ? loggedInPages.map((page) => (
                    <MenuItem key={page} onClick={handleCloseNavMenu}>
                      <Link
                        to={`/${page}`}
                        style={{ textDecoration: "none", color: "black" }}
                      >
                        {page}
                      </Link>
                    </MenuItem>
                  ))
                : loggedOutPages.map((page) => (
                    <MenuItem key={page} onClick={handleCloseNavMenu}>
                      <Typography textAlign="center">
                        <Link
                          to={`/${page}`}
                          style={{ textDecoration: "none", color: "black" }}
                        >
                          {page}
                        </Link>
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
            <Link to={"/"} style={{ textDecoration: "none", color: "black" }}>
              PeerPrep
            </Link>
          </Typography>

          <Box
            sx={{
              display: { xs: "none", md: "flex" },
            }}
            gap={2}
          >
            {user && user.username
              ? loggedInPages.map((page) => (
                  <Button
                    key={page}
                    onClick={handleCloseNavMenu}
                    sx={{ my: 2, color: "black", display: "block" }}
                  >
                    <Link
                      to={`/${page}`}
                      style={{ textDecoration: "none", color: "black" }}
                    >
                      {page}
                    </Link>
                  </Button>
                ))
              : loggedOutPages.map((page) => (
                  <Button
                    key={page}
                    onClick={handleCloseNavMenu}
                    sx={{ my: 2, color: "black", display: "block" }}
                  >
                    <Link
                      to={`/${page}`}
                      style={{ textDecoration: "none", color: "black" }}
                    >
                      {page}
                    </Link>
                  </Button>
                ))}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  )
}
export default NavBar
