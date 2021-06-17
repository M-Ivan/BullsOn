import React from "react";
import {
  AppBar,
  Grid,
  Hidden,
  IconButton,
  makeStyles,
  Toolbar,
  Switch,
  Typography,
} from "@material-ui/core";
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
import HomeOutlinedIcon from "@material-ui/icons/HomeOutlined";
import ExitToAppOutlinedIcon from "@material-ui/icons/ExitToAppOutlined";
import AccountCircleRoundedIcon from "@material-ui/icons/AccountCircleRounded";
import { green } from "@material-ui/core/colors";
import SearchBox from "./SearchBox";
import TrendingUpIcon from "@material-ui/icons/TrendingUp";
import Brightness3Icon from "@material-ui/icons/Brightness3";

const drawerWidth = 250;

const useStyles = makeStyles((theme) => ({
  root: {
    alignItems: "center",
  },
  appbar: {
    color: "#fff",
    backgroundColor: [theme.palette.primary.dark],
    borderBottom: `3px solid ${[theme.palette.secondary.light]}`,
  },
  brand: {
    fontSize: "1.8rem",
    fontWeight: 600,
    padding: "0.5rem",
    color: "#fff", //  [theme.palette.background.paper],
    borderRadius: "0.3rem",
  },
  colorText: { color: [theme.palette.secondary.main] },
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
    transition: "0.3s",
    color: "#fff",
    padding: "0.5rem",
    borderRadius: "0.2rem",
    fontSize: "1.1rem",
    textTransform: "capitalize",
    fontWeight: "normal",
    "&:hover": {
      backgroundColor: "#ffffff10",
    },
  },
  drawerRoot: {
    width: drawerWidth,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  colorIcon: {
    color: [theme.palette.secondary.main],
  },
  item: {
    display: "flex",
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "center",
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
  iconColor: { color: [theme.palette.secondary.main] },
}));

export default function Header(props) {
  const { darkModeCallback, darkMode } = props;
  const classes = useStyles();

  const [userAnchorEl, setUserAnchorEl] = useState(false);
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
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
    <div className={classes.drawerRoot}>
      <div className={classes.drawerHeader}>
        <Link className={classes.brand} to="/">
          <Typography color="textPrimary" variant="h4">
            <strong>
              <i className={`fa fa-bitcoin ${classes.colorText}`}></i>ulls
              <span className={classes.colorText}>On</span>
            </strong>
          </Typography>
        </Link>
        <Switch checked={darkMode} onChange={darkModeCallback} />{" "}
        <Brightness3Icon className={darkMode ? classes.colorText : ""} />
      </div>
      <Divider />
      <List>
        <Link to="/">
          <ListItem button divider className={classes.item}>
            <Grid
              item
              xs={5}
              style={{ display: "flex", justifyContent: "flex-end" }}
            >
              <ListItemIcon>
                <HomeOutlinedIcon className={classes.colorText} />
              </ListItemIcon>{" "}
            </Grid>
            <Typography color="textPrimary"> Inicio</Typography>
            {
              //         <ListItemText style={{ color: orange[800] }} primary="Inicio" />
            }{" "}
          </ListItem>
        </Link>

        {userInfo ? (
          <>
            <Link to={`/${userInfo.username}`}>
              <ListItem button divider className={classes.item}>
                <Grid
                  item
                  xs={5}
                  style={{ display: "flex", justifyContent: "flex-end" }}
                >
                  <ListItemIcon>
                    <AccountCircleRoundedIcon className={classes.colorText} />
                  </ListItemIcon>
                </Grid>

                <Typography color="textPrimary">{userInfo.username}</Typography>
              </ListItem>
            </Link>
            <ListItem
              button
              onClick={signoutHandler}
              divider
              className={classes.item}
            >
              <Grid
                item
                xs={5}
                style={{ display: "flex", justifyContent: "flex-end" }}
              >
                <ListItemIcon>
                  <ExitToAppOutlinedIcon className={classes.colorText} />
                </ListItemIcon>{" "}
              </Grid>{" "}
              <Typography color="textPrimary">Cerrar sesión</Typography>
            </ListItem>
          </>
        ) : (
          <Link to="/signin">
            <ListItem button divider className={classes.item}>
              <Grid
                item
                xs={5}
                style={{ display: "flex", justifyContent: "flex-end" }}
              >
                {" "}
                <ListItemIcon>
                  <ExitToAppOutlinedIcon style={{ color: green[700] }} />
                </ListItemIcon>{" "}
              </Grid>{" "}
              <Typography color="textPrimary">Iniciar sesión</Typography>
            </ListItem>
          </Link>
        )}
      </List>
    </div>
  );

  return (
    <Grid container className={classes.root}>
      <AppBar elevation={0} className={classes.appbar}>
        <Toolbar>
          <Grid container alignItems="center" justify="flex-start">
            <Grid item xs={12} lg={3} md={3}>
              <Hidden only={["lg", "xl"]}>
                <IconButton
                  onClick={() => setMenuOpen(!menuOpen)}
                  edge="start"
                  aria-label="menu"
                >
                  <MenuIcon style={{ color: "#fff" }} />
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

              <Link className={classes.brand} to="/">
                <i className={`fa fa-bitcoin ${classes.colorText}`}></i>
                ulls<span className={classes.colorText}>On</span>
                <TrendingUpIcon />{" "}
              </Link>
            </Grid>

            <Grid item lg={6} xs={12}>
              <Hidden mdDown>
                <SearchBox />{" "}
              </Hidden>
            </Grid>
            <Hidden mdDown>
              <Grid item xs={3}>
                {userInfo ? (
                  <Grid container justify="flex-end">
                    <Button
                      classes={{ root: classes.navlink }}
                      aria-controls="simple-menu"
                      aria-haspopup="true"
                      onClick={handleUserMenu}
                    >
                      <i
                        className={`fa fa-user-circle ${classes.colorIcon}`}
                      ></i>
                      {userInfo.username}
                    </Button>

                    <Menu
                      id="simple-menu"
                      anchorEl={userAnchorEl}
                      keepMounted
                      open={userAnchorEl}
                      onClose={handleUserMenuClose}
                    >
                      <MenuItem onClick={handleUserMenuClose}>
                        <Link to={`/${userInfo.username}`}>
                          {" "}
                          <Typography color="textPrimary">Mi perfil</Typography>
                        </Link>
                      </MenuItem>
                      <MenuItem onClick={darkModeCallback}>
                        {" "}
                        <Switch checked={darkMode} />{" "}
                        <Brightness3Icon
                          className={darkMode ? classes.colorIcon : ""}
                        />
                      </MenuItem>

                      <MenuItem onClick={signoutHandler}>
                        Cerrar sesión
                      </MenuItem>
                    </Menu>
                  </Grid>
                ) : (
                  <Grid container justify="flex-end" alignItems="center">
                    <div>
                      <Link to="/signin">
                        <Grid
                          container
                          alignItems="center"
                          className={classes.navlink}
                        >
                          <ExitToAppOutlinedIcon
                            className={classes.iconColor}
                          />
                          Iniciar Sesión
                        </Grid>
                      </Link>
                    </div>
                    <MenuItem onClick={darkModeCallback}>
                      {" "}
                      <Switch checked={darkMode} />{" "}
                      <Brightness3Icon
                        className={darkMode ? classes.colorIcon : ""}
                      />
                    </MenuItem>
                  </Grid>
                )}
              </Grid>
            </Hidden>
          </Grid>
        </Toolbar>

        <Hidden lgUp>
          <Toolbar>
            <SearchBox />
          </Toolbar>
        </Hidden>
      </AppBar>
    </Grid>
  );
}
