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
import { useDispatch, useSelector } from "react-redux";
import { signout } from "../actions/userActions";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { useState } from "react";

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
    boxShadow: "0px 0px 5px #3636363f",
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
}));

export default function Header(props) {
  const [userAnchorEl, setUserAnchorEl] = useState(false);
  const userSignin = useSelector((state) => state.userSignin);
  const [name, setName] = useState("");
  const { userInfo } = userSignin;
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

  const searchHandler = (e) => {
    e.preventDefault();
    props.history.push(`/search/name/${name}`);
  };

  const classes = useStyles();
  return (
    <div>
      <Grid container spacing={2}>
        <Grid xs={12}>
          <AppBar position="static">
            <Toolbar className="toolBar">
              <Grid container alignItems="center" justify="flex-start">
                <Grid item xs={5} lg={3} md={3}>
                  <Hidden only={["lg", "xl"]}>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                      <MenuIcon />
                    </IconButton>
                  </Hidden>
                  <Link className="brand" to="/">
                    InvestIn
                  </Link>
                </Grid>
                <Grid item lg={6} md={7}>
                  <Grid container alignItems="center" justify="center">
                    <Hidden only={["xs", "sm"]}>
                      <div className={classes.search}>
                        <div className={classes.searchIcon}>
                          <SearchIcon />
                        </div>
                        <form onSubmit={searchHandler}>
                          <InputBase
                            placeholder="Buscar noticias, divisas, acciones…"
                            onChange={(e) => setName(e.target.value)}
                            classes={{
                              root: classes.inputRoot,
                              input: classes.inputInput,
                            }}
                            inputProps={{ type: "text", name: "q", id: "q" }}
                          />
                        </form>
                      </div>
                    </Hidden>
                  </Grid>
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
                  <div className="navlink">
                    <Link to="#inicio"></Link>
                    <Link to="#contacto"></Link>
                    <Link to="#about"></Link>
                  </div>
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
                          Mi cuenta
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
                          <Link to="/profile">Mi perfil</Link>
                        </MenuItem>
                        <MenuItem onClick={handleUserMenuClose}>
                          <Link to="/profile/settings">Configuración</Link>
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
