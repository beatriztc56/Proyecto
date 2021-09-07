import React from "react";
import { Avatar, makeStyles, Menu, MenuItem } from "@material-ui/core";
import AccountCircle from "@material-ui/icons/AccountCircle";
import { Link, Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

export default function UserAvatar({ src }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const user = useSelector((s) => s.user);
  const dispatch = useDispatch();

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const closeSession = () => {
    dispatch({ type: "LOGOUT" });
    <Redirect to="/"></Redirect>;
  };

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>
        <Link to="/profile">Mis datos</Link>
      </MenuItem>
      <MenuItem onClick={handleMenuClose}>
        <Link to="/mystories">Mis historias</Link>
      </MenuItem>
      <MenuItem onClick={() => closeSession()}>Cerrar sesión</MenuItem>
    </Menu>
  );
  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    />
  );
  const useStyles = makeStyles((theme) => ({
    large: {
      width: "150px",
      height: "100px",
    },
  }));
  const classes = useStyles();
  return (
    <>
      {user && (
        <>
          <div className={classes.sectionMobile}>
            <Avatar
              src={`http://localhost:4000/images/${src}`}
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
              className={classes.large}
            >
              <AccountCircle />
            </Avatar>
          </div>

          {renderMobileMenu}
          {renderMenu}
        </>
      )}
    </>
  );
}
