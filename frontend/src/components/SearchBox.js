import React, { useState } from "react";
import { fade, Grid, Hidden, InputBase, makeStyles } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import { withRouter } from "react-router";

const useStyles = makeStyles((theme) => ({
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
}));

export default withRouter(function SearchBox(props) {
  const classes = useStyles();
  const [query, setQuery] = useState("");

  const searchHandler = (e) => {
    e.preventDefault();
    props.history.push(`/search/query/${query}`);
  };

  return (
    <div>
      <Grid container alignItems="center" justify="center">
        <Hidden only={["xs", "sm"]}>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <form onSubmit={searchHandler}>
              <InputBase
                placeholder="Buscar noticias, divisas, acciones…"
                onChange={(e) => setQuery(e.target.value)}
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
    </div>
  );
});
