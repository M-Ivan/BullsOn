import React from "react";
import {
  Button,
  Grid,
  makeStyles,
  Typography,
  Hidden,
} from "@material-ui/core/index";
import { orange, red, green } from "@material-ui/core/colors";
import { Link } from "react-router-dom";

import TrendingUpIcon from "@material-ui/icons/TrendingUp";
import TrendingDownIcon from "@material-ui/icons/TrendingDown";

const useStyles = makeStyles({
  navLg: { margin: "1rem", marginTop: "3rem" },
  navBtn: {
    textTransform: "none",
    marginBottom: "1rem",
    color: orange[800],
  },
  btcIcon: {
    color: "#ff9900",
  },
  iconBtn: {},
  border: {
    borderLeft: "1px solid #e0e0e0",
  },
});

export default function TopicsNav() {
  const classes = useStyles();

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
            <Link to="/search/query/bitcoin">
              <Grid container alignItems="center">
                <Typography variant="h5" color="textPrimary">
                  <i className={`fa fa-btc ${classes.btcIcon}`}></i> # Bitcoin
                </Typography>
              </Grid>{" "}
            </Link>
          </Button>

          <Button classes={{ root: classes.navBtn }} size="large">
            <Link to="/search/query/ethereum">
              <Grid container alignItems="center">
                <Typography variant="h5" color="textPrimary">
                  # Ethereum
                </Typography>
              </Grid>{" "}
            </Link>
          </Button>

          <Button classes={{ root: classes.navBtn }} size="large">
            <Link to="/search/query/bull">
              <Typography variant="h5" color="textPrimary">
                {" "}
                <Grid container alignItems="center">
                  # Bull
                </Grid>
              </Typography>
            </Link>
          </Button>
          <Button classes={{ root: classes.navBtn }} size="large">
            <Link to="/search/query/bear">
              <Typography variant="h5" color="textPrimary">
                {" "}
                <Grid container alignItems="center">
                  # Bear
                </Grid>
              </Typography>
            </Link>
          </Button>

          <Button classes={{ root: classes.navBtn }} size="large">
            <Link to="/search/query/long">
              <Typography variant="h5" color="textPrimary">
                {" "}
                <Grid container alignItems="center">
                  <TrendingUpIcon
                    className={classes.iconBtn}
                    style={{ color: green[700], width: "25px", height: "25px" }}
                  />
                  # Long
                </Grid>
              </Typography>
            </Link>
          </Button>

          <Button classes={{ root: classes.navBtn }} size="large">
            <Link to="/search/query/short">
              <Typography variant="h5" color="textPrimary">
                <Grid container alignItems="center">
                  <TrendingDownIcon
                    className={classes.iconBtn}
                    style={{ color: red[500], width: "25px", height: "25px" }}
                  />
                  # Short
                </Grid>
              </Typography>
            </Link>
          </Button>
        </Grid>
      </Hidden>
    </Grid>
  );
}
