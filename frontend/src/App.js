import { BrowserRouter, Route } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import HomeScreen from "./screens/HomeScreen";
import PostScreen from "./screens/PostScreen";
import ProfileScreen from "./screens/ProfileScreen";
import RegisterScreen from "./screens/RegisterScreen";
import SearchScreen from "./screens/SearchScreen";
import SigninScreen from "./screens/SigninScreen";
import { withWidth } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "7rem 0",
    [theme.breakpoints.down("xs")]: {
      padding: "6.5rem 0",
    },
    margin: 0,
    overflow: "hidden",
  },
}));

function App(props) {
  const classes = useStyles();

  return (
    <BrowserRouter>
      <Route render={({ history }) => <Header history={history} />}></Route>

      <main className={classes.root}>
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
        }
      </main>
    </BrowserRouter>
  );
}
export default App;
