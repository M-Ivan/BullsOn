import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import { signin } from "../actions/userActions";
import MessageBox from "../components/MessageBox";
import ReactLoading from "react-loading";
import { Container } from "@material-ui/core/index";

export default withRouter(function SigninScreen(props) {
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
    <div>
      <Container maxWidth="lg" fixed>
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
          <div>
            <label htmlFor="email">E-mail</label>
            <input
              type="email"
              id="email"
              placeholder="Enter email"
              required
              onChange={(e) => setEmail(e.target.value)}
            ></input>
          </div>
          <div>
            <label htmlFor="password">Contraseña</label>
            <input
              type="password"
              id="password"
              placeholder="Enter password"
              required
              onChange={(e) => setPassword(e.target.value)}
            ></input>
          </div>
          <div>
            <label />
            <button className="primary" type="submit">
              Iniciar sesión
            </button>
          </div>
          <div>
            <label />
            <div>
              Primera vez en el sitio?{" "}
              <Link to={`/register?redirect=${redirect}`}>Registrate</Link>
            </div>
          </div>
        </form>
      </Container>
    </div>
  );
});
