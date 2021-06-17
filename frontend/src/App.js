import { BrowserRouter, Route } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import HomeScreen from "./screens/HomeScreen";
import PostScreen from "./screens/PostScreen";
import ProfileScreen from "./screens/ProfileScreen";
import RegisterScreen from "./screens/RegisterScreen";
import SearchScreen from "./screens/SearchScreen";
import SigninScreen from "./screens/SigninScreen";
import { Paper, createMuiTheme, ThemeProvider } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useState } from "react";
import Footer from "./components/Footer";

const useStyles = makeStyles((theme) => ({
  root: {},
  main: {
    display: "flex",
    minHeight: "95vh",
    justifyContent: "center",
    padding: "4.1rem 0 5vh 0",
    [theme.breakpoints.down("md")]: {
      padding: "8.1rem 0",
    },
    [theme.breakpoints.down("xs")]: {
      padding: "7.1rem 0",
    },
    margin: 0,
    overflow: "hidden",
  },
  text: {
    fontSize: "20pt",
    [theme.breakpoints.down("xs")]: {
      fontSize: "10pt",
    },
  },
}));

function App() {
  const classes = useStyles();
  const [darkMode, setDarkMode] = useState(false);

  const theme = createMuiTheme({
    palette: {
      type: darkMode ? "dark" : "light",
      primary: {
        main: darkMode ? "#0b0f1c" : "#170b1c",
      },
      secondary: { main: darkMode ? "#00d6dd" : "#d30058" },
      terceary: { main: "#e72fff" },
      background: darkMode
        ? {
            paper: "#0b0e0f", // "#171717",
          }
        : { paper: "#fffdf1" },
    },
  });

  const darkModeCallback = () => {
    setDarkMode(!darkMode);
  };

  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <Paper className={classes.root}>
          <Route
            render={({ history }) => (
              <Header
                history={history}
                darkModeCallback={darkModeCallback}
                darkMode={darkMode}
              />
            )}
          ></Route>
          <main className={classes.main}>
            <Route path="/" exact component={HomeScreen}></Route>
            <Route path="/signin" component={SigninScreen}></Route>
            <Route path="/register" component={RegisterScreen}></Route>
            <Route path="/:username" exact component={ProfileScreen}></Route>
            <Route path="/:username/post/:id" component={PostScreen}></Route>
            <Route exact path="/search" component={SearchScreen}></Route>
            <Route path="/search/query/:query" component={SearchScreen}></Route>
            {
              //    <Route
              //     path="/search/query/:query/profile/:profile"
              //     component={SearchScreen}
              //   ></Route>
              // <Route
              //    path="/search/query/:query/profile/:profile/order/:order"
              //    component={SearchScreen}
              //  ></Route>
            }{" "}
          </main>
          <Footer />
        </Paper>
      </ThemeProvider>
    </BrowserRouter>
  );
}
export default App;
