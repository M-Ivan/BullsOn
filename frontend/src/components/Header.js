import React from "react";
import {
  AppBar,
  fade,
  Grid,
  Hidden,
  IconButton,
  InputBase,
  makeStyles,
  Toolbar,
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import { Link } from "react-router-dom";
import MenuIcon from "@material-ui/icons/Menu";

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
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.down("md")]: {
      width: "55ch",
    },
    [theme.breakpoints.up("lg")]: {
      width: "100ch",
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
}));

export default function Header() {
  const classes = useStyles();
  return (
    <div>
      <Grid container spacing={2} xs={12}>
        <AppBar position="static">
          <Toolbar>
            <Grid container xs={12}>
              <Grid
                container
                xs={5}
                lg={3}
                md={3}
                alignItems="center"
                justify="flex-start"
              >
                <Hidden only={["lg", "xl"]}>
                  <IconButton edge="start" color="inherit" aria-label="menu">
                    <MenuIcon />
                  </IconButton>
                </Hidden>
                <Link className="brand" to="/">
                  RedSocial
                </Link>
              </Grid>
              <Grid lg={6} md={7} alignItems="center" justify="center">
                <Hidden only={["xs", "sm"]}>
                  <div className={classes.search}>
                    <div className={classes.searchIcon}>
                      <SearchIcon />
                    </div>
                    <InputBase
                      placeholder="Buscar…"
                      classes={{
                        root: classes.inputRoot,
                        input: classes.inputInput,
                      }}
                      inputProps={{ "aria-label": "search" }}
                    />
                  </div>
                </Hidden>
              </Grid>
              <Hidden only={["xs", "sm", "md"]}>
                <Grid container xs={3} alignItems="center" justify="flex-end">
                  <div className="navlink">
                    <a href="https://m-ivan.github.io/">Ir a mi portfolio</a>
                  </div>
                </Grid>
              </Hidden>
            </Grid>
          </Toolbar>
          <Hidden only={["xs", "sm", "md"]}>
            <Toolbar>
              <Grid container justify="flex-end" alignItems="center">
                <div className="navlink">
                  <Link to="#inicio"></Link>
                  <Link to="#contacto"></Link>
                  <Link to="#about"></Link>
                  <Link to="/register">Register</Link>
                </div>
              </Grid>
            </Toolbar>
          </Hidden>
        </AppBar>
      </Grid>
    </div>
  );
}
