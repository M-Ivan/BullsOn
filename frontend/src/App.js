import { BrowserRouter, Route } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import HomeScreen from "./screens/HomeScreen";
import SigninScreen from "./screens/SigninScreen";

function App() {
  return (
    <BrowserRouter>
      <Header />

      <main>
        <Route path="/signin" component={SigninScreen}></Route>
        <Route path="/" exact component={HomeScreen}></Route>
      </main>
    </BrowserRouter>
  );
}

export default App;
