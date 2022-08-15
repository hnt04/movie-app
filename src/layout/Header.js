import * as React from "react";
import { Link, useLocation } from "react-router-dom";
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import { useAuth } from "../auth/AuthContext";
import IconButton from "@mui/material/IconButton";
import MoreIcon from "@mui/icons-material/MoreVert";
import Menu from "@mui/material/Menu";
import MovieIcon from '@mui/icons-material/Movie';
import Button from "@mui/material/Button";
import LiveTvIcon from '@mui/icons-material/LiveTv';
import MenuItem from "@mui/material/MenuItem";
import SearchAppBar from "../components/SearchAppBar";
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import StarIcon from "@mui/icons-material/Star";
import AppBar from "@mui/material/AppBar";

export default function Header() {
  let location = useLocation();
  let auth = useAuth();
  const [anchor, setAnchor] = React.useState(null);
  const [mobileMoreAnchor, setMobileMoreAnchor] = React.useState(null);

  const isMenuOpen = Boolean(anchor);
  const isMobileMenuOpen = Boolean(mobileMoreAnchor);

  const handleProfileMenuOpen = (event) => {
    setAnchor(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchor(null);
  };

  const handleClose = () => {
    setAnchor(null);
    handleMobileMenuClose();
    console.log(location);
  };

  const handleLogout = () => {
    handleClose();
    auth.signOut();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchor(event.currentTarget);
  };

  const menuId = "primary-menu";
  const renderMenu = (
    <Menu
      anchor={anchor}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleClose}
    >
      {auth.user ? (
        <>
          <Button
            color="inherit"
            component={Link}
            to="/favorite"
            onClick={handleClose}
          >
            {auth.user}
          </Button>
          <Button color="inherit" onClick={() => handleLogout()}>
            Log Out</Button>
        </>
      ) : (
        <Button
          color="inherit"
          component={Link}
          to="/login"
          state={{ backgroundLocation: location, from: location }}>Log In</Button>
      )}
    </Menu>
  );

  const mobileMenuId = "mobile-menu";
  const renderMobileMenu = (
    <Menu
      anchor={mobileMoreAnchor}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}>

      <MenuItem component={Link} to="/login">
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls={menuId}
          disableRipple={true}
          color="inherit"
          children={<PeopleAltIcon />}/>
        <p>Profile</p>
      </MenuItem>  

      <MenuItem component={Link} to="/discovery/1">
        <IconButton
          size="large"
          color="inherit"
          disableRipple={true}
          children={<MovieIcon />}
        />
        <p>Top Movie</p>
      </MenuItem>

      <MenuItem component={Link} to="/favorite">
        <IconButton
          size="large"
          color="inherit"
          disableRipple={true}
          children={<StarIcon />}
        />
        <p>Favorite</p>
      </MenuItem>
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" className="app-bar">
        <Toolbar>
          <IconButton
            size="large"
            color="inherit"
            component={Link}
            to="/"
            children={<LiveTvIcon />}
          />
          <p>MOVIE APP</p>
          <SearchAppBar />
          <Box sx={{ flexGrow: 1 }} />
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
            }}
          >
            <IconButton
              component={Link}
              to="/favorite"
              size="large"
              color="inherit"
              children={<StarIcon />}
            />
            <IconButton
              component={Link}
              to="/discovery/1"
              size="large"
              color="inherit"
              children={<MovieIcon />}
            />
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls={menuId}
              onClick={handleProfileMenuOpen}
              color="inherit"
              children={<PeopleAltIcon />}
            />
          </Box>
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </Box>
  );
}