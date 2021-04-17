import { BrowserRouter, Route } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import HomeScreen from "./screens/HomeScreen";
import PostScreen from "./screens/PostScreen";
import ProfileScreen from "./screens/ProfileScreen";
import RegisterScreen from "./screens/RegisterScreen";
import SigninScreen from "./screens/SigninScreen";

function App() {
  return (
    <BrowserRouter>
      <Route render={({ history }) => <Header history={history} />}></Route>

      <main>
        <Route path="/" exact component={HomeScreen}></Route>
        <Route path="/signin" component={SigninScreen}></Route>
        <Route path="/register" component={RegisterScreen}></Route>
        <Route path="/:username" exact component={ProfileScreen}></Route>
        <Route path="/:username/post/:id" component={PostScreen}></Route>
      </main>
    </BrowserRouter>
  );
}

export default App;
