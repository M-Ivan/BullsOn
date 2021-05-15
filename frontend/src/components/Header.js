import React from "react";
import {
  AppBar,
  Grid,
  Hidden,
  IconButton,
  makeStyles,
  Toolbar,
  Typography,
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import { Link } from "react-router-dom";
import MenuIcon from "@material-ui/icons/Menu";
import { useDispatch, useSelector } from "react-redux";
import { signout } from "../actions/userActions";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { useState } from "react";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import HomeOutlinedIcon from "@material-ui/icons/HomeOutlined";
import ExitToAppOutlinedIcon from "@material-ui/icons/ExitToAppOutlined";
import AccountCircleRoundedIcon from "@material-ui/icons/AccountCircleRounded";
import { orange, green, red } from "@material-ui/core/colors";
import SearchBox from "./SearchBox";
import TrendingUpIcon from "@material-ui/icons/TrendingUp";
import TrendingDownIcon from "@material-ui/icons/TrendingDown";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },

  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
  navlink: {
    color: "#2c2c2c",
    padding: "0.5rem",
    borderRadius: "0.2rem",
    fontSize: "1.1rem",
    textTransform: "capitalize",
    fontWeight: "normal",
    "&:hover": {
      backgroundColor: "#68686823",
    },
    list: {
      width: 250,
    },
    fullList: {
      width: "auto",
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
    },
    drawerPaper: {
      width: drawerWidth,
    },
    drawerHeader: {
      display: "flex",
      alignItems: "center",
      padding: theme.spacing(0, 1),
      // necessary for content to be below app bar
      ...theme.mixins.toolbar,
      justifyContent: "flex-end",
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      marginLeft: -drawerWidth,
    },
    contentShift: {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    },
  },
}));

export default function Header(props) {
  const [userAnchorEl, setUserAnchorEl] = useState(false);
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const [showSearchBox, setShowSearchBox] = useState(false);

  console.log("showSearchBox", showSearchBox);

  const [menuOpen, setMenuOpen] = useState(false);

  const dispatch = useDispatch();
  const signoutHandler = () => {
    dispatch(signout());
  };

  const handleUserMenu = (e) => {
    setUserAnchorEl(e.currentTarget);
  };
  const handleUserMenuClose = () => {
    setUserAnchorEl(false);
  };

  const listMenu = () => (
    <div>
      <div className={classes.drawerHeader}>
        <h1 className="brand">Navegación</h1>
      </div>
      <Divider />
      <List>
        <Link to="/">
          <ListItem button>
            <ListItemIcon>
              <HomeOutlinedIcon style={{ color: orange[700] }} />
            </ListItemIcon>
            <ListItemText style={{ color: orange[800] }} primary="Inicio" />
          </ListItem>
        </Link>
        <ListItem button onClick={() => setShowSearchBox(!showSearchBox)}>
          <ListItemIcon>
            <SearchIcon style={{ color: orange[700] }} />
          </ListItemIcon>
          <ListItemText style={{ color: orange[800] }} primary="Buscar..." />
        </ListItem>
        {userInfo ? (
          <>
            <Link to={`/${userInfo.username}`}>
              <ListItem button>
                <ListItemIcon>
                  <AccountCircleRoundedIcon style={{ color: orange[700] }} />
                </ListItemIcon>
                <ListItemText
                  style={{ color: orange[800] }}
                  primary={userInfo.username}
                />
              </ListItem>
            </Link>
            <ListItem button onClick={signoutHandler}>
              <ExitToAppOutlinedIcon style={{ color: red[500] }} />
              <ListItemText className="menu-margin" style={{ color: red[500] }}>
                Cerrar sesión
              </ListItemText>
            </ListItem>
          </>
        ) : (
          <Link to="/signin">
            <ListItem button>
              <ExitToAppOutlinedIcon style={{ color: green[700] }} />
              <ListItemText
                className="menu-margin"
                style={{ color: green[700] }}
              >
                Iniciar Sesión
              </ListItemText>
            </ListItem>
          </Link>
        )}
      </List>
    </div>
  );

  const classes = useStyles();
  return (
    <div>
      <Grid container spacing={2}>
        <Grid xs={12}>
          <AppBar position="static" elevation={1}>
            <Toolbar className="toolBar">
              <Grid container alignItems="center" justify="flex-start">
                <Grid item xs={6} lg={3} md={3}>
                  <Hidden only={["lg", "xl"]}>
                    <IconButton
                      onClick={() => setMenuOpen(!menuOpen)}
                      edge="start"
                      color="inherit"
                      aria-label="menu"
                    >
                      <MenuIcon />
                      <SwipeableDrawer
                        className={classes.drawer}
                        open={menuOpen}
                        onClose={() => setMenuOpen(false)}
                        onOpen={() => setMenuOpen(true)}
                      >
                        {listMenu()}
                      </SwipeableDrawer>
                    </IconButton>
                  </Hidden>
                  <Link className="brand" to="/">
                    <i class="fa fa-bitcoin"></i>ullsOn <TrendingUpIcon />
                  </Link>
                </Grid>

                {showSearchBox ? (
                  <Hidden only={["lg", "xl"]}>
                    <Grid item xs={6}>
                      <Toolbar className="toolBar">
                        <Grid container justify="center">
                          <SearchBox />
                        </Grid>
                      </Toolbar>
                    </Grid>
                  </Hidden>
                ) : null}
                <Grid item lg={6} xs={7}>
                  <Hidden only={["xs", "sm", "md"]}>
                    <SearchBox />{" "}
                  </Hidden>
                </Grid>

                <Hidden only={["xs", "sm", "md"]}>
                  <Grid item xs={3}>
                    <Grid container alignItems="center" justify="flex-end">
                      <div className="navlink">
                        <a href="https://m-ivan.github.io/">
                          <i className="fa fa-gripfire"></i>Ir a mi portafolio{" "}
                          <i className="fa fa-gripfire"></i>
                        </a>
                      </div>
                    </Grid>
                  </Grid>
                </Hidden>
              </Grid>
            </Toolbar>

            <Hidden only={["xs", "sm", "md"]}>
              <Toolbar className="toolBar">
                <Grid container justify="flex-end" alignItems="center">
                  {userInfo ? (
                    <div>
                      <div>
                        <Button
                          classes={{ root: classes.navlink }}
                          aria-controls="simple-menu"
                          aria-haspopup="true"
                          onClick={handleUserMenu}
                        >
                          {" "}
                          <i className="fa fa-user-circle"></i>
                          {userInfo.username}
                        </Button>
                      </div>
                      <Menu
                        id="simple-menu"
                        anchorEl={userAnchorEl}
                        keepMounted
                        open={Boolean(userAnchorEl)}
                        onClose={handleUserMenuClose}
                      >
                        <MenuItem onClick={handleUserMenuClose}>
                          <Link to={`/${userInfo.username}`}>Mi perfil</Link>
                        </MenuItem>
                        <MenuItem onClick={handleUserMenuClose}>
                          <Link to={`/${userInfo.username}/settings`}>
                            Configuración
                          </Link>
                        </MenuItem>
                        <MenuItem onClick={signoutHandler}>
                          Cerrar sesión
                        </MenuItem>
                      </Menu>
                    </div>
                  ) : (
                    <div className="navlink">
                      <Link to="/signin">Iniciar Sesión</Link>
                    </div>
                  )}
                </Grid>
              </Toolbar>
            </Hidden>
          </AppBar>
        </Grid>
      </Grid>
    </div>
  );
}
