import React from "react";
import {
  Button,
  Grid,
  makeStyles,
  Typography,
  Hidden,
} from "@material-ui/core/index";
import { useDispatch, useSelector } from "react-redux";
import HomeOutlinedIcon from "@material-ui/icons/HomeOutlined";
import { red, green } from "@material-ui/core/colors";
import { Link } from "react-router-dom";
import AccountCircleRoundedIcon from "@material-ui/icons/AccountCircleRounded";
import ExitToAppOutlinedIcon from "@material-ui/icons/ExitToAppOutlined";
import { signout } from "../actions/userActions";

const useStyles = makeStyles((theme) => ({
  navLg: { padding: "3rem 1rem 1rem 1rem" },
  navBtn: {
    textTransform: "none",
    padding: "1rem",
    width: "100%",
    justifyContent: "flex-start",
  },
  colorIcon: { color: [theme.palette.secondary.main], marginRight: "5px" },
  border: {
    borderRight: "1px solid #e0e0e0",
  },
}));

export default function NavLarge() {
  const classes = useStyles();
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const dispatch = useDispatch();

  const signoutHandler = () => {
    dispatch(signout());
  };

  return (
    <Grid item xs={3} className={classes.border}>
      <Hidden mdDown>
        <Grid
          container
          direction="column"
          alignItems="flex-start"
          className={classes.navLg}
        >
          <Button classes={{ root: classes.navBtn }} size="large">
            <Link to="/">
              <Grid container alignItems="center">
                <HomeOutlinedIcon className={classes.colorIcon} />
                <Typography variant="h5" color="textPrimary">
                  Inicio
                </Typography>
              </Grid>{" "}
            </Link>
          </Button>
          {userInfo ? (
            <Button classes={{ root: classes.navBtn }} size="large">
              <Link to={`/${userInfo.username}`}>
                <Grid container alignItems="center">
                  <AccountCircleRoundedIcon className={classes.colorIcon} />
                  <Typography variant="h5" color="textPrimary">
                    Perfil
                  </Typography>
                </Grid>{" "}
              </Link>
            </Button>
          ) : null}
          {userInfo ? (
            <Button
              classes={{ root: classes.navBtn }}
              size="large"
              onClick={signoutHandler}
            >
              <Grid container alignItems="center">
                <ExitToAppOutlinedIcon
                  style={{ color: red[700], marginRight: "5px" }}
                />
                <Typography variant="h5" color="textPrimary">
                  Cerrar Sesión
                </Typography>
              </Grid>{" "}
            </Button>
          ) : (
            <Button classes={{ root: classes.navBtn }} size="large">
              <Link to="/signin">
                <Grid container alignItems="center">
                  <ExitToAppOutlinedIcon
                    style={{ color: green[500], marginRight: "5px" }}
                  />
                  <Typography variant="h5" color="textPrimary">
                    Iniciar Sesión
                  </Typography>
                </Grid>{" "}
              </Link>
            </Button>
          )}
        </Grid>
      </Hidden>
    </Grid>
  );
}
