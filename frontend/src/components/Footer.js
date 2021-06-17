import React from "react";
import { makeStyles, Grid, Typography } from "@material-ui/core";
import { LaunchOutlined } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  footer: {
    borderTop: `3px solid ${[theme.palette.secondary.light]}`,
    color: "#c1c1c1",
    display: "grid",
    background: [theme.palette.primary.dark],
    width: "100%",
    position: "relative",
    height: "20vh",
  },
  neon: {
    position: "relative",
    fontSize: "2em",
    letterSpacing: "10px",
    textTransform: "uppercase",
    alignSelf: "flex-start",
    color: "#342f3d",
    textAlign: "center",
    lineHeight: "0.8em",
    outline: "none",
    animation: `$animate2 5s infinite`,
    [theme.breakpoints.down("sm")]: {
      fontSize: "1em",
      letterSpacing: "3px",
      animation: "none",
      color: [theme.palette.terceary.main],
      textShadow: `0 0 10px ${[theme.palette.terceary.main]}, 0 0 20px ${[
        theme.palette.secondary.light,
      ]}, 0 0 40px ${[theme.palette.terceary.main]},  0 0 80px ${[
        theme.palette.secondary.light,
      ]}, 0 0 160px ${[theme.palette.terceary.main]}`,
    },
  },
  "@keyframes animate2": {
    "0%, 18%, 20%, 50.1%,  60%, 65.1%, 80%, 90.1%, 92%": {
      color: "#342f3d",
      textShadow: "none",
    },
    "18.1%, 20.1%,  30%,  50%,  60.1%,  65%,  80.1%,  90%,  92.1%,  100%": {
      color: [theme.palette.terceary.main],
      textShadow: `0 0 10px ${[theme.palette.terceary.main]}, 0 0 20px ${[
        theme.palette.secondary.light,
      ]}, 0 0 40px ${[theme.palette.terceary.main]},  0 0 80px ${[
        theme.palette.secondary.light,
      ]}, 0 0 160px ${[theme.palette.terceary.main]}`,
    },
  },
  textColor: {
    color: [theme.palette.terceary.main],
  },
}));

export default function Footer() {
  const classes = useStyles();
  return (
    <footer className={classes.footer}>
      <Grid
        item
        xs={12}
        style={{
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "center",
        }}
      >
        <Typography variant="body1" className={classes.text}>
          Iván Miragaya
          <span className={classes.textColor}>©2021</span>
        </Typography>
      </Grid>
      <Grid
        item
        xs={12}
        style={{
          display: "flex",

          justifyContent: "center",
          marginTop: "2vh",

          marginLeft: "3%",
        }}
      >
        <a
          href="https://m-ivan.github.io"
          className={`reflect ${classes.neon}`}
          style={{ transform: "skewY(2deg)" }}
        >
          Portafolio <LaunchOutlined />
        </a>
      </Grid>
    </footer>
  );
}
