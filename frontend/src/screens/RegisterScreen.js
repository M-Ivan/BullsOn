import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, withRouter } from "react-router-dom";
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

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: "90vh",
    display: "flex",
    alignItems: "center",
    // Unica forma que encontre de lograr centrar el contenido
    // cuando le ordeno display: "flex" en la tag <main> de App.js
    // La screen se divide a la mitad, incluso especificandole width: "100%",
    // La width en 100000% hace que ocupe toda la pantalla, y asi se centre
    // el contenido
    width: "1000000%",
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

export default withRouter(function RegisterScreen(props) {
  const classes = useStyles();
  //Hooks
  const [username, setUserame] = useState("");
  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");
  const [description, setDescription] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const redirect = props.location.search
    ? props.location.search.split("=")[1]
    : "/";

  const userRegister = useSelector((state) => state.userRegister);
  const { loading, error } = userRegister;
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      dispatch(
        register(username, email, password, name, lastname, description)
      );
    }
  };
  useEffect(() => {
    if (userInfo) {
      props.history.push(redirect);
    }
  }, [props.history, redirect, userInfo]);

  return (
    <div className={classes.root}>
      <Container maxWidth="sm" fixed>
        <form onSubmit={submitHandler}>
          <div>
            <h1>Crear una cuenta</h1>
          </div>
          <div className={`form-control `}>
            <TextField
              id="username"
              label="Nombre de usuario (con el que te veran otros usuarios)"
              variant="outlined"
              required
              color="secondary"
              fullWidth
              onChange={(e) => setUserame(e.target.value)}
            ></TextField>
          </div>
          <div className="form-control">
            <TextField
              id="name"
              label="Tu nombre"
              variant="outlined"
              required
              color="secondary"
              fullWidth
              onChange={(e) => setName(e.target.value)}
            ></TextField>
          </div>
          <div className="form-control">
            <TextField
              id="lastname"
              label="Tu apellido"
              variant="outlined"
              required
              color="secondary"
              fullWidth
              onChange={(e) => setLastname(e.target.value)}
            ></TextField>
          </div>
          <div className="form-control">
            <TextField
              id="description"
              label="Escribe algo sobre vos"
              variant="outlined"
              required
              color="secondary"
              fullWidth
              onChange={(e) => setDescription(e.target.value)}
            ></TextField>
          </div>
          <div className="form-control">
            <TextField
              id="email"
              label="E-mail"
              variant="outlined"
              required
              color="secondary"
              fullWidth
              onChange={(e) => setEmail(e.target.value)}
            ></TextField>
          </div>
          <div className="form-control">
            <TextField
              type="password"
              id="password"
              label="Crea una contraseña"
              variant="outlined"
              required
              color="secondary"
              fullWidth
              onChange={(e) => setPassword(e.target.value)}
            ></TextField>
          </div>
          <div className="form-control">
            <TextField
              type="password"
              id="confirmPassword"
              label="Vuelve a ingresar tu contraseña"
              variant="outlined"
              required
              color="secondary"
              fullWidth
              onChange={(e) => setConfirmPassword(e.target.value)}
            ></TextField>
          </div>
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
                <Link
                  to={`/signin?redirect=${redirect}`}
                  className={classes.colorText}
                >
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
});
