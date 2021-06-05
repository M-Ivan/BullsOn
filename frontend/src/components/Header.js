import React from "react";
import {
  AppBar,
  Grid,
  Hidden,
  IconButton,
  makeStyles,
  Toolbar,
  createMuiTheme,
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
import { orange, green, red } from "@material-ui/core/colors";
import SearchBox from "./SearchBox";
import TrendingUpIcon from "@material-ui/icons/TrendingUp";
import Brightness3Icon from "@material-ui/icons/Brightness3";

const drawerWidth = 250;

const useStyles = makeStyles((theme) => ({
  root: {
    alignItems: "center",
  },
  appbar: {
    color: "#1b1b1b",
    backgroundColor: "#ffd700",
    borderBottom: "3px solid #ef6c00",
  },
  brand: {
    fontSize: "1.8rem",
    fontWeight: 600,
    padding: "0.5rem",
    color: "#424242",
    borderRadius: "0.3rem",
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
  },
  drawerRoot: {
    width: drawerWidth,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
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
              <i class="fa fa-bitcoin" style={{ color: orange[800] }}></i>ulls
              <span style={{ color: green[600] }}>O</span>
              <span style={{ color: green[600] }}>n</span>
            </strong>
          </Typography>
        </Link>
        <Switch checked={darkMode} onChange={darkModeCallback} />{" "}
        <Brightness3Icon />
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
                <HomeOutlinedIcon style={{ color: orange[700] }} />
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
                    <AccountCircleRoundedIcon style={{ color: orange[700] }} />
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
                  <ExitToAppOutlinedIcon style={{ color: red[500] }} />
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
      <AppBar color="transparent" elevation={0} className={classes.appbar}>
        <Toolbar>
          <Grid container alignItems="center" justify="flex-start">
            <Grid item xs={12} lg={3} md={3}>
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
                    style={{ backgroundColor: "#fff" }}
                    open={menuOpen}
                    onClose={() => setMenuOpen(false)}
                    onOpen={() => setMenuOpen(true)}
                  >
                    {listMenu()}
                  </SwipeableDrawer>
                </IconButton>
              </Hidden>
              <Link className={classes.brand} to="/">
                <i class="fa fa-bitcoin" style={{ color: orange[800] }}></i>
                ulls<span style={{ color: green[600] }}>O</span>
                <span style={{ color: green[600] }}>n</span>
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
                      <i className="fa fa-user-circle"></i>
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
                        <Switch checked={darkMode} /> <Brightness3Icon />
                      </MenuItem>

                      <MenuItem onClick={signoutHandler}>
                        Cerrar sesión
                      </MenuItem>
                    </Menu>
                  </Grid>
                ) : (
                  <Grid container justify="flex-end">
                    <div className="navlink">
                      <Link to="/signin">Iniciar Sesión</Link>
                    </div>
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
