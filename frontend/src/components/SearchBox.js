import React, { useState } from "react";
import { fade, InputBase, makeStyles } from "@material-ui/core";
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
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    color: "#fff",

    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "#fff",
    width: "100%",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
  },
}));

export default withRouter(function SearchBox(props) {
  const classes = useStyles();
  const [query, setQuery] = useState("");

  const searchHandler = (e) => {
    if (query) {
      e.preventDefault();
      props.history.push(`/search/query/${query}`);
    } else {
      return null;
    }
  };

  return (
    <div className={classes.search}>
      <div className={classes.searchIcon}>
        <SearchIcon />
      </div>
      <form onSubmit={searchHandler}>
        <InputBase
          placeholder="Buscar..."
          onChange={(e) => setQuery(e.target.value)}
          classes={{
            root: classes.inputRoot,
            input: classes.inputInput,
          }}
          inputProps={{ type: "text", name: "q", id: "q" }}
        />
      </form>
    </div>
  );
});
