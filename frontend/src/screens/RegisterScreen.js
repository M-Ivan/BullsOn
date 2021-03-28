import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { register } from "../actions/userActions";
import ReactLoading from "react-loading";
import MessageBox from "../components/MessageBox";
import {
  Container,
  Button,
  TextField,
  Grid,
  makeStyles,
} from "@material-ui/core/index";

const useStyles = makeStyles({
  btnRoundedOr: {
    background: "#ea6d0b",
    borderRadius: "3rem",
    border: 0,
    color: "white",
    height: 48,
    padding: "0 30px",
    boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
    "&:hover": {
      background: "#e16828",
    },
  },

  label: {
    textTransform: "capitalize",
  },
});

export default function RegisterScreen(props) {
  const classes = useStyles();
  //Hooks
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const redirect = props.location.search
    ? props.location.search.split("=")[1]
    : "/";

  const userRegister = useSelector((state) => state.userRegister);
  const { userInfo, loading, error } = userRegister;

  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      dispatch(register(name, email, password));
    }
  };
  useEffect(() => {
    if (userInfo) {
      props.history.push(redirect);
    }
  }, [props.history, redirect, userInfo]);
  return (
    <div>
      <Container maxWidth="sm" fixed>
        <form className="form" onSubmit={submitHandler}>
          <div>
            <h1>Crear una cuenta</h1>
          </div>

          <div className="form-control">
            <TextField
              id="name"
              label="Nombre Completo"
              variant="outlined"
              required
              fullWidth
              onChange={(e) => setName(e.target.value)}
            ></TextField>
          </div>
          {console.log("name", name)}

          <div className="form-control">
            <TextField
              id="email"
              label="E-mail"
              variant="outlined"
              required
              fullWidth
              onChange={(e) => setEmail(e.target.value)}
            ></TextField>
          </div>
          {console.log("email", email)}

          <div className="form-control">
            <TextField
              type="password"
              id="password"
              label="Crea una contraseña"
              variant="outlined"
              required
              fullWidth
              onChange={(e) => setPassword(e.target.value)}
            ></TextField>
          </div>
          {console.log("password", password)}

          <div className="form-control">
            <TextField
              type="password"
              id="confirmPassword"
              label="Vuelve a ingresar tu contraseña"
              variant="outlined"
              required
              fullWidth
              onChange={(e) => setConfirmPassword(e.target.value)}
            ></TextField>
          </div>
          {console.log("confirm", confirmPassword)}
          <div className="form-group">
            {password !== confirmPassword ? (
              confirmPassword.length > 0 ? (
                <MessageBox variant="danger">
                  Las contraseñas no coinciden
                </MessageBox>
              ) : null
            ) : confirmPassword.length > 0 ? (
              <MessageBox variant="success">
                Las contraseñas coinciden
              </MessageBox>
            ) : null}
            {loading && (
              <ReactLoading className="loading" color="#2d91f0" type="cylon" />
            )}
            {error && <MessageBox variant="danger">{error}</MessageBox>}
          </div>

          <div className="form-control">
            <Grid item xs={12}>
              <Grid container justify="center" direction="column">
                <Button
                  classes={{
                    root: classes.btnRoundedOr,
                  }}
                  type="submit"
                  variant="contained"
                >
                  Registrarme
                </Button>
              </Grid>
            </Grid>
          </div>
          <div>
            <label />
            <Grid container justify="center" alignItems="center">
              <div>
                Ya tienes una cuenta?{" "}
                <Link to={`/signin?redirect=${redirect}`}>
                  {" "}
                  *Iniciar sesión
                </Link>
              </div>
            </Grid>
          </div>
        </form>
      </Container>
    </div>
  );
}
