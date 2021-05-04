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
import { orange, red, green } from "@material-ui/core/colors";
import { Link } from "react-router-dom";
import AccountCircleRoundedIcon from "@material-ui/icons/AccountCircleRounded";
import ExitToAppOutlinedIcon from "@material-ui/icons/ExitToAppOutlined";
import { signout } from "../actions/userActions";

const useStyles = makeStyles({
  navLg: { margin: "1rem", marginTop: "3rem" },
  navBtn: {
    textTransform: "none",
    marginBottom: "1rem",
    color: orange[800],
  },
  border: {
    borderRight: "1px solid #e0e0e0",
  },
});

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
                <Typography variant="h5" color="textPrimary">
                  <i class="fa fa-bitcoin"></i> # Bitcoin
                </Typography>
              </Grid>{" "}
            </Link>
          </Button>
          {userInfo ? (
            // Agregar ICONO FA Ethereum
            <Button classes={{ root: classes.navBtn }} size="large">
              <Link to={`/${userInfo.username}`}>
                <Grid container alignItems="center">
                  <AccountCircleRoundedIcon style={{ color: orange[700] }} />
                  <Typography variant="h5" color="textPrimary">
                    # Ethereum
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
                <ExitToAppOutlinedIcon style={{ color: red[700] }} />
                <Typography variant="h5" color="textPrimary">
                  # Long
                </Typography>
              </Grid>{" "}
            </Button>
          ) : (
            <Button classes={{ root: classes.navBtn }} size="large">
              <Link to="/signin">
                <Grid container alignItems="center">
                  <ExitToAppOutlinedIcon style={{ color: green[500] }} />
                  <Typography variant="h5" color="textPrimary">
                    # Short
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
