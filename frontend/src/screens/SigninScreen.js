import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import { signin } from "../actions/userActions";
import MessageBox from "../components/MessageBox";
import ReactLoading from "react-loading";
import {
  Container,
  Button,
  TextField,
  Grid,
  makeStyles,
} from "@material-ui/core/index";

const useStyles = makeStyles((theme) => ({
  root: {
    alignSelf: "center",
    width: "100%",
  },
  btnRoundedOr: {
    background: [theme.palette.secondary.main],
    borderRadius: "3rem",
    border: 0,
    color: "white",
    height: 48,
    padding: "0 30px",
    boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
    "&:hover": {
      background: [theme.palette.secondary.light],
    },
  },
  title: {
    marginLeft: "1rem",
    padding: "1rem",
  },
  label: {
    textTransform: "capitalize",
  },
  colorText: {
    color: [theme.palette.secondary.main],
  },
}));

export default withRouter(function SigninScreen(props) {
  const classes = useStyles();
  // Hooks
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const redirect = props.location.search
    ? props.location.search.split("=")[1]
    : "/";

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo, loading, error } = userSignin;

  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(signin(email, password));
  };
  useEffect(() => {
    if (userInfo) {
      props.history.push(redirect);
    }
  }, [props.history, redirect, userInfo]);
  return (
    <div className={classes.root}>
      <Container maxWidth="sm" fixed>
        <form className="form" onSubmit={submitHandler}>
          <div>
            <h1>Iniciar Sesión</h1>
          </div>
          {loading && (
            <div className="row center">
              <ReactLoading className="loading" color="#2d91f0" type="cylon" />{" "}
            </div>
          )}
          {error && <MessageBox variant="danger">{error}</MessageBox>}
          <div className="form-control">
            <TextField
              id="email"
              label="E-mail"
              variant="outlined"
              color="secondary"
              required
              fullWidth
              onChange={(e) => setEmail(e.target.value)}
            ></TextField>
          </div>
          <div className="form-control">
            <TextField
              type="password"
              id="password"
              label="Password"
              color="secondary"
              variant="outlined"
              required
              fullWidth
              onChange={(e) => setPassword(e.target.value)}
            ></TextField>
          </div>
          <div className="form-control">
            <Grid item xs={12}>
              <Grid container justify="center" direction="column">
                <Button
                  classes={{
                    root: classes.btnRoundedOr,
                  }}
                  variant="contained"
                  type="submit"
                >
                  Iniciar Sesión
                </Button>
              </Grid>
            </Grid>
          </div>
          <Grid container justify="center" alignItems="center">
            <div>
              Primera vez en el sitio?{" "}
              <Link
                to={`/register?redirect=${redirect}`}
                className={classes.colorText}
              >
                {" "}
                *Únete a BullsOn
              </Link>
            </div>
          </Grid>
        </form>
      </Container>
    </div>
  );
});
